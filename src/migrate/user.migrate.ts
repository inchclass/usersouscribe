import { OkPacket } from "mysql2";
import connection from "../database";

import User from "../models/user.model";

interface IUserMigrate {
  save(user: User): Promise<User>;
  retrieveAll(searchParams: {nom: string, email: string}): Promise<User[]>;
  retrieveById(userId: number): Promise<User | undefined>;
  update(user: User): Promise<number>;
  delete(userId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class UserMigrate implements IUserMigrate {
  save(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "INSERT INTO users (nom, prenom, email, phone) VALUES(?,?,?,?)",
        [user.nom, user.prenom, user.email , user.phone ],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((user) => resolve(user!))
              .catch(reject);
        }
      );
    });
  }

  retrieveAll(searchParams: {nom?: string, email?: string}): Promise<User[]> {
    let query: string = "SELECT * FROM users";
    let condition: string = "";

    if (searchParams?.email)
      condition += `LOWER(email) LIKE '%${searchParams.email}%'`

    if (searchParams?.nom)
      condition += `LOWER(nom) LIKE '%${searchParams.nom}%'`

    if (condition.length)
      query += " WHERE " + condition;

    return new Promise((resolve, reject) => {
      connection.query<User[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(userId: number): Promise<User> {
    return new Promise((resolve, reject) => {
      connection.query<User[]>(
        "SELECT * FROM users WHERE id = ?",
        [userId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(user: User): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "UPDATE users SET nom = ?, prenom = ?, email = ?, phone = ? WHERE id = ?",
        [user.id, user.nom, user.prenom, user.email, user.phone],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  delete(userId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "DELETE FROM users WHERE id = ?",
        [userId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>("DELETE FROM users", (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new UserMigrate();
