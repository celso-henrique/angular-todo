app.service('todoStore', todoStore);

function todoStore() {
  var self = this;
  var todoList = mobx.observable([]);

  self.getAllTodos = () => {
    return todoList;
  };

  self.addTodo = (todo) => {
    var newTodo = Object.assign({}, todo, {
      index: todoList.length,
      completed: false
    });

    todoList.push(newTodo);
  };

  self.deleteTodo = (index) => {
    todoList.splice(index, 1);
  };

  self.toggleTodo = (index) => {
    todoList[index].completed = !todoList[index].completed;
  };
}


