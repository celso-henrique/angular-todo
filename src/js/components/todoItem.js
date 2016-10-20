app.component('todoItem', {
  controller: todoItemController,
  template: `<md-list-item>
    <md-checkbox ng-checked="$ctrl.completed" ng-click="$ctrl.toggleTodo()"></md-checkbox>
    <p>{{ $ctrl.description }}</p>
    <i class="material-icons" md-colors="{color:'warn'}" ng-click="$ctrl.deleteTodo()" aria-label="Delete">delete_forever</i>
    <md-divider inset></md-divider>
  </md-list-item>`,
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

  self.deleteTodo = () => {
    self.onDelete({
      $event: {
        index: self.index
      }
    });
  };

  self.toggleTodo = () => {
    self.onToggle({
      $event: {
        index: self.index
      }
    });
  };
};
