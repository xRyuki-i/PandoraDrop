CREATE TABLE customer(
    customerId     INT AUTO_INCREMENT,
    profilePicture VARCHAR(128),
    contact        VARCHAR(64) NOT NULL,
    address        VARCHAR(64) NOT NULL,
    accountId      INT,
    PRIMARY KEY(customerId),
    FOREIGN KEY (accountId) REFERENCES account(id)
);