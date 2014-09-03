
function SchemaProxy(){

    this.proxify = function(model) {
        return Proxy.create({
            get : function(object, property) {
                if(property.startsWith('get') && property !== 'get'){
                    var index = property.startsWith('getOneBy') ? 8 : 6;
                    var propertyName = property.substring(index, index+1).toLowerCase() + property.substring(index);
                    return function(value){
                        return model.find({
                            propertyName : value
                        });
                    }
                }
                return object[property];
            },
            set : function(object, property, value) {
                object[property] = value;
            }
        });
    }
}

module.exports = SchemaProxy;
