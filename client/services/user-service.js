class UserService {

    constructor($http, $q) {
        this._$http = $http;
        this._$q = $q;
        this._user = JSON.parse(sessionStorage.getItem('user')) || null;
    }

    login(username, password) {
        let deferred = this._$q.defer();
        this._$http.post('/user/login',
            {username: username, password: password})
        // handle success
            .success((data, status) => {
                if (status === 200) {
                    this.setUser(data.user);
                    deferred.resolve();
                } else {
                    this.clearUser();
                    deferred.reject();
                }
            })
            .error(() => {
                this.clearUser();
                deferred.reject();
            });
        return deferred.promise;
    }

    register(username, password) {
        let deferred = this._$q.defer();
        this._$http.post('/user/register',
            {username: username, password: password})
        // handle success
            .success((data, status) => {
                if (status === 200 && data.status) {
                    this.setUser(data.user);
                    deferred.resolve();
                } else {
                    this.clearUser();
                    deferred.reject();
                }
            })
            .error(() => {
                this.clearUser();
                deferred.reject();
            });
        return deferred.promise;
    }

    logout() {
        let deferred = this._$q.defer();
        this._$http.get('/user/logout')
            .success((data, status) => {
                if (status === 200) {
                    this.clearUser();
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            })
            .error((err) => {
                deferred.reject(err);
            });
        return deferred.promise;
    }

    setUser(user) {
        this._user = user;
        this._user.cart = [];
        sessionStorage.setItem('user', JSON.stringify(this._user));
    }

    clearUser() {
        sessionStorage.setItem('user', undefined);
        this._user = undefined;
    }

    getUserLoginStatus() {
        return this._$http.get('/user/status')
    }

    getUsername() {
        return this._user.username
    }

    getCart() {
        return this._user.cart;
    }

    addToCart(product) {
        let index = _.findIndex(this._user.cart, {_id: product._id});
        if (index >= 0) {
            this._user.cart[index].counter++
        } else {
            product.counter = 1;
            this._user.cart.push(product);
        }
    }
    removeFromCart(product) {
        let index = _.findIndex(this._user.cart, {_id: product._id});
        if (index >= 0) {
            if (--this._user.cart[index].counter < 1) {
                this._user.cart.splice(index, 1);
            }
        }
    }
}
myApp.service('userService', UserService);