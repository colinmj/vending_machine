const products = {
  Lays: { name: "Lays", price: 2.0, amount: 10 },
  Coke: { name: "Coke", price: 2.25, amount: 3 },
  Cheesies: { name: "Cheesies", price: 1.5, amount: 10 }
};

const productsTwo = {
  Cookies: { name: "Cookies", price: 2.0, amount: 10 },
  Crack: { name: "Crack", price: 3.5, amount: 0 },
  Mints: { name: "Mints", price: 2.5, amount: 10 },
  Doritos: { name: "Doritos", price: 2.25, amount: 3 }
};

const coins = {
  loonie: { name: "loonie", value: 1, count: 50 },
  toonie: { name: "toonie", value: 2, count: 50 },
  nickel: { name: "nickel", value: 0.05, count: 100 },
  dime: { name: "dime", value: 0.1, count: 100 },
  quarter: { name: "quarter", value: 0.25, count: 100 }
};

const coinsTwo = {
  loonie: { name: "loonie", value: 1, count: 4 },
  toonie: { name: "toonie", value: 2, count: 10 },
  nickel: { name: "nickel", value: 0.05, count: 50 },
  dime: { name: "dime", value: 0.1, count: 10 },
  quarter: { name: "quarter", value: 0.25, count: 0 }
};

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
    expect(result).toEqual("4 quarters");
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
    expect(result).toEqual("5 quarters");
  });
  test("Change breakdown", () => {
    const result = coolMachine.buyProduct(products.Cheesies.name, 1.85);
    expect(result).toEqual("1 quarter and 1 dime, 90 quarters, 99 dimes");
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
    const result = coolMachine.insertPayment([coins.loonie.value]);
    expect(result).toEqual("Insert more change");
  });
  test("Adequate coins for at least one product", () => {
    const result = coolMachine.insertPayment([
      coins.loonie.value,
      coins.quarter.value,
      coins.quarter.value
    ]);
    expect(result).toEqual("You may buy a product");
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
    expect(result).toEqual("10 dimes");
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
