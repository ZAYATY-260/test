

class Cart {
    constructor(oldcart) {
        this.items = oldcart.items || {};
        this.totalQty = oldcart.totalQty || 0;
        this.totalPrice = oldcart.totalPrice || 0;
    }

    add(item, id) {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, qty: 0, Price: 0 };
        }
        storedItem.qty++;
        storedItem.Price = storedItem.item.Price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.Price;
    }

    reduceByOne(id) {
        console.log("Reducing quantity by one for item with id:", id);
        console.log("Previous quantity:", this.items[id] ? this.items[id].qty : "Item not found");
        if (this.items[id]) {
            this.items[id].qty--;
            this.items[id].Price -= this.items[id].item.Price;
            this.totalQty--;
            this.totalPrice -= this.items[id].item.Price;
    
            if (this.items[id].qty <= 0) {
                console.log("Quantity became zero or less. Deleting item with id:", id);
                delete this.items[id];
            }
        } else {
            console.log("Item with id:", id, "not found in cart.");
        }
        console.log("New quantity:", this.items[id] ? this.items[id].qty : "Item not found");
        console.log("Total quantity after reduction:", this.totalQty);
        console.log("Total price after reduction:", this.totalPrice);
    }
    
    
    

    deleteAllItems() {
        this.items = {};
        this.totalPrice = 0;
        this.totalQty = 0;
    }

    removeItem(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].Price;
        delete this.items[id];
    }

    generateArray() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }

    countProducts() {
        let count = 0;
        for (let id in this.items) {
            count += this.items[id].qty;
        }
        return count;
    }
}

module.exports = Cart;
