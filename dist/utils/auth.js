"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePasswords = comparePasswords;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function hashPassword(password) {
    return bcryptjs_1.default.hash(password, 10);
}
async function comparePasswords(password, hashedPassword) {
    return bcryptjs_1.default.compare(password, hashedPassword);
}
