class Catalog {
    constructor(shopsService, userService) {
        this.products = shopsService.getProducts();
        this._userService = userService;
    }

    addToCart(product) {
        this._userService.addToCart(product);
    }

}

myApp.component('catalog', {
    templateUrl: 'components/shop/catalog/catalog.html',
    controller: Catalog
});