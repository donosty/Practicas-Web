(function () {
    'use strict';

    // Módulo principal compartido por index.html y tipos.html.
    var app = angular.module('pokeApp', []);
    var API = 'https://pokeapi.co/api/v2';
    var STORAGE_KEY = 'pokefinder-favorites';

    // Centraliza las peticiones a PokeAPI y transforma sus respuestas
    // en objetos pequeños que la interfaz puede renderizar fácilmente.
    app.factory('pokemonService', ['$http', '$q', function ($http, $q) {
        // Normaliza los campos importantes de la respuesta de la API.
        function normalizePokemon(data) {
            return {
                id: data.id,
                name: data.name,
                image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
                types: data.types.map(function (item) { return item.type.name; }),
                abilities: data.abilities.map(function (item) { return item.ability.name; }),
                stats: data.stats.map(function (item) {
                    return { name: item.stat.name.replace('-', ' '), value: Math.min(item.base_stat, 100) };
                })
            };
        }

        // Obtiene el detalle de un Pokémon por nombre o número.
        function getPokemon(identifier) {
            return $http.get(API + '/pokemon/' + identifier).then(function (response) {
                return normalizePokemon(response.data);
            });
        }

        return {
            // Descarga los nombres disponibles para realizar búsquedas locales.
            getCatalog: function () {
                return $http.get(API + '/pokemon?limit=1302').then(function (response) {
                    return response.data.results.map(function (pokemon, index) {
                        return { name: pokemon.name, id: index + 1 };
                    });
                });
            },
            getPokemon: getPokemon,
            // Ejecuta varias peticiones al mismo tiempo para llenar las secciones.
            getMany: function (identifiers) {
                return $q.all(identifiers.map(getPokemon));
            },
            // Consulta un tipo y devuelve solo los primeros ocho nombres.
            getTypePokemon: function (type) {
                return $http.get(API + '/type/' + type).then(function (response) {
                    return response.data.pokemon.slice(0, 8).map(function (item) { return item.pokemon.name; });
                });
            }
        };
    }]);

    // Presenta nombres como "mr-mime" en un formato legible.
    app.filter('titlecase', function () {
        return function (value) {
            return value ? value.replace(/-/g, ' ').replace(/\b\w/g, function (letter) { return letter.toUpperCase(); }) : '';
        };
    });

    // Completa el número de Pokédex con ceros: 25 -> 025.
    app.filter('numberFixed', function () {
        return function (value, length) {
            return String(value).padStart(length || 3, '0');
        };
    });

    // Tarjeta reutilizable para la página principal y la página de tipos.
    app.directive('pokemonCard', function () {
        return {
            restrict: 'E',
            scope: { pokemon: '=', onSelect: '&', onToggleFavorite: '&' },
            template:
                '<article class="pokemon-card" ng-click="onSelect({ pokemon: pokemon })" tabindex="0" ng-keypress="$event.keyCode === 13 && onSelect({ pokemon: pokemon })">' +
                '<button class="favorite-button" type="button" aria-label="Cambiar favorito" ng-click="$event.stopPropagation(); onToggleFavorite({ pokemon: pokemon })">♡</button>' +
                '<span class="card-number">#{{ pokemon.id | numberFixed:3 }}</span>' +
                '<div class="card-image"><img ng-src="{{ pokemon.image }}" alt="{{ pokemon.name }}"></div>' +
                '<div class="card-footer"><h3>{{ pokemon.name | titlecase }}</h3><span>Ver ficha →</span></div></article>'
        };
    });

    // Controla búsqueda, destacados, colecciones y favoritos de index.html.
    app.controller('PokedexController', ['pokemonService', '$q', function (pokemonService, $q) {
        var vm = this;
        vm.catalog = [];
        vm.displayedPokemon = [];
        vm.favoritePokemon = [];
        vm.strongestPokemon = [];
        vm.rarePokemon = [];
        vm.legendaryPokemon = [];
        vm.collectionsLoading = true;
        vm.favorites = readFavorites();
        vm.loading = true;
        vm.searchActive = false;
        vm.showFavorites = false;

        // Recupera favoritos sin romper la app si el almacenamiento está vacío.
        function readFavorites() {
            try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (error) { return []; }
        }

        // Persiste únicamente los identificadores para mantener el almacenamiento ligero.
        // Guarda los cambios del usuario para conservarlos entre visitas.
        function saveFavorites() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(vm.favorites));
        }

        // Genera identificadores distintos para evitar tarjetas repetidas.
        function randomIds(total, max) {
            var ids = [], candidate;
            while (ids.length < total) {
                candidate = Math.floor(Math.random() * max) + 1;
                if (ids.indexOf(candidate) === -1) { ids.push(candidate); }
            }
            return ids;
        }

        // Centraliza el estado visual cuando una petición falla.
        function setLoadingError(message) {
            vm.loading = false;
            vm.error = message;
        }

        // Carga el catálogo y las colecciones independientes en paralelo.
        vm.loadInitialData = function () {
            vm.loading = true;
            vm.error = null;
            pokemonService.getCatalog().then(function (catalog) {
                vm.catalog = catalog;
                return $q.all({
                    featured: pokemonService.getMany(randomIds(6, Math.min(catalog.length, 1025))),
                    strongest: pokemonService.getMany([149, 150, 248, 384]),
                    rare: pokemonService.getMany([144, 145, 146, 151]),
                    legendary: pokemonService.getMany([249, 250, 483, 484])
                });
            }).then(function (collections) {
                vm.displayedPokemon = collections.featured;
                vm.strongestPokemon = collections.strongest;
                vm.rarePokemon = collections.rare;
                vm.legendaryPokemon = collections.legendary;
                vm.collectionsLoading = false;
                vm.refreshFavorites();
                vm.loading = false;
            }).catch(function () {
                vm.collectionsLoading = false;
                setLoadingError('No pudimos conectar con PokeAPI. Comprueba tu conexión e inténtalo de nuevo.');
            });
        };

        // Filtra primero el catálogo y después pide el detalle de los resultados.
        vm.search = function () {
            var query = (vm.query || '').toLowerCase().trim();
            if (!query) { vm.clearSearch(); return; }
            vm.searchActive = true;
            vm.showFavorites = false;
            vm.loading = true;
            vm.displayedPokemon = vm.catalog.filter(function (pokemon) {
                return pokemon.name.indexOf(query) !== -1 || String(pokemon.id) === query;
            }).slice(0, 24);
            var results = vm.displayedPokemon;
            if (!results.length) { vm.loading = false; return; }
            pokemonService.getMany(results.map(function (pokemon) { return pokemon.id; })).then(function (pokemon) {
                vm.displayedPokemon = pokemon;
                vm.loading = false;
            }).catch(function () { setLoadingError('No se pudieron cargar los resultados.'); });
        };

        // Restablece la vista inicial y genera nuevos destacados aleatorios.
        vm.clearSearch = function () {
            vm.query = '';
            vm.searchActive = false;
            vm.loadInitialData();
        };

        // Abre y cierra el modal de detalle.
        vm.openDetails = function (pokemon) { vm.selectedPokemon = pokemon; };
        vm.closeDetails = function () { vm.selectedPokemon = null; };
        // Comprueba si la tarjeta pertenece a la colección del usuario.
        vm.isFavorite = function (pokemon) { return vm.favorites.indexOf(pokemon.id) !== -1; };
        // Alterna el estado favorito y actualiza la sección correspondiente.
        vm.toggleFavorite = function (pokemon) {
            var index = vm.favorites.indexOf(pokemon.id);
            if (index === -1) { vm.favorites.push(pokemon.id); } else { vm.favorites.splice(index, 1); }
            saveFavorites();
            vm.refreshFavorites();
        };
        // Convierte los IDs guardados en objetos completos para mostrarlos.
        vm.refreshFavorites = function () {
            if (!vm.favorites.length) { vm.favoritePokemon = []; return; }
            pokemonService.getMany(vm.favorites).then(function (pokemon) { vm.favoritePokemon = pokemon; });
        };

        vm.loadInitialData();
    }]);

    // Controla el selector de tipos y sus resultados en tipos.html.
    app.controller('TypesController', ['pokemonService', function (pokemonService) {
        var vm = this;
        // Los nombres internos deben coincidir con los slugs que usa PokeAPI.
        vm.types = [
            { name: 'water', label: 'Agua', color: '#3b82f6' },
            { name: 'fire', label: 'Fuego', color: '#e63946' },
            { name: 'grass', label: 'Planta', color: '#48a868' },
            { name: 'electric', label: 'Eléctrico', color: '#eab308' },
            { name: 'psychic', label: 'Psíquico', color: '#db2777' },
            { name: 'ice', label: 'Hielo', color: '#38bdf8' },
            { name: 'fighting', label: 'Lucha', color: '#b45309' },
            { name: 'poison', label: 'Veneno', color: '#9333ea' },
            { name: 'ground', label: 'Tierra', color: '#a16207' },
            { name: 'flying', label: 'Volador', color: '#6366f1' },
            { name: 'bug', label: 'Bicho', color: '#65a30d' },
            { name: 'rock', label: 'Roca', color: '#78716c' },
            { name: 'ghost', label: 'Fantasma', color: '#6d28d9' },
            { name: 'dragon', label: 'Dragón', color: '#2563eb' },
            { name: 'steel', label: 'Acero', color: '#64748b' },
            { name: 'fairy', label: 'Hada', color: '#ec4899' },
            { name: 'dark', label: 'Siniestro', color: '#292524' },
            { name: 'normal', label: 'Normal', color: '#78716c' }
        ];
        vm.favorites = readFavorites();
        vm.selectedType = vm.types[0];
        vm.loading = true;

        // Esta página comparte favoritos con la página principal mediante localStorage.
        function readFavorites() {
            try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (error) { return []; }
        }

        function saveFavorites() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(vm.favorites));
        }

        // Reutiliza el mismo criterio visual de favoritos que index.html.
        vm.isFavorite = function (pokemon) {
            return vm.favorites.indexOf(pokemon.id) !== -1;
        };

        // Permite guardar o quitar un Pokémon desde cualquier tarjeta.
        vm.toggleFavorite = function (pokemon) {
            var index = vm.favorites.indexOf(pokemon.id);
            if (index === -1) { vm.favorites.push(pokemon.id); } else { vm.favorites.splice(index, 1); }
            saveFavorites();
        };

        // Alimenta el modal compartido con el Pokémon seleccionado.
        vm.openDetails = function (pokemon) { vm.selectedPokemon = pokemon; };
        vm.closeDetails = function () { vm.selectedPokemon = null; };

        // Cambia de categoría y carga sus Pokémon desde el endpoint /type/{type}.
        vm.loadType = function (type) {
            vm.selectedType = type;
            vm.loading = true;
            vm.error = null;
            pokemonService.getTypePokemon(type.name).then(function (names) {
                return pokemonService.getMany(names.slice(0, 8));
            }).then(function (pokemon) {
                vm.pokemon = pokemon;
                vm.loading = false;
            }).catch(function () {
                vm.loading = false;
                vm.error = 'No pudimos cargar este tipo. Inténtalo de nuevo.';
            });
        };

        vm.loadType(vm.selectedType);
    }]);
}());
