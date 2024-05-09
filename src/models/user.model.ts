import { AutoIncrement, Column, PrimaryKey, Table, Unique, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: 'user', 
    timestamps: false, 
    freezeTableName: true,
  })
export class User extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({
      type: DataType.ENUM('user', 'admin'),
      defaultValue: 'admin'
  })
    roles: 'user' | 'admin';

    @Unique
    @Column({allowNull: false})
    username: string;

    @Column({allowNull: false})
    password: string;

    @Unique
    @Column({allowNull: false})
    email: string;

    @Column({allowNull: false})
    firstName: string;

    @Column({allowNull: false})
    lastName: string;
    
};