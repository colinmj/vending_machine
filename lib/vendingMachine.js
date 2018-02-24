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

    if (coins.length < 1) {
      if (coins[0] < 1.5) {
        return "Insert more change";
      }
    }
    let total = coins.reduce((a, b) => {
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
    if (this.products[product].amount === 0) {
      return `NO ${product.toUpperCase()} FOR YOU`;
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
        if (this.coins.quarter.count < 1) {
          let dimes = change / 0.1;
          dimes = Math.round(dimes * 100) / 100;
          dimes = Math.floor(dimes);
          return `${change / 0.1} dimes`;
        } else {
          this.coins.quarter.count = this.coins.quarter.count - change / 0.25;
          return `here are ${change / 0.25} quarters`;
        }
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

        if (remainder < 0.1) {
          remainder = Math.round(remainder * 100) / 100;
        }

        if (remainder % 0.1 === 0) {
          let dimes = remainder / 0.1;
          dimes === 1 ? (dimeAmount = "dime") : (dimeAmount = "dimes");

          if (quarters === 0) {
            this.coins.dime.count = this.coins.dime.count - dimes;
            return `${dimes} ${dimeAmount}`;
          } else {
            this.coins.dime.count = this.coins.dime.count - dimes;
            this.coins.quarter.count = this.coins.quarter.count - quarters;
            return `${quarters} ${quarterAmount} and ${dimes} ${dimeAmount}, ${
              this.coins.quarter.count
            } quarters, ${this.coins.dime.count} dimes`;
          }
        } else {
          if (remainder < 0.1) {
            let nickels = remainder / 0.05;
            nickels = Math.floor(nickels);
            nickels === 1
              ? (nickelAmount = "nickel")
              : (nickelAmount = "nickels");
            if (quarters === 0) {
              this.coins.nickel.count--;
              return "1 nickel";
            } else {
              this.coins.quarter.count = this.coins.quarter.count - quarters;
              this.coins.nickel.count--;
              return `${quarters} ${quarterAmount} and 1 nickel`;
            }
          } else {
            let dimeAmount;
            remainder = Math.round(remainder * 100) / 100;
            let dimes = remainder / 0.1;
            dimes = Math.floor(dimes);
            dimes === 1 ? (dimeAmount = "dime") : (dimeAmount = "dimes");

            let nickels = 1;
            if (quarters === 0) {
              this.coins.dime.count = this.coins.dime.count - dimes;
              this.coins.nickel.count--;
              return `${dimes} ${dimeAmount} and 1 nickel`;
            } else {
              this.coins.quarter.count = this.coins.quarter.count - quarters;
              this.coins.dime.count = this.coins.dime.count - dimes;
              this.coins.nickel.count = this.coins.nickel.count - 1;
              return `${quarters} ${quarterAmount}, ${dimes} ${dimeAmount}, and ${nickels} nickel`;
            }
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
