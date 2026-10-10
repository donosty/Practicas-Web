var app = angular.module('directorioAcademico', []);

app.controller('DirectorioController', function ($scope) {
  var perfilesBase = [
    {
      nombre: 'Dr. Elena García Torres',
      edad: 46,
      fechaNacimiento: '1978-03-12',
      correo: 'elena.garcia@universidad.edu',
      departamento: 'Departamento de Ingeniería de Software',
      especialidad: 'Arquitectura de Sistemas Inteligentes',
      biografia:
        'Profesora asociada con más de veinte años de experiencia en diseño de sistemas escalables, mentoría de proyectos y desarrollo curricular en ingeniería.',
      fotografia: 'img/messi.jpg'
    },
    {
      nombre: 'Dr. Carlos Mendoza Ruiz',
      edad: 39,
      fechaNacimiento: '1985-11-20',
      correo: 'carlos.mendoza@universidad.edu',
      departamento: 'Facultad de Ciencias Económicas',
      especialidad: 'Econometría y Modelación Financiera',
      biografia:
        'Investigador de políticas públicas y modelos predictivos aplicados a mercados globales. Coordina seminarios avanzados para estudiantes de maestría.',
      fotografia: 'img/cr7.jpg'
    },
    {
      nombre: 'Dra. Sofía Moreno López',
      edad: 42,
      fechaNacimiento: '1982-06-05',
      correo: 'sofia.moreno@universidad.edu',
      departamento: 'Escuela de Medicina',
      especialidad: 'Neurología Clínica y Neurociencia Cognitiva',
      biografia:
        'Especialista en neuropatología aplicada y diagnóstico de trastornos cognitivos. Participa en proyectos interdisciplinarios de investigación biomédica.',
      fotografia: 'img/vandijk.jpg'
    },
    {
      nombre: 'Ing. Mateo Álvarez Serrano',
      edad: 33,
      fechaNacimiento: '1991-09-17',
      correo: 'mateo.alvarez@universidad.edu',
      departamento: 'Carrera de Diseño Digital',
      especialidad: 'Experiencia de Usuario e Interfaces Interactivas',
      biografia:
        'Docente enfocado en diseño centrado en el usuario, prototipado y accesibilidad digital. Promueve soluciones visuales con impacto académico y social.',
      fotografia: 'img/de-bruyne.jpg'
    }
  ];

  $scope.perfiles = perfilesBase;
  $scope.perfilActual = 0;
  $scope.vistaActual = 'consulta';
  $scope.Editando = null;
  $scope.NuevoProfesor = null;
  $scope.mensaje = '';

  $scope.perfilActualObj = function () {
    return $scope.perfiles[$scope.perfilActual];
  };

  $scope.perfilAnterior = function () {
    if ($scope.perfilActual > 0) {
      $scope.perfilActual = $scope.perfilActual - 1;
    }
  };

  $scope.perfilSiguiente = function () {
    if ($scope.perfilActual < $scope.perfiles.length - 1) {
      $scope.perfilActual = $scope.perfilActual + 1;
    }
  };

  $scope.editarPerfil = function () {
    if ($scope.perfiles.length === 0) {
      return;
    }

    $scope.Editando = angular.copy($scope.perfiles[$scope.perfilActual]);
    $scope.vistaActual = 'edicion';
    $scope.mensaje = '';
  };

  $scope.guardarCambios = function (formEdicion) {
    if (!formEdicion || formEdicion.$invalid) {
      formEdicion && formEdicion.$setSubmitted();
      $scope.mensaje = 'Corrige los datos obligatorios antes de guardar.';
      return;
    }

    if (!$scope.Editando) {
      return;
    }

    angular.copy($scope.Editando, $scope.perfiles[$scope.perfilActual]);
    $scope.Editando = null;
    $scope.vistaActual = 'consulta';
    $scope.mensaje = 'Cambios guardados correctamente.';
  };

  $scope.cancelarEdicion = function () {
    $scope.Editando = null;
    $scope.vistaActual = 'consulta';
    $scope.mensaje = 'Edición cancelada. Los cambios no se guardaron.';
  };

  $scope.nuevoPerfil = function () {
    $scope.NuevoProfesor = {
      nombre: '',
      edad: '',
      fechaNacimiento: '',
      correo: '',
      departamento: '',
      especialidad: '',
      biografia: '',
      fotografia: 'img/placeholder-profile.svg'
    };
    $scope.vistaActual = 'registro';
    $scope.mensaje = '';
  };

  $scope.guardarNuevoPerfil = function (formRegistro) {
    if (!formRegistro || formRegistro.$invalid) {
      formRegistro && formRegistro.$setSubmitted();
      $scope.mensaje = 'Completa todos los campos con información válida.';
      return;
    }

    if (!$scope.NuevoProfesor) {
      return;
    }

    var perfilNuevo = angular.copy($scope.NuevoProfesor);
    $scope.perfiles.push(perfilNuevo);
    $scope.perfilActual = $scope.perfiles.length - 1;
    $scope.NuevoProfesor = null;
    $scope.vistaActual = 'consulta';
    $scope.mensaje = 'Nuevo perfil registrado con éxito.';
  };

  $scope.cancelarNuevoPerfil = function () {
    $scope.NuevoProfesor = null;
    $scope.vistaActual = 'consulta';
    $scope.mensaje = 'Registro cancelado. No se agregó ningún perfil.';
  };

  $scope.fotoFallida = function (evento) {
    evento.target.src = 'img/placeholder-profile.svg';
  };
});