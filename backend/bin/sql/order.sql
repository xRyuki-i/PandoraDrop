CREATE TABLE orders(
    orderId    INT AUTO_INCREMENT,
    cartId     INT,
    total      INT,
    orderPlaced datetime,  
    PRIMARY KEY(orderId),
    FOREIGN KEY (cartId) REFERENCES cart(cartId)
);