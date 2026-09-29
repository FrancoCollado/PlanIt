"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOrm = setOrm;
exports.getOrm = getOrm;
let orm;
function setOrm(instance) {
    orm = instance;
}
function getOrm() {
    return orm;
}
