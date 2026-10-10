var app = angular.module('panda', [])


app.controller('pandaCtrl', function($scope){
    $scope.panda = pandaData;
    $scope.oso = osoData
    $scope.rana = ranaData

    $scope.Editando = {}
    $scope.mensajePanda = ""
    $scope.EditarPanda = function(){
        angular.copy($scope.panda, $scope.Editando)
        $scope.mensajePanda = ""
    }

    $scope.guardarPanda = function(){
        var datos = $scope.Editando
        var camposCompletos = datos && datos.caracteristicas &&
            String(datos.nombre || '').trim() !== '' &&
            String(datos.caracteristicas.dieta || '').trim() !== '' &&
            String(datos.caracteristicas.peso || '').trim() !== '' &&
            datos.edad !== undefined && datos.edad !== null &&
            String(datos.edad).trim() !== ''

        if (!camposCompletos) {
            $scope.mensajePanda = "Completa todos los campos antes de guardar."
            return
        }

        angular.copy($scope.Editando, $scope.panda)
        $scope.Editando = {}
        $scope.mensajePanda = "Datos guardados correctamente."
    }

    $scope.cancelarPanda = function(){
        $scope.Editando = {}
        $scope.mensajePanda = "Edición cancelada."
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