import {
    Entity,
    Column,
    OneToMany,
    ManyToMany,
} from "typeorm";
import { Person } from "./utils/Person";
import { Transaction } from "./Transaction";
import { Banker } from "./Banker";

@Entity('client') // to define an entity - argument is name of the column
export class Client extends Person {
    constructor() {
        super()
    }

    @ManyToMany(() => Banker)
    bankers: Banker[]
    

    @OneToMany(
        () => Transaction,
        transaction => transaction.client
    )
    transactions: Transaction[]

    @Column({
        default: true,
        name: 'active' // can override the name of the column
    })
    is_active: boolean

    @Column({
        type: 'simple-json',
        nullable: true
    })
    additional_info: {
        age: number;
        hair_color: string
    }

    @Column({
        type: "numeric"
    })
    balance: number

    @Column({
        type: 'simple-array',
        default: []
    })
    family_members: string[]  
} 