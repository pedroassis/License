
function LoginController(AuthService, EventService, $location, SafeApply, $scope){

    EventService.on(AuthService.LOGIN, function(){
        $location.path("/home").replace();
        SafeApply($scope);
    });
}