app.component('todoList', {
  controller: todoListController,
  template: `<md-list ng-cloak id="todo-list">
    <div ng-repeat="todo in $ctrl.list">
      <todo-item
        index="todo.index"
        description="todo.description"
        completed="todo.completed"
        on-delete="$ctrl.deleteTodo($event)"
        on-toggle="$ctrl.toggleTodo($event)">
      </todo-item>
    </div>
  </md-list>`,
  bindings: {
    list: '<',
    onDelete: '&',
    onUpdate: '&',
    onToggle: '&'
  }
});

function todoListController() {
  var self = this;

  self.deleteTodo = (event) => {
    self.onDelete({
      $event: {
        index: event.index
      }
    });
  };

  self.toggleTodo = (event) => {
    self.onToggle({
      $event: {
        index: event.index
      }
    });
  }
};
