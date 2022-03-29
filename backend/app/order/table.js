const { createPool } = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Reenukoju7$",
    database: "fyp",
})

class OrderTable {
    static storeOrder({ cartId, total }) {
        const sql = `INSERT INTO orders(cartId, total, orderPlaced) VALUES(${cartId}, ${total}, now())`
        return new Promise((resolve, reject) => {
            pool.query(
                sql,
                (error, response) => {
                    if (error) return reject(error);

                    resolve();
                }
            );
        });
    }

    static getOrder({ restaurantId }) {
        const sql = `SELECT orders.orderId, orders.total, orders.orderPlaced, food.foodName, cart_food.Quantity, food.price, customer.contact, customer.address, customer.customerId, food.restaurantId from orders 
                     JOIN cart ON orders.cartId = cart.cartId 
                     JOIN cart_food ON cart.cartId = cart_food.cartId 
                     JOIN food ON cart_food.foodId = food.foodId
                     JOIN customer ON cart.customerId = customer.customerId
                     WHERE restaurantId = ${restaurantId}`
        return new Promise((resolve, reject) => {
            pool.query(
                sql,
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ order: response });
                }
            );
        });
    }
}

module.exports = OrderTable;