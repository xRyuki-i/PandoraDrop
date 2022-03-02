const { createPool } = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Reenukoju7$",
    database: "fyp",
})

class AccountTable {
    static storeAccount({usernameHash, passwordHash, userRole}) {
        const sql = `INSERT INTO account(usernameHash, passwordHash, userRole) VALUES("${usernameHash}", "${passwordHash}", "${userRole}")`
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

    static getAccount({ usernameHash }) {
        const sql = `SELECT id,passwordHash,sessionId FROM account
                     WHERE usernameHash="${usernameHash}"`
        return new Promise((resolve,reject) => {
            pool.query(
                sql,
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ account: response[0] });
                }
            );    
        });
    }

    static updateSessionId({ sessionId, usernameHash }) {
        const sql = `UPDATE account SET sessionId="${sessionId}" 
                     WHERE usernameHash="${usernameHash}"`
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

module.exports = AccountTable;