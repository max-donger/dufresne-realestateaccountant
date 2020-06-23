// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var app = angular.module('myApp', ['ngRoute']);

// Load controller for dashboard
app.controller('dashboardController', function($scope){
  $scope.initialize = function () {
      console.log("Loaded dashboardController");
      // crawlSource = "TibiaMMO";
      // getLatestCrawl(crawlSource);
      // connectionStatusHandler();
  }
 });

 // Load controller for notes
app.controller('notesController', function($scope){
  $scope.initialize = function () {
      console.log("Loaded notesController");
  }
 });

// Routing
app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'sections/dashboard.html',
    controller: 'dashboardController'
  })
  .when('/dashboard', {
      templateUrl: 'sections/dashboard.html',
      controller: 'dashboardController'
  })
  .when('/notes', {
      templateUrl: 'sections/notes.html',
      controller: 'notesController'
  })
  .when('/support', {
    templateUrl: 'sections/support.html'
  })
  .otherwise({
    templateUrl: '404.html'
  })
})
