(function (window) {

    function Controller(model, view) {
        var self = this;
        self.model = model;
        self.view = view;

        self.view.bind('newTodo', function (title) {
			self.addItem(title);
		});
    }

    Controller.prototype.setView = function (locationHash) {
        var route = locationHash.split('/')[1];
        var page = route || '';
        this._updateFilterState(page);
        
    };

    Controller.prototype._updateFilterState = function (currentPage) {
        this._activeRoute = currentPage;

        if (currentPage === '') {
            this._activeRoute = 'All';
        }

        this._filter();

        this.view.render('setFilter', currentPage);
    };

    Controller.prototype._updateCount = function () {
        var self = this;

        self.model.getCount(function (todos){
            self.view.render('updateElementCount', todos.active);
            self.view.render('clearCompletedButton', {
				completed: todos.completed,
				visible: todos.completed > 0
            });
            self.view.render('toggleAll', {checked: todos.completed === todos.total});
			self.view.render('contentBlockVisibility', {visible: todos.total > 0});
        });

    };

    Controller.prototype.showActive = function () {
		var self = this;
		self.model.read({ completed: false }, function (data) {
			self.view.render('showEntries', data);
		});
    };

    Controller.prototype.showAll = function () {
		var self = this;
		self.model.read(function (data) {
			self.view.render('showEntries', data);
		});
	};
    
    Controller.prototype.showCompleted = function () {
		var self = this;
		self.model.read({ completed: true }, function (data) {
			self.view.render('showEntries', data);
		});
	};

    Controller.prototype._filter = function (force) {
        var activeRoute = this._activeRoute.charAt(0).toUpperCase() + this._activeRoute.substr(1);

        this._updateCount();

        if (force || this._lastActiveRoute !== 'All' || this._lastActiveRoute !== activeRoute) {
			this[`show${activeRoute}`]();
        }
        
        this._lastActiveRoute = activeRoute;
    };

    Controller.prototype.addItem = function (title) {
        var self = this;

        if(title.trim() === '') {
            return;
        }

        self.model.create(title, function () {
            self.view.render('clearNewTodo');
            self._filter(true);
        });
    }

    window.app = window.app || {};
    window.app.Controller = Controller;
}(window));