describe('todo list', function() {
  beforeEach(module('app'));

  var element;
  var scope;
  var controller;

  beforeEach(inject(function($rootScope, $compile){
    scope = $rootScope.$new();
    element = angular.element('<todo-list></todo-list>');
    element = $compile(element)(scope);
    controller = element.controller('todoList');
    controller.list = [
      {
        description: 'Testing',
        type: 'front',
        completed: true
      },
      {
        description: 'Testing 2',
        type: 'front',
        completed: true
      },
    ];
    scope.$apply();
  }));

  it('should render a item for each to do item', function() {
    expect(element.find('todo-item').length).toBe(2);
  });

  it('should contain a method that removes an item', function() {
    expect(controller.deleteTodo).toBeDefined();
  });
});
