"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const process_1 = __importDefault(require("process"));
require("dotenv/config");
// internal file import
const app_1 = __importDefault(require("./app"));
// Assigned variable
const PORT = 5000;
let server;
// Main function for runing server
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(`${process_1.default.env.MONGODB_ACCESS__URL}`); // referance .env
            // Server listining at the specific PORT, PORT will be reserved during run.
            server = app_1.default.listen(PORT, () => {
                console.log(`App is running on port ${PORT}`);
            });
        }
        catch (error) {
            console.log({
                message: "Server failed to start",
                success: false,
                error: error.message,
            });
        }
    });
}
main(); // calling the function
