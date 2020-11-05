import Transaction from "../models/Transaction";
import TransactionsRepository from "../repositories/TransactionsRepository"

interface Balance {
    income: number;
    outcome: number;
    total: number;
  }

interface TransationDTO {
    transactions: Transaction[];
    balance: Balance;
  }

export default class ListTransactionService{
     private transactionRepository: TransactionsRepository;
    
    constructor(transactionRepository: TransactionsRepository){
        this.transactionRepository = transactionRepository;
    }

    public execute():TransationDTO{
        const transactions = this.transactionRepository.all()

        const balance = this.transactionRepository.getBalance();

        return {transactions, balance};
        
    }

}