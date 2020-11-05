import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance():Balance {
      var balance:Balance = {
        income:0,
        outcome:0,
        total:0
      };
    
    this.transactions.forEach((transaction)=>{
      if(transaction.type === "income"){
          balance.income += transaction.value;
      }else{
          balance.outcome += transaction.value
      }
      
      balance.total = balance.income - balance.outcome;

    });
    
    return balance;
  }

  public create({title, value, type}:Omit<Transaction, 'id'>): Transaction {
      const transaction = new Transaction({title, value, type});
      

      if(transaction.type === "outcome"){

        const { total } = this.getBalance();

        if (total < transaction.value){
          throw Error("Saldo insuficiente!")
        } 
      }

      this.transactions.push(transaction);

      return transaction;
  }
}

export default TransactionsRepository;
