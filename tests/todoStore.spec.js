describe('todoStore', function() {
  beforeEach(function() {
    this.store = new todoStore();
  });

  it('should return stored todo items', function() {
    this.store.addTodo({
      description: 'test',
      type: 'front'
    });

    expect(this.store.getAllTodos()[0].description).toBe('test');
  });

  it('should call observers on state change', function() {
    var callback = jasmine.createSpy('callback');

    mobx.autorun(function() {
      callback();
    });

    this.store.addTodo({
      description: 'test',
      type: 'front'
    });

    expect(callback).toHaveBeenCalled();
  });
});
