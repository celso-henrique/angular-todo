app.component('todoHeader', {
  controller: todoHeaderController,
  template: `<md-toolbar>
    <div class="md-toolbar-tools">
      <h2 id="logo"><md-icon class="material-icons">done_all</md-icon>TODO <span ng-if="$ctrl.filter != 'all'"> - {{ $ctrl.filter }} </span></h2>
      <span flex></span>
      <md-button aria-label="Add task" ng-click="$ctrl.showDialog()" class="md-raised">
        Add task
      </md-button>
      <md-menu>
        <md-button aria-label="Open categories menu" class="md-icon-button" ng-click="$ctrl.openMenu($mdOpenMenu, $event)">
          <md-icon class="material-icons">menu</md-icon>
        </md-button>
        <md-menu-content width="4">
          <md-menu-item>
            <md-button ui-sref="todo.all">
              <md-icon class="material-icons">device_hub</md-icon>
              All
            </md-button>
          </md-menu-item>
          <md-menu-item>
            <md-button ui-sref="todo.finished">
              <md-icon class="material-icons">done</md-icon>
              Finished
            </md-button>
          </md-menu-item>
          <md-menu-item>
            <md-button ui-sref="todo.unfinished">
              <md-icon class="material-icons">close</md-icon>
              Unfinished
            </md-button>
          </md-menu-item>
          <md-menu-item>
            <md-button ui-sref="todo.front">
              <md-icon class="material-icons">code</md-icon>
              Front-end
            </md-button>
          </md-menu-item>
          <md-menu-item>
            <md-button ui-sref="todo.back">
              <md-icon class="material-icons">keyboard</md-icon>
              Back-end
            </md-button>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>
  </md-toolbar>`,
  bindings: {
    filter: '<'
  }
});

function todoHeaderController($mdDialog) {
  var self = this;

  self.showDialog = (event) => {
    $mdDialog.show({
      contentElement: '#todo-form',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true
    });
  };

  self.openMenu = ($mdOpenMenu, event) => {
    $mdOpenMenu(event);
  };
};
