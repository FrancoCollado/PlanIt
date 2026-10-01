"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initOrm = initOrm;
exports.setOrm = setOrm;
exports.getOrm = getOrm;
const postgresql_1 = require("@mikro-orm/postgresql");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
let orm;
let ormPromise;
// En serverless cada instancia arranca en frío: la conexión se crea bajo demanda
// y se reintenta si falló, en vez de depender de un arranque previo.
function initOrm() {
    ormPromise ??= postgresql_1.MikroORM.init(mikro_orm_config_1.default)
        .then((instance) => {
        orm = instance;
        return instance;
    })
        .catch((error) => {
        ormPromise = undefined;
        throw error;
    });
    return ormPromise;
}
function setOrm(instance) {
    orm = instance; // Asigno la instancia de MikroORM a la variable global
}
function getOrm() {
    if (!orm)
        throw new Error('El ORM todavía no está inicializado');
    return orm;
}
