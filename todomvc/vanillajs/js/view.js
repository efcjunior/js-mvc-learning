(function (window) {
    'use strict';

    function View(template) {
        this.template = template;

        this.ENTER_KEY = 13;
        this.ESCAPE_KEY = 27;

        this.$todoList = qs('.todo-list');
        this.$todoItemCounter = qs('.todo-count');
		this.$clearCompleted = qs('.clear-completed');
		this.$main = qs('.main');
		this.$footer = qs('.footer');
		this.$toggleAll = qs('.toggle-all');
		this.$newTodo = qs('.new-todo');
    }  


    View.prototype._clearCompletedButton = function (completedCount, visible) {
		this.$clearCompleted.innerHTML = this.template.clearCompletedButton(completedCount);
		this.$clearCompleted.style.display = visible ? 'block' : 'none';
	};


    View.prototype.bind = function (event, handler) {
       var self = this;
       if (event === 'newTodo') {
           $on(self.$newTodo, 'change', function () {
               handler(self.$newTodo.value);
           });
       }
    };

    View.prototype._setFilter = function (currentPage) {
        qs('.filters .selected').className = '';
        qs(`.filters [href="#/${currentPage}"]`).className = 'selected';
    };

    View.prototype.render = function (viewCmd, parameter) {
        var self = this;
        var viewCommands = {   
            showEntries: function () {
				self.$todoList.innerHTML = self.template.show(parameter);
			},        
            clearNewTodo: function () {
                self.$newTodo.value = '';
            },
            clearCompletedButton: function () {
				self._clearCompletedButton(parameter.completed, parameter.visible);
            },
            contentBlockVisibility: function () {
				self.$main.style.display = self.$footer.style.display = parameter.visible ? 'block' : 'none';
			},
            toggleAll: function () {
				self.$toggleAll.checked = parameter.checked;
            },
            updateElementCount: function () {
				self.$todoItemCounter.innerHTML = self.template.itemCounter(parameter);
            }, 
            setFilter: function () {
				self._setFilter(parameter);
			},           
        };

        viewCommands[viewCmd]();
    };

    window.app = window.app || {};
    window.app.View = View;
}(window));