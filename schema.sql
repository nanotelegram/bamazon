drop database if exists bamazon;
create database bamazon;

use bamazon;

create table products(
item_id int auto_increment not null, 
product_name varchar(50) not null,
department_name varchar (50) not null,
price decimal(10,2) not null, 
stock_quantity int(10) not null, 
primary key (item_id)
);

select * from products;
