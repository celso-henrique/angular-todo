app.component('todoForm', {
  controller: todoFormController,
  template: `<div class="md-dialog-container" name="todoForm" id="todo-form">
    <md-dialog layout-padding>
      <form ng-submit="$ctrl.submitForm()">
        <h2 class="title">ADD TASK</h2>
        <md-input-container>
          <label>Task title</label>
          <input required name="description" ng-model="$ctrl.newTodo.description">
          <div ng-messages="todoForm.description.$error">
            <div ng-message="required">This field is required.</div>
          </div>
          <md-radio-group ng-model="$ctrl.newTodo.type">
            <md-radio-button value="front" class="radio md-primary">Front-end</md-radio-button>
            <md-radio-button value="back">Back-end</md-radio-button>
          </md-radio-group>
        </md-input-container>
        <md-dialog-actions>
          <md-button ng-click="$ctrl.closeDialog()">Cancel</md-button><md-button class="md-primary md-raised" type="submit">Add</md-button>
        </md-dialog-actions>
      </form>
    </md-dialog>
  </div>`,
  bindings: {
    onSubmit: '&'
  }
});

function todoFormController($mdDialog) {
  var self = this;

  self.$onInit = () => {
    self.newTodo = {
      type: 'front',
    };
    resetTodo();
  };

  self.closeDialog = () => {
    $mdDialog.hide();
    resetTodo();
  };

  self.submitForm = () => {
    var self = this;
    self.onSubmit({
      $event: {
        todo: self.newTodo
      }
    });

    self.closeDialog();
  };

  function resetTodo() {
    self.newTodo = {
      type: 'front'
    };
  }
}
