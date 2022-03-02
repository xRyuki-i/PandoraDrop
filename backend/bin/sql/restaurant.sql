CREATE TABLE restaurant(
    restaurantId     INT AUTO_INCREMENT,
    logo             VARCHAR(128),
    address          VARCHAR(64) NOT NULL,
    openingTime      VARCHAR(64) NOT NULL,
    priceRange       VARCHAR(64) NOT NULL,
    description      VARCHAR(200),
    accountId        INT,
    PRIMARY KEY(restaurantId),
    FOREIGN KEY (accountId) REFERENCES account(id)
);