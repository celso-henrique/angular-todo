app.component('todo', {
  controller: todoContainerController,
  template: `<section class="todoApp">
    <todo-form id="todo-form-wrapper" on-submit="$ctrl.addTodo($event)"></todo-form>
    <todo-header filter="$ctrl.filter"></todo-header>
    <md-content flex ng-if="$ctrl.todoList.length > 0">
      <todo-list
        list="$ctrl.todoList"
        on-delete="$ctrl.deleteTodo($event)"
        on-toggle="$ctrl.toggleTodo($event)">
      </todo-list>
    </md-content>
  </section>`,
  bindings: {
    filter: '<'
  }
});

function todoContainerController(todoStore, $state, $mdDialog) {
  var self = this;

  var dispose = mobx.autorun(() => {
    var todoList = todoStore.getAllTodos();
    self.todoList = getListBasedOnFilter(todoList, self.filter);
  });

  self.$onDestroy = () => {
    dispose();
  };

  self.addTodo = (event) => {
    todoStore.addTodo(event.todo);
  };

  self.deleteTodo = (event) => {
    todoStore.deleteTodo(event.index);
  };

  self.toggleTodo = (event) => {
    todoStore.toggleTodo(event.index);
  };


  function getListBasedOnFilter(list, filter) {
    if (!filter) return list;

    var filterMap = {
      all(item) { return true; },
      finished(item) { return item.completed },
      unfinished(item) { return !item.completed },
      back(item) { return item.type === 'back' },
      front(item) { return item.type === 'front' }
    };

    return list.filter(filterMap[filter]);
  }
}
