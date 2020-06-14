// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var app = angular.module('myApp', ['ngRoute']);

// Routing
app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'sections/dashboard.html'
  })
  .when('/dashboard',{
      templateUrl: 'sections/dashboard.html'
  })
  .when('/notes', {
      templateUrl: 'sections/notes.html',
  })
  .when('/support', {
    templateUrl: 'sections/support.html'
  })
  .otherwise({
    templateUrl: '404.html'
  })
})
