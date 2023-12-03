import { Sequelize } from 'sequelize';
import { Table, Column, Model, DataType, PrimaryKey, HasMany } from 'sequelize-typescript';
import { User } from './user';

@Table({ tableName: 'admins' })
export class Admin extends Model {

    @PrimaryKey
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, allowNull: false })
    id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    firstName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    lastName: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @HasMany(() => User)
    users: User[];

    @Column({ type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), allowNull: false })
    createdAt?: Date;

    @Column({ type: 'TIMESTAMP',defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') , allowNull: false })
    updatedAt?: Date;
}
