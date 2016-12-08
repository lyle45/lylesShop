class ShopsService {

    constructor($resource) {
        this.products = $resource('/shop/getProducts').query();
    }

    getProducts() {
        return this.products;
    }
}

myApp.service('shopsService', ShopsService);