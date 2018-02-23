let products = {
  Lays: { name: "Lays", price: 2.0, amount: 10 },
  Coke: { name: "Coke", price: 2.25, amount: 3 },
  Cheesies: { name: "Cheesies", price: 1.5, amount: 10 }
};

const coins = {
  loonie: 1,
  toonie: 2,
  nickel: 0.05,
  dime: 0.1,
  quarter: 0.25
};

const VendingMachine = require("../lib/vendingMachine.js");
const coolMachine = new VendingMachine(products, coins);

describe("Vending Machine", () => {
  test("Get Products", () => {
    const result = coolMachine.getProducts();
    expect(result).toEqual(products);
  });
  test("Buying Product Exact Change", () => {
    const result = coolMachine.buyProduct("Cheesies", 1.5);
    expect(result).toEqual("Enjoy your Cheesies, there are 9 left");
  });
  test("Excess Change", () => {
    const result = coolMachine.buyProduct("Lays", 3);
    expect(result).toEqual("here are 4 quarters");
  });
  test("Change more than a dollar", () => {
    const result = coolMachine.buyProduct("Lays", 4);
    expect(result).toEqual(
      "That doesn't make any sense, and I'm going to keep your change as punishment"
    );
  });
  test("Insufficient Funds", () => {
    const result = coolMachine.buyProduct("Coke", 1.5);
    expect(result).toEqual("You're 0.75 short of a tasty snack!");
  });
  test("Change breakdown", () => {
    const result = coolMachine.buyProduct("Cheesies", 1.85);
    expect(result).toEqual("1 quarter and 1 dime");
  });
  test("Stock up", () => {
    const result = coolMachine.stockUp("Coke");
    expect(result).toEqual(10);
  });
  test("Stock up no needed", () => {
    const result = coolMachine.stockUp("Cheesies");
    expect(result).toEqual("No need to stock up yet!");
  });
  test("Need more coins", () => {
    const result = coolMachine.insertPayment(["loonie"]);
    expect(result).toEqual("Insert more change");
  });
  test("Adequate coins for at least one product", () => {
    const result = coolMachine.insertPayment(["loonie", "quarter", "quarter"]);
    expect(result).toEqual("You may buy a product");
  });
  test("Coins must be an array", () => {
    const result = coolMachine.insertPayment("loonie", "quarter", "quarter");
    expect(result).toEqual("Payment must be an array");
  });
  test("Nickel change", () => {
    const result = coolMachine.buyProduct("Lays", 2.55);
    expect(result).toEqual("2 quarters and 1 nickel");
  });
  test("Dimes and Nickels", () => {
    const result = coolMachine.buyProduct("Lays", 2.65);
    expect(result).toEqual("2 quarters, 1 dime, and 1 nickel");
  });
  test("Test", () => {
    const result = coolMachine.buyProduct("Lays", 2.9);
    expect(result).toEqual("3 quarters, 1 dime, and 1 nickel");
  });
});
