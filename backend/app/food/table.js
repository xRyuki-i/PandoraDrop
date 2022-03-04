const { createPool } = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Reenukoju7$",
    database: "fyp",
})

class FoodTable{
    static storeFood({foodName, price, restaurantId}) {
        const sql = `INSERT INTO food(foodName, price, restaurantId) VALUES("${foodName}", "${price}", ${restaurantId})`
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

    static getFood({ restaurantId }) {
        const sql = `SELECT FoodId,FoodName,Price FROM food
                     WHERE restaurantId="${restaurantId}"`
        return new Promise((resolve,reject) => {
            pool.query(
                sql,
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ food: response });
                }
            );    
        });
    }
}

module.exports = FoodTable;