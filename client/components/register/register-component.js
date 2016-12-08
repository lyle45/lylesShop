class Register {

    constructor(userService, $state) {
        this._userService = userService;
        this._$state = $state
    }
    register() {
        this.error = false;
        this.disabled = true;

        // call register from service
        this._userService.register(this.registerForm.username, this.registerForm.password)
        // handle success
            .then(() => {
                this._$state.go('login');
                this.disabled = false;
                this.registerForm = {};
            })
            // handle error
            .catch(() => {
                this.error = true;
                this.errorMessage = "Something went wrong!";
                this.disabled = false;
                this.registerForm = {};
            });
    }
}

myApp.component('register', {
    templateUrl: 'components/register/register.html',
    controller: Register
});