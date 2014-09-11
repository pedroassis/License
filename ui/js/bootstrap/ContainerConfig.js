
var ngDI                = angular;

var application         = ngDI.module("AE", [
    "AERoutes", 
    "directive.g+signin"
]);

var controllers = [
    "LoginController"
];

var services = [
    "AuthService",
    "EventService",
    "Facebook",
    "GooglePlus",
];

controllers.forEach(function(controllerName){
    application.controller(controllerName, window[controllerName]);
});

services.forEach(function(serviceName){
    application.service(serviceName, window[serviceName]);
});

application.factory('SafeApply', [function() {
    return function($scope, fn) {
        var phase = $scope.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
            if (fn) {
                $scope.$eval(fn);
            }
        } else {
            if (fn) {
                $scope.$apply(fn);
            } else {
                $scope.$apply();
            }
        }
    }
}]);