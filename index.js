class Transaction  {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  isAllowed() {
    if(this.value < 0 && this.account.balance < this.amount) {
      return false
    }
    return true;
  }
  commit() {
    if(this.isAllowed()) {
    this.time = new Date();
    this.account.addTransaction(this);
    }
  }
}

class Withdrawal extends Transaction {

  get value() {
   return -this.amount;
  }

}
class Deposit extends Transaction{

  get value() {
    return this.amount;
   }

}

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let newBalance = 0;
    this.transactions.forEach(transaction => {
      newBalance += transaction.value;
    })
    return newBalance;
  };

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount =  new Account("Kung-Fu Panda");

const secondAccount = new Account("John 'the Man' Cena");

let t1 = new Deposit(50.25, secondAccount);
t1.commit();
console.log('Transaction 1:', t1);
console.log(secondAccount);
console.log('New Balance: ', secondAccount.balance);

let t2 = new Withdrawal(9.99, secondAccount);
t2.commit();
console.log('Transaction 2:', t2);
console.log(secondAccount);
console.log('New Balance: ', secondAccount.balance);

let t2a = new Withdrawal(140.00, secondAccount);
t2a.commit();
console.log('Transaction 2a:', t2a);
console.log(secondAccount);
console.log('New Balance: ', secondAccount.balance);

let t3 = new Deposit(120.00, secondAccount);
t3.commit();
console.log('Transaction 3:', t3);
console.log(secondAccount);
console.log('New Balance: ', secondAccount.balance);


let t4 = new Deposit(50.00, myAccount);
t4.commit();
console.log('Transaction 4:', t4);
console.log(myAccount);
console.log('New Balance: ', myAccount.balance);

let t5 = new Deposit(50.00, myAccount);
t5.commit();
console.log('Transaction 5:', t5);
console.log(myAccount);
console.log('New Balance: ', myAccount.balance);

let t6 = new Withdrawal(20, myAccount);
t6.commit();
console.log('Transaction 6:', t6);
console.log(myAccount);
console.log('New Balance: ', myAccount.balance);
