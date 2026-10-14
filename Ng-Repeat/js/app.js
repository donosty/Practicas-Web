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
                sexo: "Masculino",
                telefono: "555 010 1201",
                celular: "55 1010 1201",
                avatar: "messi.jpg"
            },
            {
                nombre: "Cristiano Ronaldo",
                sexo: "Masculino",
                telefono: "555 010 1202",
                celular: "55 1010 1202",
                avatar: "cr7.jpg"
            },
            {
                nombre: "Daniel Alves",
                sexo: "Masculino",
                telefono: "555 010 1203",
                celular: "55 1010 1203",
                avatar: "danialves.jpg"
            },
            {
                nombre: "Kevin De Bruyne",
                sexo: "Masculino",
                telefono: "555 010 1204",
                celular: "55 1010 1204",
                avatar: "de-bruyne.jpg"
            },
            {
                nombre: "Josko Gvardiol",
                sexo: "Masculino",
                telefono: "555 010 1205",
                celular: "55 1010 1205",
                avatar: "gvardiol.jpg"
            },
            {
                nombre: "Andres Iniesta",
                sexo: "Masculino",
                telefono: "555 010 1206",
                celular: "55 1010 1206",
                avatar: "iniesta.jpg"
            },
            {
                nombre: "Jordi Alba",
                sexo: "Masculino",
                telefono: "555 010 1207",
                celular: "55 1010 1207",
                avatar: "jordi.jpg"
            },
            {
                nombre: "Neymar Jr.",
                sexo: "Masculino",
                telefono: "555 010 1208",
                celular: "55 1010 1208",
                avatar: "neymar.jpg"
            },
            {
                nombre: "Gerard Pique",
                sexo: "Masculino",
                telefono: "555 010 1209",
                celular: "55 1010 1209",
                avatar: "pique.jpg"
            },
            {
                nombre: "Manuel Neuer",
                sexo: "Masculino",
                telefono: "555 010 1210",
                celular: "55 1010 1210",
                avatar: "never.jpg"
            },
        ]
    }



}]);





})();
