import {
    Entity,
    BaseEntity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity('person') // to define an entity - argument is name of the column
export class Person extends BaseEntity {
    constructor() {
        super()
    }

    // @PrimaryColumn({type:"uuid"})  //generates uuid automatically
    // id: string

    @PrimaryGeneratedColumn()  
    id: number

    @Column()
    first_name: string /* typical typescript types */;

    @Column()
    last_name: string

    @Column({
        unique: true
    })
    email: string

    @Column({
        unique: true,
        length: 10
    })
    card_number: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    update_at: Date
} 