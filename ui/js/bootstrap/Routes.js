
var AEApp = angular.module('AERoutes', [
    "ngRoute"
    ]
);


AEApp.config(['$routeProvider', function($routeProvider) {

        $routeProvider
            .when('/login', {
                templateUrl: 'html/login.html'
            })
            .when('/home', {
                templateUrl: 'html/home.html'
            })
            .otherwise({redirectTo: '/'});
}]);