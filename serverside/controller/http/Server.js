

function Server(httpBindings, HTTPServer, controllers, DefaultCRUD){

    this.bind = function(){

        httpBindings.forEach(function(binding){
            httpServer.addCRUD(new DefaultCRUD(binding.url, controllers[binding.controller]));
        });

    }    
}

