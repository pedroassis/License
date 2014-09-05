
function DefaultController(Model, Q){

    this.getAll = function(){
        return Model.find().exec();
    };

    this.getById = function(id, username){
        return Model.find({
            _id : id
        }).exec();
    };
    
    this.save = function(model, username){
        return Q.nfcall(Model.create.bind(Model), model);
    };
    
    this.update = function(model, username){
        var id = model._id;

        return Q.nfcall(Model.update.bind(Model), {
            _id : id
        }, model, {});
    };
    
    this.delete = function(model, username){
        var id = model._id;
        return this.getById(id).then(function(model){
            return Q.nfcall(model.remove.bind(model))
        })
    };
}
module.exports = DefaultController;