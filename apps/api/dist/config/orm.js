"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOrm = setOrm;
exports.getOrm = getOrm;
let orm; // Variable donde guardo la instancia de MikroORM
function setOrm(instance) {
    orm = instance; // Asigno la instancia de MikroORM a la variable global
}
function getOrm() {
    return orm;
}
