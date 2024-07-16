"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
var UserRole;
(function (UserRole) {
    UserRole["Student"] = "student";
    UserRole["Teacher"] = "teacher";
    UserRole["Parent"] = "parent";
})(UserRole || (UserRole = {}));
const userSchema = new mongoose_1.Schema({
    userID: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    teacherID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: function () { return this.role === UserRole.Student; } },
    parentID: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: function () { return this.role === UserRole.Student; } }],
    documentIDs: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Document', required: function () { return this.role === UserRole.Teacher; } }],
    studentIDs: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: function () { return this.role === UserRole.Parent; } }],
});
exports.default = mongoose_1.default.model('User', userSchema);
