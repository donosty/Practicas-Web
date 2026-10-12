(function(){

var app = angular.module('universidadApp',[ ]);

app.controller('listadoCtrl', ['$scope', function($scope){
	
    $scope.listado = [
        "Alejandro Vazques",
        "Fernando Herrera",
        "Carlos Perez",
        "Jonatan Guadarrama",
        "Diego Potrera"
    ]

    $scope.listadoAlumnos = {
        alumnos : [
            {
                nombre: "Lionel Messi",
                edad: 39,
                clase: "Historia"
            },
            {
                nombre: "Cristiano",
                edad: 41,
                clase: "Administracion"
            },
            {
                nombre: "Lionel Messi",
                edad: 39,
                clase: "Historia"
            },
        
        ]
    }



}]);





})();
