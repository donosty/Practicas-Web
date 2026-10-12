var app = angular.module('panda', [])


app.controller('pandaCtrl', function($scope){
    $scope.panda = pandaData;
    $scope.oso = osoData
    $scope.rana = ranaData

    $scope.ediciones = {
        panda: {},
        oso: {},
        rana: {}
    }
    $scope.formularios = {
        panda: false,
        oso: false,
        rana: false
    }
    $scope.mensajes = {
        panda: "",
        oso: "",
        rana: ""
    }

    $scope.editarAnimal = function(nombre, animal){
        angular.copy(animal, $scope.ediciones[nombre])
        $scope.mensajes[nombre] = ""
        $scope.formularios[nombre] = true
    }

    $scope.guardarAnimal = function(nombre, animal){
        var datos = $scope.ediciones[nombre]
        var camposCompletos = datos && datos.caracteristicas &&
            String(datos.nombre || '').trim() !== '' &&
            String(datos.caracteristicas.dieta || '').trim() !== '' &&
            String(datos.caracteristicas.peso || '').trim() !== '' &&
            datos.edad !== undefined && datos.edad !== null &&
            String(datos.edad).trim() !== ''

        if (!camposCompletos) {
            $scope.mensajes[nombre] = "Completa todos los campos antes de guardar."
            return
        }

        angular.copy(datos, animal)
        $scope.ediciones[nombre] = {}
        $scope.mensajes[nombre] = "Datos guardados correctamente."
        $scope.formularios[nombre] = false
    }

    $scope.cancelarAnimal = function(nombre){
        $scope.ediciones[nombre] = {}
        $scope.mensajes[nombre] = "Edición cancelada."
        $scope.formularios[nombre] = false
    }
});



const pandaData = { 
    nombre: "Pepe",
    edad: 20,
    caracteristicas: {
        dieta: "Bambu",
        peso: '230kg'
    },
    avatar: "img/Mec-Boy.jpg"
}

const osoData = {
    nombre: "Polar",
    edad: 10,
    caracteristicas: {
        dieta: "Salmon",
        peso: '330kg'
    },
    avatar: "img/Mec-Boy(1).jpg"
}

const ranaData = {
    nombre: "Rene",
    edad: 5,
    caracteristicas: {
        dieta: "Insectos",
        peso: '10kg'
    },
    avatar: "img/Mec-Boy(2).jpg"
}