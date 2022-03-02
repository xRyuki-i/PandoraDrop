DROP DATABASE fyp;
CREATE DATABASE fyp;
USE fyp;
CREATE TABLE account(
    id             INT AUTO_INCREMENT,
    usernameHash VARCHAR(64),
    passwordHash VARCHAR(64),
    userRole     VARCHAR(64),
    sessionId    VARCHAR(36),
    PRIMARY KEY(id)
);