CREATE TABLE food(
    foodId          INT AUTO_INCREMENT,
    foodName        VARCHAR(64),
    price           VARCHAR(64),
    restaurantId    INT,
    PRIMARY KEY (foodId),
    FOREIGN KEY (restaurantId) REFERENCES restaurant(restaurantId)
);