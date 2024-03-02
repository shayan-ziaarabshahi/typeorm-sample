import { DataSource } from "typeorm"
import { Client } from "./entities/Client"
import { Banker } from "./entities/Banker"
import { Transaction } from "./entities/Transaction"
import express from 'express'
import { createClientRouter } from "./routes/create_client"
import { createBankerRouter } from "./routes/create_banker"
import { createTransactionRouter } from "./routes/create_transaction"
import { connectBankerToClientRouter } from "./routes/connect_banker_to_client"
import { deleteClientRouter } from "./routes/delete_client"
import { fetchClientRouter } from "./routes/fetch_clients"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "test",
    entities: [Client, Banker, Transaction],
    synchronize: true // syncs database with entities automatically
})

const app = express()

async function main() {
    AppDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
            app.use(express.json())
            app.use(createClientRouter)
            app.use(createBankerRouter)
            app.use(createTransactionRouter)
            app.use(connectBankerToClientRouter)
            app.use(deleteClientRouter)
            app.use(fetchClientRouter)
            app.listen(5000, () => console.log('server is running on port 5000'))
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
            throw new Error('unable to connect to db')
        })
}

main()