(function(){

var app = angular.module('universidadApp', []);

app.controller('listadoCtrl', ['$scope', function($scope) {
    var claveAlmacenamiento = 'universidadApp.personas';

    $scope.filtro = {
        sexo: '',
        nombre: '',
        avatar: '',
        telefono: '',
        celular: '',
        asignatura: ''
    };
    $scope.ordenSeleccionado = 'nombre';
    $scope.reverse = false;
    $scope.personaEnEdicion = null;
    var camposOrdenables = ['sexo', 'nombre', 'telefono', 'celular', 'asignatura'];

    $scope.ordenarPor = function(campo) {
        if (camposOrdenables.indexOf(campo) === -1) {
            return;
        }

        if ($scope.ordenSeleccionado === campo) {
            $scope.reverse = !$scope.reverse;
        } else {
            $scope.ordenSeleccionado = campo;
            $scope.reverse = false;
        }
    };

    $scope.editarPersona = function(persona) {
        $scope.personaEnEdicion = angular.copy(persona);
        $scope.personaOriginal = persona;
    };

    $scope.guardarEdicion = function() {
        if (!$scope.personaEnEdicion || !$scope.personaOriginal) {
            return;
        }

        angular.extend($scope.personaOriginal, $scope.personaEnEdicion);
        guardarPersonas();
        $scope.cancelarEdicion();
    };

    $scope.cancelarEdicion = function() {
        $scope.personaEnEdicion = null;
        $scope.personaOriginal = null;
    };

    $scope.eliminarPersona = function(persona) {
        if (!window.confirm('¿Desea eliminar a ' + persona.nombre + '?')) {
            return;
        }

        var indice = $scope.personas.indexOf(persona);
        if (indice !== -1) {
            $scope.personas.splice(indice, 1);
            if (persona === $scope.personaOriginal) {
                $scope.cancelarEdicion();
            }
            guardarPersonas();
        }
    };

    $scope.personas = [
        {
            sexo: 'Masculino',
            nombre: 'Lionel Messi',
            avatar: 'messi.jpg',
            telefono: '555 010 1201',
            celular: '55 1010 1201',
            asignatura: 'Fútbol'
        },
        {
            sexo: 'Masculino',
            nombre: 'Cristiano Ronaldo',
            avatar: 'cr7.jpg',
            telefono: '555 010 1202',
            celular: '55 1010 1202',
            asignatura: 'Entrenamiento'
        },
        {
            sexo: 'Masculino',
            nombre: 'Daniel Alves',
            avatar: 'danialves.jpg',
            telefono: '555 010 1203',
            celular: '55 1010 1203',
            asignatura: 'Defensa'
        },
        {
            sexo: 'Masculino',
            nombre: 'Kevin De Bruyne',
            avatar: 'de-bruyne.jpg',
            telefono: '555 010 1204',
            celular: '55 1010 1204',
            asignatura: 'Estrategia'
        },
        {
            sexo: 'Masculino',
            nombre: 'Josko Gvardiol',
            avatar: 'gvardiol.jpg',
            telefono: '555 010 1205',
            celular: '55 1010 1205',
            asignatura: 'Defensa'
        },
        {
            sexo: 'Masculino',
            nombre: 'Andrés Iniesta',
            avatar: 'iniesta.jpg',
            telefono: '555 010 1206',
            celular: '55 1010 1206',
            asignatura: 'Mediocampo'
        },
        {
            sexo: 'Masculino',
            nombre: 'Jordi Alba',
            avatar: 'jordi.jpg',
            telefono: '555 010 1207',
            celular: '55 1010 1207',
            asignatura: 'Defensa'
        },
        {
            sexo: 'Masculino',
            nombre: 'Neymar Jr.',
            avatar: 'neymar.jpg',
            telefono: '555 010 1208',
            celular: '55 1010 1208',
            asignatura: 'Técnica'
        },
        {
            sexo: 'Masculino',
            nombre: 'Gerard Piqué',
            avatar: 'pique.jpg',
            telefono: '555 010 1209',
            celular: '55 1010 1209',
            asignatura: 'Defensa'
        },
        {
            sexo: 'Masculino',
            nombre: 'Manuel Neuer',
            avatar: 'never.jpg',
            telefono: '555 010 1210',
            celular: '55 1010 1210',
            asignatura: 'Portería'
        }
    ];
    //Imprimir id y que cargue por defecto el pais seleccionado
    $scope.paises = [
        { id: "MX", nombre: "México" },
        { id: "AR", nombre: "Argentina" },
        { id: "CO", nombre: "Colombia" },
        { id: "ES", nombre: "España" },
        { id: "CL", nombre: "Chile" },
        { id: "PE", nombre: "Perú" },
        { id: "BR", nombre: "Brasil" },
        { id: "US", nombre: "Estados Unidos" },
        { id: "CA", nombre: "Canadá" },
        { id: "JP", nombre: "Japón" },
        { id: "DE", nombre: "Alemania" },
        { id: "FR", nombre: "Francia" },
        { id: "IT", nombre: "Italia" },
        { id: "GB", nombre: "Reino Unido" },
        { id: "AU", nombre: "Australia" },
        { id: "KR", nombre: "Corea del Sur" },
        { id: "IN", nombre: "India" },
        { id: "ZA", nombre: "Sudáfrica" },
        { id: "EG", nombre: "Egipto" },
        { id: "NZ", nombre: "Nueva Zelanda" }
    ];

    function guardarPersonas() {
        try {
            window.localStorage.setItem(claveAlmacenamiento, angular.toJson($scope.personas));
        } catch (error) {
            console.error('No se pudieron guardar los datos de los jugadores.', error);
        }
    }

    function cargarPersonas() {
        var personasGuardadas;

        try {
            personasGuardadas = window.localStorage.getItem(claveAlmacenamiento);
        } catch (error) {
            console.error('No se pudieron leer los datos guardados de los jugadores.', error);
            return false;
        }

        if (!personasGuardadas) {
            return false;
        }

        try {
            var personasParseadas = angular.fromJson(personasGuardadas);
            if (!angular.isArray(personasParseadas)) {
                throw new Error('El formato guardado no es una lista de jugadores.');
            }
            $scope.personas = personasParseadas;
            return true;
        } catch (error) {
            console.error('Los datos guardados de los jugadores no son válidos.', error);
            return false;
        }
    }

    if (!cargarPersonas()) {
        $scope.personas.forEach(function(persona) {
            var indicePais = Math.floor(Math.random() * $scope.paises.length);
            persona.pais = $scope.paises[indicePais];
        });
        guardarPersonas();
    } else {
        var datosActualizados = false;
        $scope.personas.forEach(function(persona) {
            if (!persona.pais) {
                var indicePais = Math.floor(Math.random() * $scope.paises.length);
                persona.pais = $scope.paises[indicePais];
                datosActualizados = true;
            }
        });
        if (datosActualizados) {
            guardarPersonas();
        }
    }

    $scope.pais_seleccionado = 'Argentina'
}]);
})();
