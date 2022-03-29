const { createPool } = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Reenukoju7$",
    database: "fyp",
})

class CartTable {
    static storeCart({ customerId }) {
        const sql = `INSERT INTO cart(customerId, ordered) VALUES(${customerId}, false)`
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


    static storeFood({ cartId, foodId }) {
        const sql = `INSERT INTO cart_food(cartId, foodId, Quantity) VALUES(${cartId}, ${foodId}, 1)`
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

    static removeFood({ cartId, foodId }) {
        const sql = `Delete FROM cart_food WHERE foodId=${foodId} AND cartId=${cartId}`
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

    static getCartFood({ cartId, foodId }) {
        const sql = `SELECT cartId,foodId,quantity FROM cart_food
                     WHERE cartId=${cartId} AND foodId=${foodId}`
        return new Promise((resolve,reject) => {
            pool.query(
                sql,
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ cartfood: response[0] });
                }
            );    
        });
    }

    static updateQuantity({ cartId, foodId, Quantity }) {
        const sql = `UPDATE cart_food SET Quantity=${Quantity} WHERE cartId=${cartId} AND foodId=${foodId}`
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

    static getCart({ customerId, ordered }) {
        const sql = `SELECT cartId,customerId,ordered FROM cart
                     WHERE customerId=${customerId} AND ordered=${ordered}`
        return new Promise((resolve,reject) => {
            pool.query(
                sql,
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ cart: response[0] });
                }
            );    
        });
    }

    static getCustomerCart({ customerId, ordered }) {
        const sql = `SELECT cart.cartId, food.foodName, food.price, restaurantId FROM cart
                     JOIN cart_food ON
                     cart.cartId = cart_food.cartId
                     JOIN food ON
                     cart_food.foodId = food.foodId
                     WHERE customerId=${customerId} AND ordered=${ordered}`
        return new Promise((resolve,reject) => {
            pool.query(
                sql,
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ cart: response });
                }
            );    
        });
    }

    static cartToOrder({ cartId }) {
        const sql = `UPDATE cart SET ordered=true 
                     WHERE cartId=${cartId}`
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

    static orderTotal({ cartId }){
        const sql = `Select cartId, SUM(price*quantity) total from cart_food join food on
                    cart_food.foodId = food.foodId
                    where cartId = ${cartId} GROUP BY cartId`
        return new Promise((resolve, reject) => {
            pool.query(
                sql,
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ cart: response[0] });
                }
            );
         });
    }
}

module.exports = CartTable;