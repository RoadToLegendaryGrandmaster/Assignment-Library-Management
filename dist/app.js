"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// External imports
const express_1 = __importDefault(require("express"));
// internal imports
const books_controller_1 = require("./app/controllers/books.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
// main app
const app = (0, express_1.default)();
// Express middleware
app.use(express_1.default.json());
// user defined routes
app.use("/api/books", books_controller_1.booksRoutes);
app.use("/api/borrow", borrow_controller_1.borrowBookRoutes);
// root route
app.get("/", (req, res) => {
    try {
        if (res.statusCode === 200) {
            res.status(200).send("Library Management System");
        }
        else {
            throw Error("Responce Error");
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Server failed to start",
            success: false,
            error: error,
        });
    }
});
// 404 routes
app.use((req, res) => {
    res.status(404).json({
        message: "404 Route not found",
        success: false,
        error: {
            name: "Invalid route",
            errors: 404,
        },
    });
});
exports.default = app;
