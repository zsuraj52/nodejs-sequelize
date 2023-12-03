import { Sequelize } from 'sequelize';
import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user';

@Table({ tableName: 'customers' })
export class Customer extends Model {

    @PrimaryKey
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, allowNull: false })
    id!: string;
    
    @Column({ type: DataType.STRING, allowNull: false })
    customerName!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password!: string;

    @ForeignKey(() => User)
    @Column({type: DataType.UUID})
    userId: string;
    
    @BelongsTo(() => User)
    user: User;

    @Column({ type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), allowNull: false })
    createdAt?: any;

    @Column({ type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), allowNull: false })
    updatedAt?: any;
}
