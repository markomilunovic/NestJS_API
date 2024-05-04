import { AutoIncrement, Column, PrimaryKey, Table, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: 'resetToken', 
    timestamps: false, 
    freezeTableName: true
  })
export class ResetToken extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({allowNull: false})
    userId: number

    @Column({type: DataType.DATE, allowNull: false}) 
    expiresAt: Date;

};