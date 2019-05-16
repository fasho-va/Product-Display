DROP DATABASE IF EXISTS products;

USE products;

CREATE TABLE information(
    product_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    cost INT NOT NULL,
    reviews INT,
    average_review INT,
    UUID INT NOT NULL,
    image_id INT NOT NULL,
    FOREIGN KEY fk_image(image_id)
    REFERENCES images(image_id)
);

CREATE TABLE images(
    image_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    img_1 VARCHAR(255),
    img_2 VARCHAR(255),
    img_3 VARCHAR(255),
    img_4 VARCHAR(255),
    img_5 VARCHAR(255),
    img_6 VARCHAR(255),
    img_7 VARCHAR(255)
);