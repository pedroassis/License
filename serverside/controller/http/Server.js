

function Server(httpBindings, HTTPServerClass, controllers, DefaultCRUD, container, DefaultController, Q){

    this.setup = function(){
        var expressAdapter          = new HTTPServerClass.ExpressAdapter();
        var HTTPServer              = new HTTPServerClass.HTTPServer(expressAdapter, 9999, "localhost");
        
        expressAdapter.addStaticFolder(__dirname + '/../../../ui');

        httpBindings.definitions.forEach(function(binding){
            var controller = new DefaultController(container.locals.entitys[binding.model], Q);
            HTTPServer.addCRUD(new DefaultCRUD(binding.url, controller, binding.parameters));
        });

        HTTPServer.addInterceptor(function(request, response){

            // if(request.path !== '/login' && !request.session.user){
            //     throw new Error("Area restrita");
            // }
        });

        HTTPServer.start();

        container.locals.HTTPServer = HTTPServer;

    }    
}

module.exports = Server;