

function SchemaBuilder(Schema, ObjectId, $injector){

    function* entries(obj) {
       for (let key of Object.keys(obj)) {
         yield [key, obj[key]];
       }
    }

    this.build = (modelGetter, name) => {
        var schema = {};

        var model = $injector.invoke(modelGetter);

        var lookup = {
            true : (relation) => ({
                type    : ObjectId,
                ref     : relation.name
            }),
            false : (relation) => relation;
        };

        for (let [key, value] of entries(model)) {
            schema[key] = lookup[Function.isFunction(value)](value);
        }

        return {
            schema : new Schema(schema),
            name : name
        };
    }

}

module.exports = SchemaBuilder;