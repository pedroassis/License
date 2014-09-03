

function SchemaBuilder(Schema, ObjectId, $injector){

    var locals = {};

    var lookup = {
        false : function(relation){
            return {
                type    : ObjectId,
                ref     : relation[0]
            }
        },
        true : function(relation){
            return relation;
        }
    };

    this.build = function(models){
        var schema = {};

        models.forEach(function(modelGetter){
            locals[modelGetter.name] = modelGetter;
        });

        return models.map(function(modelGetter){
            locals[modelGetter.name] = modelGetter;

            var model = $injector.invoke(modelGetter, null, locals);

            Object.keys(model).forEach(function(key){
                schema[key] = lookup[model[key] instanceof Function](model[key]);
            });

            var schemaBuilt = new Schema(schema);

            locals[modelGetter.name] = modelGetter;

            return {
                schema : schemaBuilt,
                name : modelGetter.name
            };
        });
    }

}

module.exports = SchemaBuilder;