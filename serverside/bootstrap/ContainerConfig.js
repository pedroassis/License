
var ngDI 				= require("ng-di");

var application         = ngDI.module("Application", []);

var deps                = require('./deps.json');

function PopulateContainer(dependency, container, type){
    var lookup = {
        true : function(){
            return function(){
                return dependency.source ? container.locals[dependency.source][dependency.name] : lookup[false]();
            };
        },
        false : function(){
            return dependency.source ? container.locals[dependency.source][dependency.name] : require(dependency.require);
        }
    };
    var name = dependency.name || dependency.require;

    container.service(name, lookup[!!dependency.wrap]());

    container.locals[type] = container.locals[type] || [];

    container.locals[type].push(container.locals[name]);
}

application.run(function(container){

    Object.keys(deps.dependencies).forEach(function(key){
        deps.dependencies[key].forEach(function(dependency){
            PopulateContainer(dependency, container, key);
        });
    });

    deps.setup.forEach(function(configurable){
        container.locals[configurable].setup();
    });

});

application.factory("ngDI", function(){
    return ngDI;
});

application.service("container", function($injector){
    var locals = {};
    var localContainer = {
        service : function(name, getter){
            var instance = {};
            var factory = $injector.invoke(getter, instance, this.locals);
            locals[name] = factory || instance;
        },
        locals : locals
    };
    return localContainer;
});

application.constant("rootFolder", __dirname);

ngDI.injector(['Application']);