
function EventService($rootScope){

    this.on = $rootScope.$on.bind($rootScope);

    this.trigger = $rootScope.$broadcast.bind($rootScope);
}