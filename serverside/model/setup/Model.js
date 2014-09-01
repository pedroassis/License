

function Model(ClassLoader, SchemaBuilder, Mongoose, SchemaProxy){

    this.getAll = () => ClassLoader
                            .getAll('model/entity/')
                            .sort((a, b) => a.length < b.length)
                            .map((model) => SchemaBuilder.build(model));

    this.setup = (container) => {
        for(let [name, schema] of this.getAll()){
            container.service(name, () => SchemaProxy.proxify(schema));
        }
    }

}

module.exports = Model;