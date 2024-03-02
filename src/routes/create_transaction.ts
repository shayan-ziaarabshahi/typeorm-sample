import express from 'express'
import { Transaction, TransactionEnum } from '../entities/Transaction'
import { Client } from '../entities/Client'

const router = express.Router()

router.post('/api/client/:clientId/transaction', async (req, res) => {
    const { clientId } = req.params;

    const { type, amount } = req.body;

    const client = await Client.findOne({
        where: {
            id: parseInt(clientId)
        }
    });

    if (!client) {
        return res.json({
            msg: 'client not found',
        });
    }

    const transaction = Transaction.create({
        amount,
        type,
        client 
    });

    await transaction.save();

    if (type === TransactionEnum.DEPOSIT) {
        client.balance = Number(client.balance) + amount;
        client.transactions = [transaction];
    } else if (type === TransactionEnum.WITHDRAW) {
        client.balance = Number(client.balance) - amount;
        client.transactions = [transaction];
    }

    await client.save();
    return res.json(client);
})

export {
    router as createTransactionRouter
}