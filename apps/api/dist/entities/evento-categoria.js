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
exports.EventoCategoria = void 0;
const legacy_1 = require("@mikro-orm/decorators/legacy");
const evento_1 = require("./evento");
const categoria_1 = require("./categoria");
let EventoCategoria = class EventoCategoria {
    // Clave primaria compuesta: evento_id + categoria_id, ambas también son FK
    evento;
    categoria;
};
exports.EventoCategoria = EventoCategoria;
__decorate([
    (0, legacy_1.ManyToOne)(() => evento_1.Evento, {
        primary: true,
        fieldName: 'evento_id',
        deleteRule: 'cascade'
    }),
    __metadata("design:type", evento_1.Evento)
], EventoCategoria.prototype, "evento", void 0);
__decorate([
    (0, legacy_1.ManyToOne)(() => categoria_1.Categoria, {
        primary: true,
        fieldName: 'categoria_id',
        deleteRule: 'cascade'
    }),
    __metadata("design:type", categoria_1.Categoria)
], EventoCategoria.prototype, "categoria", void 0);
exports.EventoCategoria = EventoCategoria = __decorate([
    (0, legacy_1.Entity)({ tableName: 'evento_categoria' })
], EventoCategoria);
