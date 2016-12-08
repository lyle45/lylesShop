class Toolbar {

    constructor(userService, $state) {
        this._userService = userService;
        this.$state = $state;
        this.username = userService.getUsername()
    }

    logout() {
        this._userService.logout().then(() => {
            this.$state.go('login')
        });
    }

    moveToCart() {
        this._$state.go('main.cart');
    }
}

myApp.component('toolbar', {
    templateUrl: 'components/shop/toolbar/toolbar.html',
    controller: Toolbar
})