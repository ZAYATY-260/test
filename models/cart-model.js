class Cart {
    constructor(oldcart) {
        this.items = oldcart.items || {};
        this.totalQty = oldcart.totalQty || 0;
        this.totalPrice = oldcart.totalPrice || 0;
    

        this.add = function(item, id, size) {
        let storedItem = this.items[id + '-' + size];
        if (!storedItem) {
            storedItem = this.items[id + '-' + size] = { item: item, qty: 0, Price: 0, size: size };
        }
        storedItem.qty++;
        storedItem.Price = storedItem.item.Price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.Price;
    }

    this.reduceByOne = function(id, size) {
        const key = id + '-' + size;
        if (this.items[key]) {
            this.items[key].qty--;
            this.items[key].Price -= this.items[key].item.Price;
            this.totalQty--;
            this.totalPrice -= this.items[key].item.Price;

            if (this.items[key].qty <= 0) {
                delete this.items[key];
            }
        }
    }

    this.deleteAllItems = function() {
        this.items = {};
        this.totalPrice = 0;
        this.totalQty = 0;
    }

    this.removeItem = function(id, size) {
        const key = id + '-' + size;
        if (this.items[key]) {
            this.totalQty -= this.items[key].qty;
            this.totalPrice -= this.items[key].Price;
            delete this.items[key];
        }
    }

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }

    this.countProducts = function() {
        let count = 0;
        for (let id in this.items) {
            count += this.items[id].qty;
        }
        return count;
    }
}
}

module.exports = Cart;
