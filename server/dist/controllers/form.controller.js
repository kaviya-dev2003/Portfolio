"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFormSubmission = void 0;
const form_service_1 = require("../services/form.service");
const handleFormSubmission = async (req, res) => {
    try {
        const formData = req.body;
        const savedData = await (0, form_service_1.createFormEntry)(formData);
        res
            .status(201)
            .json({ message: "Form submitted successfully", data: savedData });
    }
    catch (error) {
        res.status(500).json({ message: "Error submitting form", error });
    }
};
exports.handleFormSubmission = handleFormSubmission;
