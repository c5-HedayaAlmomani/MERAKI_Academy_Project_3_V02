-- Build Your Tables Here --

DROP DATABASE MERAKI_Academy_Project_3;

CREATE DATABASE MERAKI_Academy_Project_3;
USE MERAKI_Academy_Project_3; 
CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
USE MERAKI_Academy_Project_3
CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    age INT(3),
    country VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);
CREATE TABLE articles (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(255),
    description VARCHAR(255),
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES users(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);
CREATE TABLE comments(
    id INT AUTO_INCREMENT NOT NULL,
    comment VARCHAR(255),
    article_id INT,
    FOREIGN KEY (article_id) REFERENCES articles(id),
    commenter_id INT,
    FOREIGN KEY (commenter_id) REFERENCES users(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

