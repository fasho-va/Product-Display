DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

SELECT products;


CREATE TABLE information (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    cost DECIMAL NOT NULL,
    reviews INT,
    average_review INT,
    UUID INT NOT NULL
);

DROP TABLE IF EXISTS information;

CREATE TABLE images (
    image_ID SERIAL PRIMARY KEY,
    img_1 VARCHAR(255),
    img_2 VARCHAR(255),
    img_3 VARCHAR(255),
    img_4 VARCHAR(255),
    img_5 VARCHAR(255),
    img_6 VARCHAR(255),
    img_7 VARCHAR(255),
    product_id INT NOT NULL,
    FOREIGN KEY (product_id)
    REFERENCES information (product_id)
);
DROP TABLE IF EXISTS images;
