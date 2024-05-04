import { AutoIncrement, Column, PrimaryKey, Table, Unique, Model } from "sequelize-typescript";

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