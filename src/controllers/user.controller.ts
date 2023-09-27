import { Request, Response } from "express";
import User from "../models/user.model";
import userMigrate from "../migrate/user.migrate";

export default class UserController {

    // Create a new user 
  async create(req: Request, res: Response) {
    console.log(req.body)
    if (!req.body.nom) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const user: User = req.body;
      const savedUser = await userMigrate.save(user);
      // return res.sendFile('C:\\xampp\\htdocs\\UserSouscribe\\views\\home.html' );
      res.status(201).send(savedUser);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving users."
      });
    }
      
    
  }

//   get all user
  async findAll(req: Request, res: Response) {
    const nom = typeof req.query.nom === "string" ? req.query.nom : "";

    try {
      const users = await userMigrate.retrieveAll({ nom: nom });

      res.status(200).send(users);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving users."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const user = await userMigrate.retrieveById(id);

      if (user) res.status(200).send(user);
      else
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving User with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let user: User = req.body;
    user.id = parseInt(req.params.id);

    try {
      const num = await userMigrate.update(user);

      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${user.id}. Maybe User was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating User with id=${user.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await userMigrate.delete(id);

      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete User with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await userMigrate.deleteAll();

      res.send({ message: `${num} Users were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all users."
      });
    }
  }

}
