import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { validateOrReject } from "class-validator";
import { UserRequest } from "../validation/user.request";

class UserController {
  static async searchUsers(req: Request, res: Response) {
    const { email, number } = req.body;
    
    const userRepository = AppDataSource.getRepository(User);
    const query = userRepository.createQueryBuilder("user");

    if (email) {
      query.andWhere("user.email LIKE :email", { email: `%${email}%` });
    }
    if (number) {
      query.andWhere("user.number LIKE :number", { number: `%${number}%` });
    }

    try {
      const filteredData = await query.getMany();
      setTimeout(() => {
        res.json(filteredData);
      }, 5000);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async createUser(req: Request, res: Response) {
    const userRequest = new UserRequest();
    userRequest.email = req.body.email;
    userRequest.number = req.body.number;
    
    try {
      await validateOrReject(userRequest);
      
      const userRepository = AppDataSource.getRepository(User);
      const newUser = userRepository.create(userRequest);
      await userRepository.save(newUser);

      res.status(201).json(newUser);
    } catch (errors) {
      res.status(400).json(errors);
    }
  }
}

export default UserController;
