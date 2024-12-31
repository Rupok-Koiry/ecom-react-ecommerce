"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newsletter_controller_1 = require("./newsletter.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// Newsletter Routes using router.route()
router.route('/').post(newsletter_controller_1.createNewsletter).get((0, auth_1.default)('admin'), newsletter_controller_1.getAllNewsletters);
router
    .route('/:id')
    .get((0, auth_1.default)('admin'), newsletter_controller_1.getNewsletterDetails)
    .patch((0, auth_1.default)('admin'), newsletter_controller_1.updateNewsletter)
    .delete((0, auth_1.default)('admin'), newsletter_controller_1.deleteNewsletter);
exports.default = router;
