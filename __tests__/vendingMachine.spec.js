const products = require("../__mocks__/products");
const productsTwo = require("../__mocks__/products2");
const coins = require("../__mocks__/coins");
const coinsTwo = require("../__mocks__/coins2");

const VendingMachine = require("../lib/vendingMachine.js");
const coolMachine = new VendingMachine(products, coins);
const crackMachine = new VendingMachine(productsTwo, coinsTwo);

describe("Vending Machine", () => {
  test("Get Products", () => {
    const result = coolMachine.getProducts();
    expect(result).toEqual(products);
  });
  test("Buying Product Exact Change", () => {
    const result = coolMachine.buyProduct(products.Cheesies.name, 1.5);
    expect(result).toEqual("Enjoy your Cheesies, there are 9 left");
  });
  test("Excess Change", () => {
    const result = coolMachine.buyProduct(products.Lays.name, 3);
    expect(result).toEqual("1 loonie");
  });
  test("Change more than 2 dollars", () => {
    const result = coolMachine.buyProduct(products.Lays.name, 5);
    expect(result).toEqual(
      "That doesn't make any sense, and I'm going to keep your change as punishment"
    );
  });
  test("Insufficient Funds", () => {
    const result = coolMachine.buyProduct(products.Coke.name, 1.5);
    expect(result).toEqual("You're 0.75 short of a tasty snack!");
  });
  test("More than 4 quarters", () => {
    const result = coolMachine.buyProduct(products.Coke.name, 3.5);
    expect(result).toEqual("1 loonie 1 quarter");
  });
  test("Change breakdown", () => {
    const result = coolMachine.buyProduct(products.Cheesies.name, 1.85);
    expect(result).toEqual("1 quarter and 1 dime, 99 quarters, 99 dimes");
  });
  test("Stock up", () => {
    const result = coolMachine.stockUp(products.Coke.name);
    expect(result).toEqual(10);
  });
  test("Stock up no needed", () => {
    const result = coolMachine.stockUp(products.Cheesies.name);
    expect(result).toEqual("No need to stock up yet!");
  });
  test("Need more coins", () => {
    const result = coolMachine.insertPayment(
      [coins.loonie.value],
      products.Cheesies.price
    );
    expect(result).toEqual("Insert more change");
  });
  test("Enough change", () => {
    const result = coolMachine.insertPayment(
      [
        coins.loonie.value,
        coins.quarter.value,
        coins.quarter.value,
        coins.quarter.value,
        coins.quarter.value
      ],
      products.Lays.price
    );
    expect(result).toEqual("Good to go");
  });
  test("Coins must be an array", () => {
    const result = coolMachine.insertPayment("loonie", "quarter", "quarter");
    expect(result).toEqual("Payment must be an array");
  });
  test("Nickel change", () => {
    const result = coolMachine.buyProduct(products.Lays.name, 2.55);
    expect(result).toEqual("2 quarters and 1 nickel");
  });
  test("Dimes and Nickels", () => {
    const result = coolMachine.buyProduct(products.Lays.name, 2.65);
    expect(result).toEqual("2 quarters, 1 dime, and 1 nickel");
  });
  test("Test", () => {
    const result = coolMachine.buyProduct(products.Lays.name, 2.9);
    expect(result).toEqual("3 quarters, 1 dime, and 1 nickel");
  });
  test("Low change", () => {
    const result = coolMachine.buyProduct(products.Lays.name, 2.1);
    expect(result).toEqual("1 dime");
  });
  test("Low change 2", () => {
    const result = coolMachine.buyProduct(products.Lays.name, 2.05);
    expect(result).toEqual("1 nickel");
  });
  test("Low change 3", () => {
    const result = coolMachine.buyProduct(products.Lays.name, 2.15);
    expect(result).toEqual("1 dime and 1 nickel");
  });
  test("No crack", () => {
    const result = crackMachine.buyProduct(productsTwo.Crack.name, 2.15);
    expect(result).toEqual("NO CRACK FOR YOU");
  });
  test("No quarters", () => {
    const result = crackMachine.buyProduct(productsTwo.Mints.name, 3);
    expect(result).toEqual("5 dimes");
  });
  test("No quarters and nickels", () => {
    const result = crackMachine.buyProduct(productsTwo.Doritos.name, 2.5);
    expect(result).toEqual("2 dimes 1 nickel");
  });
  test("No quarters and nickels 2", () => {
    const result = crackMachine.buyProduct(productsTwo.Mints.name, 3.5);
    expect(result).toEqual("1 loonie");
  });
  test("No quarters and nickels 3", () => {
    const result = crackMachine.buyProduct(productsTwo.Mints.name, 2.65);
    expect(result).toEqual("1 dime and 1 nickel");
  });
  test("No quarters and nickels 4", () => {
    const result = crackMachine.buyProduct(productsTwo.Doritos.name, 2.65);
    expect(result).toEqual("4 dimes");
  });
  test("No quarters and nickels 4", () => {
    const result = crackMachine.buyProduct(productsTwo.Doritos.name, 2.65);
    expect(result).toEqual("4 dimes");
  });
  test("No more doritios", () => {
    const result = crackMachine.buyProduct(productsTwo.Doritos.name, 2.65);
    expect(result).toEqual("NO DORITOS FOR YOU");
  });
  test("Coin stock up", () => {
    const result = crackMachine.changeStockUp(coinsTwo.quarter.name);
    expect(result).toEqual(100);
  });
  test("Back to quarters", () => {
    const result = crackMachine.buyProduct(productsTwo.Cookies.name, 2.5);
    expect(result).toEqual("2 quarters");
  });
});
