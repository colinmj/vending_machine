module.exports = class VendingMachine {
  constructor(products, coins) {
    this.products = products;
    this.coins = coins;
  }

  getProducts() {
    return this.products;
  }
  insertPayment(coins) {
    if (typeof coins === "string") {
      return "Payment must be an array";
    }
    let arr = [];
    coins.forEach(
      coin => (this.coins[coin] ? arr.push(this.coins[coin]) : null)
    );
    if (arr.length < 1) {
      if (arr[0] < 1.5) {
        return "Insert more change";
      }
    }
    let total = arr.reduce((a, b) => {
      return a + b;
    });
    if (total >= 1.5) {
      return "You may buy a product";
    } else {
      return "Insert more change";
    }
  }
  buyProduct(product, amount) {
    if (amount < 1.5) {
      return "You can't afford anything";
    }
    let remainingStock = this.products[product].amount;
    if (this.products[product] && this.products[product].price === amount) {
      remainingStock--;
      return `Enjoy your ${product}, there are ${remainingStock} left`;
    } else if (
      this.products[product] &&
      amount > this.products[product].price
    ) {
      let change = amount - this.products[product].price;
      remainingStock--;
      if (change > 1) {
        return "That doesn't make any sense, and I'm going to keep your change as punishment";
      } else if (change % 0.25 === 0) {
        // return `Your change is ${change}`;
        return `here are ${change / 0.25} quarters`;
      } else {
        let quarterAmount;
        let dimeAmount;
        let nickelAmount;

        change = change.toFixed(2);
        let quarters = change / 0.25;
        quarters = Math.round(quarters * 100) / 100;
        quarters = Math.floor(quarters);
        quarters < 2
          ? (quarterAmount = "quarter")
          : (quarterAmount = "quarters");
        let remainder = change - quarters * 0.25;

        // remainder > 0.08
        //   ? (remainder = Math.round(remainder * 10) / 10)
        //   : (remainder = 0.05);
        // if (remainder > 0.08 && remainder < 0.15){
        //   remainder = Math.round(remainder * 10)/10;
        // }
        remainder < 0.12
          ? (remainder = Math.round(remainder * 10) / 10)
          : (remainder = remainder);

        if (remainder % 0.1 === 0) {
          let dimes = remainder / 0.1;
          dimes === 1 ? (dimeAmount = "dime") : (dimeAmount = "dimes");
          return `${quarters} ${quarterAmount} and ${dimes} ${dimeAmount}`;
          // return `${remainder} ${quarters} ${dimes}`;
        } else {
          if (remainder < 0.1) {
            let nickels = remainder / 0.05;
            nickels = Math.floor(nickels);
            nickels === 1
              ? (nickelAmount = "nickel")
              : (nickelAmount = "nickels");
            // return `${quarters} ${quarterAmount} and ${nickels} ${nickelAmount}`;
            return remainder;
          } else {
            let dimeAmount;
            remainder = Math.round(remainder * 100) / 100;
            let dimes = remainder / 0.1;
            dimes = Math.floor(dimes);
            dimes === 1 ? (dimeAmount = "dime") : (dimeAmount = "dimes");

            let nickels = 1;
            return `${quarters} ${quarterAmount}, ${dimes} ${dimeAmount}, and ${nickels} nickel`;
            // return `${quarters} ${change} ${remainder} ${dimes} ${nickels}`;
          }
        }
      }
    } else {
      let short = this.products[product].price - amount;
      return `You're ${short} short of a tasty snack!`;
    }
  }
  stockUp(product) {
    let remainingStock = this.products[product].amount;
    if (remainingStock < 4) {
      remainingStock = remainingStock + (10 - remainingStock);
      return remainingStock;
    } else {
      return "No need to stock up yet!";
    }
  }
};
