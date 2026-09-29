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
exports.TableroServicio = void 0;
const legacy_1 = require("@mikro-orm/decorators/legacy");
const tablero_1 = require("./tablero");
const servicio_1 = require("./servicio");
let TableroServicio = class TableroServicio {
    // Clave primaria compuesta: tablero_id + servicio_id, ambas también son FK
    tablero;
    servicio;
    guardadoEn;
};
exports.TableroServicio = TableroServicio;
__decorate([
    (0, legacy_1.ManyToOne)(() => tablero_1.Tablero, {
        primary: true,
        fieldName: 'tablero_id',
        deleteRule: 'cascade'
    }),
    __metadata("design:type", tablero_1.Tablero)
], TableroServicio.prototype, "tablero", void 0);
__decorate([
    (0, legacy_1.ManyToOne)(() => servicio_1.Servicio, {
        primary: true,
        fieldName: 'servicio_id',
        deleteRule: 'cascade'
    }),
    __metadata("design:type", servicio_1.Servicio)
], TableroServicio.prototype, "servicio", void 0);
__decorate([
    (0, legacy_1.Property)({
        type: 'Date',
        fieldName: 'guardado_en',
        nullable: true
    }),
    __metadata("design:type", Date)
], TableroServicio.prototype, "guardadoEn", void 0);
exports.TableroServicio = TableroServicio = __decorate([
    (0, legacy_1.Entity)({ tableName: 'tablero_servicio' })
], TableroServicio);
