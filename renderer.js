// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var app = angular.module('myApp', ['ngRoute']);

// Load controller for notes (sortable)
app.controller('notesController', function($scope){
  $scope.initialize = function () {
      console.log("Loaded notesController");
      Sortable.create(listWithHandle, {
        handle: '.glyphicon-move',
        animation: 150
      });
  }
 });

// Load controller for notes items
app.controller('notesItemsController', notesItemsController);

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
      controller: 'notesController'
  })
  .when('/support', {
    templateUrl: 'sections/support.html'
  })
  .otherwise({
    templateUrl: '404.html'
  })
})

function notesItemsController() {
  this.items = [
    {position: '0', reference: 'F3000,EBB12345', changetype: 'Module', value: 'Algemeen', onHoverValue: 'Meer info A'},
    {position: '1', reference: 'F3000,EBB12345', changetype: 'Informatie', value: 'Totaalbedragen', onHoverValue: 'Meer info A'},
    {position: '2', reference: 'F3000,EBB12345', changetype: 'Module', value: 'Belangrijkste wijzigingen', onHoverValue: 'Meer info A'},
    {position: '3', reference: 'F3000,EBB12345', changetype: 'Toegevoegd', value: 'Ondersteuning iStandaarden 2.4', onHoverValue: 'Meer info B'}
  ];
}

notesItemsController.prototype.addItem = function() {
  this.items.push({ 
    position: '99', // TODO: Omzetten naar index pakken en dan +1
    reference: '',
    changetype: 'Toegevoegd',
    value: 'yourname@example.org',
    onHoverValue: ''
  });
};

notesItemsController.prototype.removeItem = function(itemtToRemove) {
 var index = this.items.indexOf(itemtToRemove);
  this.items.splice(index, 1);
};

notesItemsController.prototype.clearItem = function(item) {
  // item.position wordt niet gewist
  item.reference = '';
  item.changetype = 'Toegevoegd';
  item.value = '';
  item.onHoverValue = '';
};
