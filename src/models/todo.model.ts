import { AutoIncrement, Column, PrimaryKey, Table, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: 'todo', 
    timestamps: false, 
    freezeTableName: true
  })
export class Todo extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({allowNull: false})
    title: string

    @Column(DataType.TEXT)
    description: string;

    @Column({
        type: DataType.ENUM('pending', 'completed'),
        defaultValue: 'pending'
    })
    status: 'pending' | 'completed';

    @Column
    imagePath: string;

};