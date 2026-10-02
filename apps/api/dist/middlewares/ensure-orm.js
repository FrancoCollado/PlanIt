"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureOrm = void 0;
const orm_1 = require("../config/orm");
const ensureOrm = async (_req, _res, next) => {
    try {
        await (0, orm_1.initOrm)();
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.ensureOrm = ensureOrm;
