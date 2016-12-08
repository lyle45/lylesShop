class Cart {

    constructor(userService) {
        this._userservice = userService;
        this.products = userService.getCart();
    }

    removeFromCart(product) {
        this._userservice.removeFromCart(product);
    }
}


myApp.component('cart', {
    templateUrl: 'components/shop/cart/cart.html',
    controller: Cart
});