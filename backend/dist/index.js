"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_source_1 = require("./data-source");
const User_1 = require("./entity/User");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
data_source_1.AppDataSource.initialize()
    .then(async () => {
    console.log("Data Source has been initialized!");
    app.post("/search", async (req, res) => {
        const { email, number } = req.body;
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const query = userRepository.createQueryBuilder("user");
        if (email) {
            query.andWhere("user.email LIKE :email", { email: `%${email}%` });
        }
        if (number) {
            query.andWhere("user.number LIKE :number", { number: `%${number}%` });
        }
        try {
            const filteredData = await query.getMany();
            // Имитация задержки
            setTimeout(() => {
                res.json(filteredData);
            }, 5000);
        }
        catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).send("Internal Server Error");
        }
    });
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => console.log("Error during Data Source initialization:", error));
