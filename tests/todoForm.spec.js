describe('todo form', function() {
  beforeEach(module('app'));

  var element;
  var scope;
  var controller;

  beforeEach(inject(function($rootScope, $compile){
    scope = $rootScope.$new();
    element = angular.element('<todo-form></todo-form>');
    element = $compile(element)(scope);
    controller = element.controller('todoForm');
    scope.$apply();
  }));

  it('should call a function when the form has been send', function() {
    var callback = jasmine.createSpy('callback');

    controller.onSubmit = function() {
      callback();
    };

    controller.submitForm();
    expect(callback).toHaveBeenCalled();
  });
});

