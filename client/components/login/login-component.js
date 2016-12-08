class Login {

    constructor(userService, $state) {
        this._userService = userService;
        this._$state = $state;
    }

    login() {
        // initial values
        this.error = false;
        this.disabled = true;
        // call login from service
        this._userService.login(this.loginForm.username, this.loginForm.password)
        // handle success
            .then(() => {
                this._$state.go('main.catalog');
                this.disabled = false;
                this.loginForm = {};
            })
            // handle error
            .catch(() => {
                this.error = true;
                this.errorMessage = "Invalid username and/or password";
                this.disabled = false;
                this.loginForm = {};
            });

    };
}

myApp.component('login', {
    templateUrl: 'components/login/login.html',
    controller: Login
});