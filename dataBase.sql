CREATE DATABASE Garden;
USE Garden;
CREATE TABLE Products (ItemID int AUTO_INCREMENT, PlantType varchar(50) NOT NULL, Type varchar(50) NOT NULL, Price varchar(30) NOT NULL, Amount int NOT NULL, PRIMARY KEY(ItemID) );
describe Products;
select * from Products;
INSERT INTO Products (PlantType, Type, Price, Amount) VALUES ("Spearmint", "Herbs", 3.50, 120);
INSERT INTO Products (PlantType, Type, Price, Amount) VALUES ("Basil", "Herbs", 4.50, 121);
INSERT INTO Products (PlantType, Type, Price, Amount) VALUES ("Rosemary", "Herbs", 3.50, 112);
INSERT INTO Products (PlantType, Type, Price, Amount) VALUES ("Rose", "Flower", 12.00, 39);
INSERT INTO Products (PlantType, Type, Price, Amount) VALUES ("Daisy", "Flower", 10.00, 43);
INSERT INTO Products (PlantType, Type, Price, Amount) VALUES ("Mesquite", "Tree", 230.99, 11);
INSERT INTO Products (PlantType, Type, Price, Amount) VALUES ("Palo Verde", "Tree", 130.99, 6);
INSERT INTO Products (PlantType, Type, Price, Amount) VALUES ("Orchid", "Flower", 35.00, 33);
INSERT INTO Products (PlantType, Type, Price, Amount) VALUES ("Sage", "Herbs", 4.50, 23);
INSERT INTO Products (PlantType, Type, Price, Amount) VALUES ("Oregano", "Herbs", 4.50, 129);

select * from Products;
