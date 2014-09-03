

function DefaultCRUD(url, Controller){

    this.url = url;

    this.get = function(){
        return Controller.getAll();
    };

    this.getById = function(app, resolver, request){
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

}

module.exports = DefaultCRUD;
