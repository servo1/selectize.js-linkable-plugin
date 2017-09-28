Selectize.define('linkable', function (options) {
		if (this.settings.mode !== 'multi') return;

		options = $.extend({
			linkFormat: this.settings.linkFormat || '#object={{object}}&id={{id}}&action={{action}}&name={{name}}',
			linkTemplate: this.settings.linkTemplate || '<a href="{{link}}">{{linkText}}</a>',
			linkData: this.settings.linkData || { object: 'funchains', action: 'edit'}
		}, options);
		//was singleClose
		function subt  (str, data) {
			if (typeof str == "string" && typeof data == "object") {
				return str.replace(/{{(\w*)}}/g, function (match, key) {
					return data.hasOwnProperty(key) ? data[key] : "";
				});
			} else {
				return str;
			}
		}

		var clickLink = function (thisRef, options) {

			var self = thisRef;

			thisRef.setup = (function () {
				var original = self.setup;
				return function () {
					// override the item rendering method to add the button to each
					var render_item = self.settings.render.item;
					self.settings.render.item = function (data) {
						//ge(self, options, data, render_item)

						var og = render_item.apply(self, arguments);
						var linkText = $(og).text();
						var prop, passdata = {};
						for (prop in data){
							passdata[prop] = data[prop];
						}
						for (prop in options.linkData){
							passdata[prop] = options.linkData[prop];
						}
						var link = subt(options.linkFormat, passdata);
						var newText = og.replace(linkText, subt(options.linkTemplate, {
							link: link,
							linkText: linkText
						}));
						return newText;
					};

					original.apply(thisRef, arguments);

					// add event listener
					thisRef.$control.on('click', '.' + options.className, function (e) {
						ge(data, self.settings.render.item)
						e.preventDefault();
						ge("here we are", self)
						if (self.isLocked) return;

						var $item = $(e.currentTarget).parent();
						ge("here we are", self, $item)
						self.setActiveItem($item);
						if (self.deleteSelection()) {
							self.setCaret(self.items.length);
						}
					});
				};
			})();
		};
		clickLink(this, options);
	});
