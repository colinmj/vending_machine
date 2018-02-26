## Vending Machine

I've written the functionality of a vending machine using a test driven development approach. While there is no UI to accompany the functionality, there are functions to display all the products in a machine, restock products, add up the coins inserted into the machine and allow user to purchase if the combined coins equal the cost of the product, restock change, only supply products if that product is in stock and if the price requirement is met, and dispense change accordingly depending on the availability of coins in the machine.

##Getting Started

In the spec file in the test folder there are 3 different vending machines created from the vending machine class in the lib folder. These vending machines are created using several different collections of products and coin combinations found in the mocks folder. In the spec folder there are 31 passing tests that represent different functions of the vending machine with different combinations.

To give it a go, clone this repo, npm install, and then run 'jest' in the project root directory to see the beatiful green colour of passing tests.

## Built with

* JavaScript

## Author

Colin Matson-Jones

![Screen Shot](test_pass.png?raw=true "test pass")
