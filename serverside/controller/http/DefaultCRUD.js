

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

    this.getById = function(app, resolver, request){
        var username = request.session.user.username; 
        var id = app._id; 
        resolver(Controller.getById(id, username));
    };
    
    this.save = function(app, resolver, request){
        var username = request.session.user.username; 
        var id = app._id;    

        resolver(Controller.save(id, username));
    };
    
    this.update = function(app, resolver, request){
        var id = app._id;
        var username = request.session.user.username;     
           
        resolver(Controller.update(id, username));
    };
    
    this.delete = function(app, resolver, request){
        var id = app._id;
        var username = request.session.user.username;     
        resolver(Controller.delete(id, username));
    };

    defaultParameters.filter(function(parameter){
        return parameters.indexOf(parameter) === -1;
    }).forEach(function(parameter){
        delete this[methodBinder[parameter]];
    }.bind(this));

}

module.exports = DefaultCRUD;
