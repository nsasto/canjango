Canjango
========

Can.js / JQuery / Lungo Mobile development framework

Canjango is an experimental mobile framework that mergest the power of canjs' mvc structure, Lungo's mobile structure and styling and the extensibility of jquery.

While much of the html syntax is a one-to-one translation from Tapquo's Lungo the framework is inspired by Lungo and their design principles - it is __not__  a migration to canjs and so not all functionality from Lungo will necessarily be available in canjango. Specifically, I've only build canjango to replicate Lungo's visual components and so any other functionality such as Lungo.Data has no equivalent canjango implementation.

Most importantly, canjango is a jquery based framework and not quo.js which is Tapquo's custom jquery like framwork optimised for mobile devices. Depending on your requirements, this may be a great option (check them out [tapquo.com](http://tapquo.com/)] 

Canjango is very much a __work in progress__ and any comments/contributions would be appreciates.


##Usage

###Project Structure


###Markup

The html markup defines for the most part core functionality and elemnent behaviour and follows the design principles established by the tapQuo team. The intention of the html structure is to create an intuitive semantic structure for the entire project, starting from the markup language HTML, through a well organized CSS.

you can include view snippets as you would with any Canjs views, for example:

    <!--  this is a sub view reference in init.ejs -->  
    <%== can.view.render( 'app/home/views/demo1', {data: data} ) %>

###Getting started with markup

the basics of the markup usage is outlined below. for a more detailed overview, I would suggest checking out [lungo's excellent site] (http://lungo.tapquo.com/howto/prototype/).

###The html 

broadly, the structure of each App page will containg the following html elements.

* Section: The main container
* Article: a content container within the section. Each section may have multiple articles. It must be placed inside the section and the first article must have the class active in order to make it visible.
* Header (optional): Each __section__ can contain a __header__ where the section title is displayed. You can also add navigation buttons here.
* Footer: Each __section__ can contain a __footer__. As with the headers, you can include optional navigation elements here such as buttons.
* Asides: The Aside element is essentially a side menue. It provides a lateral area which will appear depending on the device (tablet) or hidden (mobile). Its structure is very similar to the section's.

Example usages are as follows:

<!-- language: lang-js -->
    <section id="main_section">
        <header>
        	<nav class="left">
    			<a id="menuone" href="#menu" data-router="aside" class="icon-menu"></a>
    		</nav>
    		<title class="title centered">Canjango Demo</title>
    		<nav class="right">
    			<a id="loginclick"  href="#loginSection" data-router="section" class="icon-user"></a>
    		</nav>
    	</header>
        
        <article id="main" class="active">
            {{CONTENT}}
        </article>

        <footer>
            <nav>
                <a href="#" data-icon="menu" class="active"></a>
                <a href="#" data-icon="share"></a>
                <a href="#" data-icon="user"></a>
                <a href="#" data-icon="users"></a>
            </nav>
        </footer>
    </section>

An aside structure is very similar to a standard section:

    <aside id="features" class="left">
        <header>
            <title>Features</title>
        </header>
    
        <article class="list scroll active">
            <ul>
                <li class="active">
                    <a href="#main-article" data-router="article">
                        <strong>Meet the framework</strong>
                    </a>
                </li>
                <li>
                    <a href="#layout" data-router="section">
                        <strong>Layout</strong>
                    </a>
                </li>
            </ul>
        </article>
    </aside>
