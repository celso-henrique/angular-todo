'use strict';

var app = angular.module('app', ['ui.router', 'ngMaterial']).config(config);

function config($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(false);

  $stateProvider.state('todo', {
    abstract: true,
    url: '/',
    template: '<ui-view />'
  }).state('todo.all', {
    url: '',
    component: 'todo',
    resolve: {
      filter: function filter() {
        return 'all';
      }
    }
  }).state('todo.finished', {
    url: 'finished',
    component: 'todo',
    resolve: {
      filter: function filter() {
        return 'finished';
      }
    }
  }).state('todo.unfinished', {
    url: 'unfinished',
    component: 'todo',
    resolve: {
      filter: function filter() {
        return 'unfinished';
      }
    }
  }).state('todo.front', {
    url: 'front-end',
    component: 'todo',
    resolve: {
      filter: function filter() {
        return 'front';
      }
    }
  }).state('todo.back', {
    url: 'back-end',
    component: 'todo',
    resolve: {
      filter: function filter() {
        return 'back';
      }
    }
  });
}

app.component('todo', {
  controller: todoContainerController,
  template: '<section class="todoApp">\n    <todo-form id="todo-form-wrapper" on-submit="$ctrl.addTodo($event)"></todo-form>\n    <todo-header filter="$ctrl.filter"></todo-header>\n    <md-content flex ng-if="$ctrl.todoList.length > 0">\n      <todo-list\n        list="$ctrl.todoList"\n        on-delete="$ctrl.deleteTodo($event)"\n        on-toggle="$ctrl.toggleTodo($event)">\n      </todo-list>\n    </md-content>\n  </section>',
  bindings: {
    filter: '<'
  }
});

function todoContainerController(todoStore, $state, $mdDialog) {
  var self = this;

  var dispose = mobx.autorun(function () {
    var todoList = todoStore.getAllTodos();
    self.todoList = getListBasedOnFilter(todoList, self.filter);
  });

  self.$onDestroy = function () {
    dispose();
  };

  self.addTodo = function (event) {
    todoStore.addTodo(event.todo);
  };

  self.deleteTodo = function (event) {
    todoStore.deleteTodo(event.index);
  };

  self.toggleTodo = function (event) {
    todoStore.toggleTodo(event.index);
  };

  function getListBasedOnFilter(list, filter) {
    if (!filter) return list;

    var filterMap = {
      all: function all(item) {
        return true;
      },
      finished: function finished(item) {
        return item.completed;
      },
      unfinished: function unfinished(item) {
        return !item.completed;
      },
      back: function back(item) {
        return item.type === 'back';
      },
      front: function front(item) {
        return item.type === 'front';
      }
    };

    return list.filter(filterMap[filter]);
  }
}

app.service('todoStore', todoStore);

function todoStore() {
  var self = this;
  var todoList = mobx.observable([]);

  self.getAllTodos = function () {
    return todoList;
  };

  self.addTodo = function (todo) {
    var newTodo = Object.assign({}, todo, {
      index: todoList.length,
      completed: false
    });

    todoList.push(newTodo);
  };

  self.deleteTodo = function (index) {
    todoList.splice(index, 1);
  };

  self.toggleTodo = function (index) {
    todoList[index].completed = !todoList[index].completed;
  };
}

app.component('todoForm', {
  controller: todoFormController,
  template: '<div class="md-dialog-container" name="todoForm" id="todo-form">\n    <md-dialog layout-padding>\n      <form ng-submit="$ctrl.submitForm()">\n        <h2 class="title">ADD TASK</h2>\n        <md-input-container>\n          <label>Task title</label>\n          <input required name="description" ng-model="$ctrl.newTodo.description">\n          <div ng-messages="todoForm.description.$error">\n            <div ng-message="required">This field is required.</div>\n          </div>\n          <md-radio-group ng-model="$ctrl.newTodo.type">\n            <md-radio-button value="front" class="radio md-primary">Front-end</md-radio-button>\n            <md-radio-button value="back">Back-end</md-radio-button>\n          </md-radio-group>\n        </md-input-container>\n        <md-dialog-actions>\n          <md-button ng-click="$ctrl.closeDialog()">Cancel</md-button><md-button class="md-primary md-raised" type="submit">Add</md-button>\n        </md-dialog-actions>\n      </form>\n    </md-dialog>\n  </div>',
  bindings: {
    onSubmit: '&'
  }
});

function todoFormController($mdDialog) {
  var _this = this;

  var self = this;

  self.$onInit = function () {
    self.newTodo = {
      type: 'front'
    };
    resetTodo();
  };

  self.closeDialog = function () {
    $mdDialog.hide();
    resetTodo();
  };

  self.submitForm = function () {
    var self = _this;
    self.onSubmit({
      $event: {
        todo: self.newTodo
      }
    });

    self.closeDialog();
  };

  function resetTodo() {
    self.newTodo = {
      type: 'front'
    };
  }
}

app.component('todoHeader', {
  controller: todoHeaderController,
  template: '<md-toolbar>\n    <div class="md-toolbar-tools">\n      <h2 id="logo"><md-icon class="material-icons">done_all</md-icon>TODO <span ng-if="$ctrl.filter != \'all\'"> - {{ $ctrl.filter }} </span></h2>\n      <span flex></span>\n      <md-button aria-label="Add task" ng-click="$ctrl.showDialog()" class="md-raised">\n        Add task\n      </md-button>\n      <md-menu>\n        <md-button aria-label="Open categories menu" class="md-icon-button" ng-click="$ctrl.openMenu($mdOpenMenu, $event)">\n          <md-icon class="material-icons">menu</md-icon>\n        </md-button>\n        <md-menu-content width="4">\n          <md-menu-item>\n            <md-button ui-sref="todo.all">\n              <md-icon class="material-icons">device_hub</md-icon>\n              All\n            </md-button>\n          </md-menu-item>\n          <md-menu-item>\n            <md-button ui-sref="todo.finished">\n              <md-icon class="material-icons">done</md-icon>\n              Finished\n            </md-button>\n          </md-menu-item>\n          <md-menu-item>\n            <md-button ui-sref="todo.unfinished">\n              <md-icon class="material-icons">close</md-icon>\n              Unfinished\n            </md-button>\n          </md-menu-item>\n          <md-menu-item>\n            <md-button ui-sref="todo.front">\n              <md-icon class="material-icons">code</md-icon>\n              Front-end\n            </md-button>\n          </md-menu-item>\n          <md-menu-item>\n            <md-button ui-sref="todo.back">\n              <md-icon class="material-icons">keyboard</md-icon>\n              Back-end\n            </md-button>\n          </md-menu-item>\n        </md-menu-content>\n      </md-menu>\n    </div>\n  </md-toolbar>',
  bindings: {
    filter: '<'
  }
});

function todoHeaderController($mdDialog) {
  var self = this;

  self.showDialog = function (event) {
    $mdDialog.show({
      contentElement: '#todo-form',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true
    });
  };

  self.openMenu = function ($mdOpenMenu, event) {
    $mdOpenMenu(event);
  };
};

app.component('todoItem', {
  controller: todoItemController,
  template: '<md-list-item>\n    <md-checkbox ng-checked="$ctrl.completed" ng-click="$ctrl.toggleTodo()"></md-checkbox>\n    <p>{{ $ctrl.description }}</p>\n    <i class="material-icons" md-colors="{color:\'warn\'}" ng-click="$ctrl.deleteTodo()" aria-label="Delete">delete_forever</i>\n    <md-divider inset></md-divider>\n  </md-list-item>',
  bindings: {
    index: '<',
    description: '<',
    completed: '<',
    onDelete: '&',
    onUpdate: '&',
    onToggle: '&'
  }
});

function todoItemController() {
  var self = this;

  self.deleteTodo = function () {
    self.onDelete({
      $event: {
        index: self.index
      }
    });
  };

  self.toggleTodo = function () {
    self.onToggle({
      $event: {
        index: self.index
      }
    });
  };
};

app.component('todoList', {
  controller: todoListController,
  template: '<md-list ng-cloak id="todo-list">\n    <div ng-repeat="todo in $ctrl.list">\n      <todo-item\n        index="todo.index"\n        description="todo.description"\n        completed="todo.completed"\n        on-delete="$ctrl.deleteTodo($event)"\n        on-toggle="$ctrl.toggleTodo($event)">\n      </todo-item>\n    </div>\n  </md-list>',
  bindings: {
    list: '<',
    onDelete: '&',
    onUpdate: '&',
    onToggle: '&'
  }
});

function todoListController() {
  var self = this;

  self.deleteTodo = function (event) {
    self.onDelete({
      $event: {
        index: event.index
      }
    });
  };

  self.toggleTodo = function (event) {
    self.onToggle({
      $event: {
        index: event.index
      }
    });
  };
};