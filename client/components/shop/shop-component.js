class Shop {
    constructor(shopsService) {
        this.products = shopsService.getProducts();
    }
}

myApp.component('shop', {
    templateUrl: 'components/shop/shop.html',
    controller: Shop
});