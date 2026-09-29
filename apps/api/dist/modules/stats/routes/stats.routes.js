"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stats_controller_1 = require("../controllers/stats.controller");
const router = (0, express_1.Router)();
router.get('/admin', stats_controller_1.getAdminDashboardStats);
router.get('/business', stats_controller_1.getBusinessDashboardStats);
exports.default = router;
