var app = angular.module('panda', [])

app.controller('pandaCtrl', function($scope){
    $scope.panda = angular.copy(pandaData);
    $scope.oso = angular.copy(osoData);
    $scope.rana = angular.copy(ranaData);
    $scope.editando = null;
    $scope.formulario = {};

    $scope.editar = function(animal) {
        $scope.editando = animal;
        $scope.formulario = angular.copy(animal);
    };

    $scope.guardar = function(animal) {
        angular.copy($scope.formulario, animal);
        $scope.cancelar();
    };

    $scope.cancelar = function() {
        $scope.editando = null;
        $scope.formulario = {};
    };

    $scope.editarPanda = function() { $scope.editar($scope.panda); };
    $scope.guardarPanda = function() { $scope.guardar($scope.panda); };
    $scope.cancelarPanda = $scope.cancelar;
    $scope.editarOso = function() { $scope.editar($scope.oso); };
    $scope.guardarOso = function() { $scope.guardar($scope.oso); };
    $scope.cancelarOso = $scope.cancelar;
    $scope.editarRana = function() { $scope.editar($scope.rana); };
    $scope.guardarRana = function() { $scope.guardar($scope.rana); };
    $scope.cancelarRana = $scope.cancelar;
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