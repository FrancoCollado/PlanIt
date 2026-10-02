"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSchemas = void 0;
const zod_1 = require("zod");
const positiveId = zod_1.z.number().int().positive().safe();
const positiveIdParam = zod_1.z.string()
    .regex(/^[1-9]\d*$/, 'Debe ser un ID entero positivo')
    .refine((value) => Number.isSafeInteger(Number(value)), 'El ID está fuera del rango permitido');
const optionalName = zod_1.z.string().trim().min(1).max(100);
const optionalDescription = zod_1.z.string().max(10_000).optional();
const optionalImage = zod_1.z.string().trim().max(255).optional();
const optionalDraft = zod_1.z.boolean().optional();
const email = zod_1.z.string().trim().email().max(100);
const password = zod_1.z.string().min(1).max(255);
const idParams = zod_1.z.object({ id: positiveIdParam }).strict();
const updateHasFields = (data) => Object.keys(data).length > 0;
exports.requestSchemas = {
    login: {
        body: zod_1.z.object({ email, password }).strict()
    },
    register: {
        body: zod_1.z.object({
            name: optionalName,
            email,
            password,
            confirmPassword: zod_1.z.string().min(1).max(255),
            acceptTerms: zod_1.z.literal(true),
            role: zod_1.z.enum(['cliente', 'empresa']),
            zona: zod_1.z.string().trim().min(1).max(100).optional(),
            cuit: positiveId.optional(),
            telefono: positiveId.optional()
        }).strict().superRefine((data, context) => {
            if (data.password !== data.confirmPassword) {
                context.addIssue({ code: 'custom', path: ['confirmPassword'], message: 'Las contraseñas no coinciden' });
            }
            if (data.role === 'empresa') {
                for (const field of ['zona', 'cuit', 'telefono']) {
                    if (data[field] === undefined) {
                        context.addIssue({ code: 'custom', path: [field], message: 'Este campo es requerido para cuentas de empresa' });
                    }
                }
            }
        })
    },
    createEvento: {
        body: zod_1.z.object({
            nombre: optionalName,
            descripcion: optionalDescription,
            imagen: optionalImage,
            draft: optionalDraft
        }).strict()
    },
    updateEvento: {
        params: idParams,
        body: zod_1.z.object({
            nombre: optionalName.optional(),
            descripcion: optionalDescription,
            imagen: optionalImage,
            draft: optionalDraft
        }).strict().refine(updateHasFields, 'Debe enviar al menos un campo para actualizar')
    },
    idParams: { params: idParams },
    createCategoria: {
        body: zod_1.z.object({
            nombre: optionalName,
            descripcion: optionalDescription,
            eventoId: positiveId
        }).strict()
    },
    updateCategoria: {
        params: idParams,
        body: zod_1.z.object({
            nombre: optionalName.optional(),
            descripcion: optionalDescription,
            eventoId: positiveId.optional()
        }).strict().refine(updateHasFields, 'Debe enviar al menos un campo para actualizar')
    },
    listServicios: {
        query: zod_1.z.object({ usuarioId: positiveIdParam }).strict()
    },
    searchServicios: {
        query: zod_1.z.object({
            nombre: zod_1.z.string().trim().max(100).optional(),
            zona: zod_1.z.string().trim().max(100).optional(),
            empresa: zod_1.z.string().trim().max(100).optional()
        }).strict().refine((query) => Boolean(query.nombre || query.zona || query.empresa), {
            message: 'Ingresá un nombre, una zona o una empresa para buscar'
        })
    },
    categoriaIdParam: {
        params: zod_1.z.object({ categoriaId: positiveIdParam }).strict()
    },
    createServicio: {
        body: zod_1.z.object({
            nombre: optionalName,
            descripcion: optionalDescription,
            imagen: optionalImage,
            categoriaId: positiveId,
            usuarioId: positiveId,
            draft: optionalDraft
        }).strict()
    },
    updateServicio: {
        params: idParams,
        body: zod_1.z.object({
            nombre: optionalName.optional(),
            descripcion: optionalDescription,
            imagen: optionalImage,
            categoriaId: positiveId.optional(),
            draft: optionalDraft,
            usuarioId: positiveId
        }).strict().refine(({ usuarioId: _usuarioId, ...data }) => updateHasFields(data), {
            message: 'Debe enviar al menos un campo para actualizar'
        })
    },
    deleteServicio: {
        params: idParams,
        query: zod_1.z.object({ usuarioId: positiveIdParam.optional() }).strict(),
        body: zod_1.z.object({ usuarioId: positiveId.optional() }).strict().optional()
    },
    listUsuarios: {
        query: zod_1.z.object({ rol: zod_1.z.enum(['cliente', 'administrador', 'empresa']).optional() }).strict()
    },
    setUsuarioActivo: {
        params: idParams,
        body: zod_1.z.object({ activo: zod_1.z.boolean() }).strict()
    },
    businessStats: {
        query: zod_1.z.object({ usuarioId: positiveIdParam }).strict()
    },
    createTablero: {
        body: zod_1.z.object({ nombre: optionalName, eventoId: positiveId }).strict()
    },
    updateTablero: {
        params: idParams,
        body: zod_1.z.object({ nombre: optionalName, eventoId: positiveId }).strict()
    },
    tableroIdParam: { params: idParams },
    addServicioToTablero: {
        params: idParams,
        body: zod_1.z.object({ servicioId: positiveId }).strict()
    },
    removeServicioFromTablero: {
        params: zod_1.z.object({ id: positiveIdParam, servicioId: positiveIdParam }).strict()
    }
};
