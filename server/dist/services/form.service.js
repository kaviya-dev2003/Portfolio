"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFormEntry = void 0;
const form_model_1 = require("../models/form.model");
const createFormEntry = async (data) => {
    return await form_model_1.FormModel.create(data);
};
exports.createFormEntry = createFormEntry;
