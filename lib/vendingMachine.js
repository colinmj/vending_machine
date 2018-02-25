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
    // checking if someone can afford anything

    if (amount < 1.5) {
      return "You can't afford anything";
    }
    // checking if product is in stock
    if (this.products[product].amount === 0) {
      return `NO ${product.toUpperCase()} FOR YOU`;
    }

    // the start of the purchase logic: first scenario is exact change
    if (this.products[product] && this.products[product].price === amount) {
      this.products[product].amount = this.products[product].amount - 1;
      return `Enjoy your ${product}, there are ${
        this.products[product].amount
      } left`;
    } else if (
      this.products[product] &&
      amount > this.products[product].price
    ) {
      // the beginning of the logic for if there is change
      let change = amount - this.products[product].price;
      this.products[product].amount = this.products[product].amount - 1;
      if (change > 2) {
        return "That doesn't make any sense, and I'm going to keep your change as punishment";
      } else if (change % 0.25 === 0) {
        if (this.coins.quarter.count < 1) {
          let dimes = change / 0.1;
          let nickels = change / 0.5;
          dimes = Math.round(dimes * 100) / 100;
          dimes = Math.floor(dimes);
          nickels = Math.round(nickels * 100) / 100;
          nickels = Math.floor(nickels);
          let remainder = change - dimes * 0.1;

          if ((change / 0.1) % 1 === 0) {
            this.coins.dime.count = this.coins.dime.count - dimes;
            return `${dimes} dimes`;
          } else {
            dimes = change / 0.1 / 1;
            dimes = Math.floor(dimes);
            nickels = change / 0.1 / 1 - dimes;
            nickels = nickels / 0.5;
            this.coins.dime.count = this.coins.dime.count - dimes;
            this.coins.nickel.count = this.coins.nickel.count - nickels;
            return `${dimes} dimes ${nickels} nickel`;
          }
        } else {
          this.coins.quarter.count = this.coins.quarter.count - change / 0.25;
          return `${change / 0.25} quarters`;
        }
      } else {
        // there is change and its not divisable by quarter
        let quarterAmount;
        let dimeAmount;
        let nickelAmount;
        if (this.coins.quarter.count < 1) {
          let dimes = change / 0.1;
          let nickels = change / 0.5;
          dimes = Math.round(dimes * 100) / 100;
          dimes = Math.floor(dimes);
          nickels = Math.round(nickels * 100) / 100;
          nickels = Math.floor(nickels);
          let remainder = change - dimes * 0.1;
          let x = change / 0.1;

          let totalChange = Math.round(x * 100) / 100;

          if (totalChange % 1 === 0) {
            this.coins.dime.count = this.coins.dime.count - totalChange;

            return `${totalChange} dimes`;
          } else {
            dimes = change / 0.1 / 1;
            dimes = Math.floor(dimes);
            nickels = change / 0.1 / 1 - dimes;
            nickels = nickels / 0.5;
            nickels = Math.round(nickels * 100) / 100;
            if (dimes === 1) {
              dimeAmount = "dime";
            } else {
              dimeAmount = "dimes";
            }
            this.coins.dime.count = this.coins.dime.count - dimes;
            this.coins.nickel.count = this.coins.nickel.count - nickels;

            return `${dimes} ${dimeAmount} and ${nickels} nickel`;
          }
        }

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

  changeStockUp(coin) {
    if (this.coins[coin].count < 1) {
      this.coins[coin].count = this.coins[coin].count + 100;
      return this.coins[coin].count;
    } else {
      return "Plenty of coins left";
    }
  }
};
