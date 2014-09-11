
function AuthService(EventService, GooglePlus, Facebook){

    var user;

    this.LOGIN = AuthService.name + ".LOGIN";

    this.LOGOUT = AuthService.name + ".LOGOUT";
    
    this.getLoggedUser = function(){
        return user;
    };

    this.logout = function(){
        delete user;
        EventService.trigger(this.LOGOUT);
    };

    var login = (function login(){
        EventService.trigger(this.LOGIN, user);
    }).bind(this);

    EventService.on(GooglePlus.LOGIN_EVENT, function (event, authResult) {
        user = authResult;
        login();
    });

    EventService.on(GooglePlus.LOGIN_FAILURE, this.logout);

    EventService.on(Facebook.LOGIN_EVENT, function (event, authResult) {
        user = authResult;
        login();
    });

    EventService.on(Facebook.LOGIN_FAILURE, this.logout);
}