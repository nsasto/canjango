@page Partials
@parent can.Mustache 2

# Partials

Partials are templates embedded in other templates.  Partials begin with a greater than sign, like `{{>my_partial}}`.  Partials inherit the calling context.  

Partials render at runtime, so recursive partials are possible but make sure you avoid infinite loops.

For example, this template and partial:

__base.mustache__

	<h2>Names</h2>
	{{#names}}
		{{>user.mustache}}
	{{/names}}

__user.mustache__

	<strong>{{name}}</strong>

The resulting expanded template at render time would look like:

	<h2>Names</h2>
	{{#names}}
		<strong>{{name}}</strong>
	{{/names}}

## Acquiring Partials

__Referencing Files__

Partials can reference a file path and file name in the template.

The following template uses a relative path (relative to the current page):

	<script id="template" type="text/mustache">
		{{>views/test_template.mustache}}
	</script>

The following template uses an absolute path (rooted to steal's root directory):

	<script id="template" type="text/mustache">
		{{>//myapp/accordion/views/test_template.mustache}}
	</script>

__Referencing by ID__

Partials can reference templates that exist in script tags on the page by 
referencing the `id` of the partial in the template.  For example:

	<script id="mytemplate" type="text/mustache">
		{{>mypartial}}
	</script>

	<script id="mypartial" type="text/mustache">
    	I am a partial.
	</script>

	var template = can.view("#mytemplate", {});

__Manually Registering__

Partials can be manually registered by calling `can.view.registerView` 
and passing an identifier and content.  For example:

	can.view.registerView('myTemplate', "My body lies over {{.}}")

in the template, you reference the template by the identifer you registered:

	{{>myTemplate}}

resulting in the template rendering with the current context applied to the partial.

## Passing Partials in Options

Partials can resolve the context object that contain partial identifiers in them.
For example:

	var template = can.view("#template", { 
		items: []
		itemsTemplate: "test_template.mustache" 
	});

	can.$(document.body).append(template);

then reference the partial in the template just like:

	<ul>
	{{#items}}
		<li>{{>itemsTemplate}}</li>
	{{/items}}
	</ul>