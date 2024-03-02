import {
    Entity,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { Person } from "./utils/Person";
import { Client } from "./Client";

@Entity('banker') // to define an entity - argument is name of the column
export class Banker extends Person {
    constructor() {
        super()
    }

    @ManyToMany(() => Client, { cascade: true })
    @JoinTable({
        name: "bankers_clients", // name of table
        joinColumn: {
            name: "banker",
            referencedColumnName: "id" // id field of banker 
        },
        inverseJoinColumn: {
            name: "client",
            referencedColumnName: "id"
        }
    })
    clients: Client[]

    @Column({
        unique: true,
        length: 10
    })
    employee_number: string
} 