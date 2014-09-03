

function Model(ClassLoader, SchemaBuilder, mongoose, SchemaProxy, container){

    this.getAll = function(){
        return SchemaBuilder.build(ClassLoader.getAll('/../model/entity'));
    };

    this.setup = function() {
        this.getAll().forEach(function(item){            
            container.service(item.name, function(){
                return SchemaProxy.proxify(item.schema);
            });
        });
    };

}

module.exports = Model;