import { Router } from 'express';

 import TransactionsRepository from '../repositories/TransactionsRepository';
 import CreateTransactionService from '../services/CreateTransactionService';
 import ListTransactionsService from '../services/ListTransactionsService';

 const transactionsRepository = new TransactionsRepository();

const transactionRouter = Router();


transactionRouter.get('/', (request, response) => {
  try {
    const listTransactionsService = new ListTransactionsService(transactionsRepository);

    const listTransactions = listTransactionsService.execute();

    return response.json(listTransactions);
    
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
      const { title, value, type} = request.body;

      const createTransactionService = new CreateTransactionService(transactionsRepository);

      const transaction = createTransactionService.execute({title, value, type});

      return response.json(transaction);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
