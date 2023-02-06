import { DataTypes, Model, Sequelize } from "sequelize";

export class Person extends Model {}

export const personMap = async (sequelize: Sequelize): Promise<void> => {
    Person.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: { type: DataTypes.STRING(100) },
        lastName: { type: DataTypes.STRING(100) },
        age: { type: DataTypes.SMALLINT },
        gender: { type: DataTypes.STRING(1) },
        identifier: { 
            type: DataTypes.STRING(11),
            unique: true 
        },
        email: { type: DataTypes.STRING(255) }
    }, {
        sequelize,
        tableName: 'People',
    });
    await Person.sync();
};
