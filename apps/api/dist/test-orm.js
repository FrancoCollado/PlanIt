"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('ARRANCA TEST ORM');
require("reflect-metadata");
const mysql_1 = require("@mikro-orm/mysql");
const mikro_orm_config_1 = __importDefault(require("./config/mikro-orm.config"));
async function test() {
    try {
        console.log('ANTES DE MIKROORM.INIT');
        const orm = await mysql_1.MikroORM.init(mikro_orm_config_1.default);
        console.log('MIKROORM INICIALIZADO OK');
        await orm.connect();
        console.log('CONEXION A MYSQL OK');
        await orm.close();
        console.log('FIN');
    }
    catch (error) {
        console.error('ERROR REAL DE MIKROORM:');
        console.error(error);
    }
}
test();
