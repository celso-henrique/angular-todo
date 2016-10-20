describe('todo container', function() {
  beforeEach(module('app'));

  var element;
  var scope;
  var controller;

  beforeEach(inject(function($rootScope, $compile){
    scope = $rootScope.$new();
    element = angular.element('<todo></todo>');
    element = $compile(element)(scope);
    controller = element.controller('todo');
    controller.filter = 'front';
    scope.$apply();
  }));

  it('should receive the filter through the binding', function() {
    expect(controller.filter).toBe('front');
  });

  it('should store the todo store items', function() {
    controller.addTodo({
      todo : {
        description: 'test',
        type: 'front'
      }
    });

    controller.addTodo({
      todo : {
        description: 'test',
        type: 'front'
      }
    });

    expect(controller.todoList.length).toBe(2);
  });
});
