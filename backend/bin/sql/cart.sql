CREATE TABLE cart(
    cartId     INT AUTO_INCREMENT,
    customerId INT,
    ordered    Boolean,
    PRIMARY KEY(cartId),
    FOREIGN KEY (customerId) REFERENCES customer(customerId)
);

CREATE TABLE cart_food(
    foodCartId INT AUTO_INCREMENT,
    cartId INT,
    foodId INT,
    Quantity INT,
    PRIMARY KEY(foodCartId),
    FOREIGN KEY (cartId) REFERENCES cart(cartId),
    FOREIGN KEY (foodId) REFERENCES food(foodId)
);