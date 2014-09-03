

function Server(httpBindings, HTTPServerClass, controllers, DefaultCRUD, container){

    this.setup = function(){
        var expressAdapter          = new HTTPServerClass.ExpressAdapter();
        var HTTPServer              = new HTTPServerClass.HTTPServer(expressAdapter, 8080, "localhost");
        
        expressAdapter.addStaticFolder(__dirname + '/../../../ui');

        httpBindings.definitions.forEach(function(binding){
            HTTPServer.addCRUD(new DefaultCRUD(binding.url, controllers[binding.controller], binding.parameters));
        });

        HTTPServer.addInterceptor(function(request, response){

            if(request.path !== '/login' &&  request.path.indexOf('hook') ==-1  && !request.session.user){
                throw new Error("Area restrita");
            }
        });

        HTTPServer.start();

        container.locals.HTTPServer = HTTPServer;

    }    
}

module.exports = Server;