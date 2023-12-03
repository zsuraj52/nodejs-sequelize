import { Sequelize } from 'sequelize';
import { Table, Column, Model, DataType, PrimaryKey, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Admin } from './admin';
import { Customer } from './customer';

@Table({ tableName: 'users' })
export class User extends Model {

    @PrimaryKey
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, allowNull: false })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    username: string;

    @Column({ type: DataType.STRING, allowNull: false })
    fullName: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ForeignKey(() => Admin)
    @Column({type: DataType.UUID})
    adminId: string;
    
    @BelongsTo(() => Admin)
    admin: Admin;

    @HasMany(() => Customer)
    customers: Customer[];

    @Column({ type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), allowNull: false })
    createdAt?: any;

    @Column({ type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), allowNull: false })
    updatedAt?: any;
}
