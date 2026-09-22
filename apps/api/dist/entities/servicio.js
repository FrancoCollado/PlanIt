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
exports.Servicio = void 0;
const legacy_1 = require("@mikro-orm/decorators/legacy");
const categoria_1 = require("./categoria");
const usuario_1 = require("./usuario");
let Servicio = class Servicio {
    id;
    categoria;
    usuario;
    nombre;
    descripcion;
    imagen;
    creadoEn;
};
exports.Servicio = Servicio;
__decorate([
    (0, legacy_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Servicio.prototype, "id", void 0);
__decorate([
    (0, legacy_1.ManyToOne)(() => categoria_1.Categoria, {
        fieldName: 'categoria_id',
        deleteRule: 'cascade'
    }),
    __metadata("design:type", categoria_1.Categoria)
], Servicio.prototype, "categoria", void 0);
__decorate([
    (0, legacy_1.ManyToOne)(() => usuario_1.User, {
        fieldName: 'usuario_id',
        deleteRule: 'cascade'
    }),
    __metadata("design:type", usuario_1.User)
], Servicio.prototype, "usuario", void 0);
__decorate([
    (0, legacy_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], Servicio.prototype, "nombre", void 0);
__decorate([
    (0, legacy_1.Property)({ columnType: 'text', nullable: true }),
    __metadata("design:type", String)
], Servicio.prototype, "descripcion", void 0);
__decorate([
    (0, legacy_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Servicio.prototype, "imagen", void 0);
__decorate([
    (0, legacy_1.Property)({ fieldName: 'creado_en' }),
    __metadata("design:type", Date)
], Servicio.prototype, "creadoEn", void 0);
exports.Servicio = Servicio = __decorate([
    (0, legacy_1.Entity)({ tableName: 'servicios' })
], Servicio);
