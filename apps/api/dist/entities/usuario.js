"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const legacy_1 = require("@mikro-orm/decorators/legacy");
let User = class User {
    id;
    nombre;
    email;
    password;
    rol = 'cliente';
    creadoEn;
};
exports.User = User;
__decorate([
    (0, legacy_1.PrimaryKey)({ type: 'number' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, legacy_1.Property)({ type: 'string', length: 100 }),
    __metadata("design:type", String)
], User.prototype, "nombre", void 0);
__decorate([
    (0, legacy_1.Property)({ type: 'string', length: 100, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, legacy_1.Property)({
        type: 'string',
        fieldName: 'contraseña',
        length: 255
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, legacy_1.Enum)({
        items: ['cliente', 'administrador', 'empresa']
    }),
    __metadata("design:type", String)
], User.prototype, "rol", void 0);
__decorate([
    (0, legacy_1.Property)({
        type: 'Date',
        fieldName: 'creado_en',
        nullable: true
    }),
    __metadata("design:type", Date)
], User.prototype, "creadoEn", void 0);
exports.User = User = __decorate([
    (0, legacy_1.Entity)({ tableName: 'usuarios' })
], User);
