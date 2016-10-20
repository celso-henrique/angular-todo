const app = angular.module('app', ['ui.router', 'ngMaterial'])
  .service('todoStore', todoStore)
  .config(config);

function config($stateProvider, $httpProvider,
  $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(false);

  $stateProvider
    .state('todo', {
      abstract: true,
      url: '/',
      template: '<ui-view />'
    })
    .state('todo.all', {
      url: '',
      component: 'todo',
      resolve: {
        filter: () => 'all'
      }
    })
    .state('todo.finished', {
      url: 'finished',
      component: 'todo',
      resolve: {
        filter: () => 'finished'
      }
    })
    .state('todo.unfinished', {
      url: 'unfinished',
      component: 'todo',
      resolve: {
        filter: () => 'unfinished'
      }
    })
    .state('todo.front', {
      url: 'front-end',
      component: 'todo',
      resolve: {
        filter: () => 'front'
      }
    })
    .state('todo.back', {
      url: 'back-end',
      component: 'todo',
      resolve: {
        filter: () => 'back'
      }
    });
}
