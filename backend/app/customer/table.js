const { createPool } = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Reenukoju7$",
    database: "fyp",
})

class CustomerTable{
    static storeCustomer({accountId, profilePicture, contact, address}) {
        const sql = `INSERT INTO customer(profilePicture, contact, address, accountId) VALUES("${profilePicture}", "${contact}", "${address}", ${accountId})`
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
}

module.exports = CustomerTable;