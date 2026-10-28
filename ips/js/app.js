(function () {
  var app = angular.module("ejemplosApp", []);

  app.controller("mainCtrl", [
    "$scope",
    "$http",
    function ($scope, $http) {
      $scope.loading = true;
      $scope.error = false;
      $scope.ipInfo = {};

      $http
        .get("https://ipapi.co/json/")
        .then(
          function (response) {
            $scope.ipInfo = response.data;
          },
          function () {
            $scope.error = true;
          },
        )
        .finally(function () {
          $scope.loading = false;
        });
    },
  ]);
})();