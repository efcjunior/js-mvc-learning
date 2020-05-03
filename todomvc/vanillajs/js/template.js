(function (window){

    function Template(){
        this.defaultTemplate
		=	'<li data-id="{{id}}" class="{{completed}}">'
		+		'<div class="view">'
		+			'<input class="toggle" type="checkbox" {{checked}}>'
		+			'<label>{{title}}</label>'
		+			'<button class="destroy"></button>'
		+		'</div>'
		+	'</li>';
    }

    Template.prototype.clearCompletedButton = function (completedTodos) {
        if (completedTodos > 0) {
            return 'Clear completed';
        } else {
            return '';
        }
    };

    Template.prototype.itemCounter = function (activeTodos) {
        var plural = activeTodos === 1 ? '' : 's';

        return `<strong> ${activeTodos} </strong> item ${plural} left`;
    }

    Template.prototype.show = function (data) {
		var i, l;
		var view = '';

		for (i = 0, l = data.length; i < l; i++) {
			var template = this.defaultTemplate;
			var completed = '';
			var checked = '';

			if (data[i].completed) {
				completed = 'completed';
				checked = 'checked';
			}

			template = template.replace('{{id}}', data[i].id);
			template = template.replace('{{title}}', escape(data[i].title));
			template = template.replace('{{completed}}', completed);
			template = template.replace('{{checked}}', checked);

			view = view + template;
		}

		return view;
	};

    window.app = window.app || {};
    window.app.Template = Template;
}(window));