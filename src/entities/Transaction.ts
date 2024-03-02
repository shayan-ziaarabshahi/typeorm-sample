import {
    Entity,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Client } from "./Client";

export enum TransactionEnum {
    DEPOSIT = "deposit",
    WITHDRAW = "withdraw"
}

@Entity('transaction')
export class Transaction extends BaseEntity {
    constructor() {
        super()
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "enum",
        enum: TransactionEnum
    })
    type: TransactionEnum

    @Column({
        type: "numeric",
    })
    amount: number


    @ManyToOne(
        () => Client,
        client => client.transactions,
        { onDelete: 'CASCADE' }
    )
    // join is always on many side not the one side
    @JoinColumn({
        name: 'client_id'
    })
    client: Client
} 