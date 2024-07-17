// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import { AppDataSource } from "./data-source";
// import { User } from "./entity/User";

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(cors());
// app.use(bodyParser.json());

// AppDataSource.initialize()
//   .then(async () => {
//     console.log("Data Source has been initialized!");

//     app.post("/search", async (req, res) => {
//       const { email, number } = req.body;
//       console.log(123444);
      
//       const userRepository = AppDataSource.getRepository(User);

//       const query = userRepository.createQueryBuilder("user");

//       if (email) {
//         query.andWhere("user.email LIKE :email", { email: `%${email}%` });
//       }
//       if (number) {
//         query.andWhere("user.number LIKE :number", { number: `%${number}%` });
//       }

//       try {
//         const filteredData = await query.getMany();

//         // Имитация задержки
//         setTimeout(() => {
//           res.json(filteredData);
//         }, 5000);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         res.status(500).send("Internal Server Error");
//       }
//     });

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) =>
//     console.log("Error during Data Source initialization:", error),
//   );


import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/user.routes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.use("/api", userRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) =>
    console.log("Error during Data Source initialization:", error),
  );
