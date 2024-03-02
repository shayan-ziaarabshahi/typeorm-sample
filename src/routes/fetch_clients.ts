import express from 'express'
import { Client } from '../entities/Client'
import { AppDataSource } from '../../src'

const router = express.Router()

router.get('/api/clients', async (req, res) => {
    const clients = await AppDataSource
        // from an specific entity
        .getRepository(Client)
        // build a query
        .createQueryBuilder()
        // you can select entity
        // you can specify just client to select all fields
        .select("client.first_name")
        // to add another field
        .addSelect("client.last_name")
        // from Client table with name client
        .from(Client, "client")
        // select specific records. : means variable. 
        // then you should specify value of variable in next argument object
        .where("client.id = :clientId", { clientId: 1 })
        .leftJoinAndSelect("client.transactions", "transactions")
        // you can add .groupBy() to group fetch data
        // get option
        .getMany()
    return res.json(clients)
})

export {
    router as fetchClientRouter
}