describe('todo item', function() {
  beforeEach(module('app'));

  var element;
  var scope;
  var controller;

  beforeEach(inject(function($rootScope, $compile){
    scope = $rootScope.$new();
    element = angular.element('<todo-item></todo-item>');
    element = $compile(element)(scope);
    controller = element.controller('todoItem');
    controller.description = 'Title';
    controller.completed = false;
    scope.$apply();
  }));

  it('should contain a title equal the item description', function() {
    expect(element.find('p').text()).toBe('Title');
  });
});
