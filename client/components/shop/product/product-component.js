class Product {
}

myApp.component('product', {
    templateUrl: 'components/shop/product/product.html',
    controller: Product,
    bindings: {
        product: '=',
        cartAction: '&',
        isCartProduct: '=?'
    }
});