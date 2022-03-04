const { createPool } = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Reenukoju7$",
    database: "fyp",
})

class RestaurantTable{
    static storeRestaurant({accountId, logo, address, openingTime, priceRange, description}) {
        const sql = `INSERT INTO restaurant(accountId, logo, address, openingTime, priceRange, description) VALUES
                    (${accountId}, "${logo}", "${address}", "${openingTime}", "${priceRange}", "${description}")`
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

    static getRestaurant({ accountId }) {
        const sql = `SELECT restaurantId, logo, address, openingTime, priceRange, description FROM restaurant
                     WHERE accountId=${accountId}`
        return new Promise((resolve,reject) => {
            pool.query(
                sql,
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ restaurant: response[0] });
                }
            );    
        });
    }
}

module.exports = RestaurantTable;