import { AutoIncrement, Column, PrimaryKey, Table, Model, DataType, AllowNull } from "sequelize-typescript";

@Table({
    tableName: 'refreshToken', 
    timestamps: false, 
    freezeTableName: true
  })
export class RefreshToken extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({allowNull: false})
    accessTokenId: number

    @Column({type: DataType.DATE, allowNull: false}) 
    expiresAt: Date;

};