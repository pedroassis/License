
function SchemaProxy(){

    this.proxify = (model) => new Proxy({
        get : (object, property) => {
            if(property.startsWith('get')){
                var index = property.startsWith('getOneBy') ? 8 : 6;
                var propertyName = property.substring(index, index+1).toLower() + property.substring(index);
                return (value) => {
                    return model.find({
                        propertyName : value
                    });
                }
            }
            return object[property];
        },
        set : (object, property, value) => {
            object[property] = value;
        }
    });
}

module.exports = SchemaProxy;
