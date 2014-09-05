

function Model(ClassLoader, SchemaBuilder, mongoose, SchemaProxy, container){

    container.locals.entitys = container.locals.entitys || {};

    this.getAll = function(){
        return SchemaBuilder.build(ClassLoader.getAll('/../model/entity'));
    };

    this.setup = function() {
        this.getAll().forEach(function(item){            
            container.service(item.name, function(){
                var instance = item.schema;
                container.locals.entitys[item.name] = instance;
                return instance;
            });
        });
        mongoose.connect("mongodb://127.0.0.1:27017/test");
    };

}

module.exports = Model;