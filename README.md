# selectize.js-linkable-plugin
Allows multi select buttons to become links with regex pattern matching on data.

Requires three options for settings

```
  linkFormat: '#object={{object}}&id={{id}}&action={{action}}&name={{name}}',
  linkTemplate: this.settings.linkTemplate || '<a href="{{link}}">{{linkText}}</a>',
  linkData: this.settings.linkData || { object: 'funchains', action: 'edit'}
```

Implementation looks like this

```
$('#myselectize).selectize({
  plugins: ['remove_button', 'restore_on_backspace', 'drag_drop', 'linkable'],
  valueField: 'id',
  labelField: 'name',
  searchField: 'name',
  sortField: 'name',
  linkFormat: '#object={{object}}&id={{id}}&action={{action}}&name={{name}}',
  linkTemplate: '<a href="{{link}}">{{linkText}}</a>',
  linkData: { object: relobj.name, action: 'edit'}
});
```
Uses regex pattern matching to replace items within the double curly brackets {{}}.
First process it uses is going through the data for the specified item in the select list.  Then it appends the data contained within the 'linkData' option.  

The 'linkText' is the text extracted from item.  The plugin only replaces the text surrounding it with the 'linkTemplate'.
