import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface, sequelize: typeof Sequelize): Promise<void> => {
  await queryInterface.createTable('accessToken', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    expiresAt:{
        type: DataTypes.DATE,
        allowNull: false
    }
    
  });
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.dropTable('accessToken');
};
