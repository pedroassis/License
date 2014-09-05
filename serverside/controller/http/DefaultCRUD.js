

function DefaultCRUD(url, Controller, parameters){

    var defaultParameters = [
        "get:id", "post", "put", "delete", 'get'
    ];

    var methodBinder = {
        "get:id" : "getById", "post" : "save", "put" : "update", "delete" : "delete", 'get' : "get"
    };

    this.url = url;

    this.get = function(){
        return Controller.getAll();
    };

    this.getById = function(app, request){
        var username = "tester"; 
        var id = app._id; 
        return (Controller.getById(id));
    };
    
    this.save = function(app, resolver, request){
        var username = "tester"; 

        resolver.resolve(Controller.save(app, username));
    };
    
    this.update = function(app, resolver, request){
        var username = "tester";      
           
        resolver.resolve(Controller.update(app, username));
    };
    
    this.delete = function(app, resolver, request){
        var id = app._id;
        var username = "tester";      
        resolver.resolve(Controller.delete(id, username));
    };

    defaultParameters.filter(function(parameter){
        return parameters.indexOf(parameter) === -1;
    }).forEach(function(parameter){
        delete this[methodBinder[parameter]];
    }.bind(this));

}

module.exports = DefaultCRUD;
