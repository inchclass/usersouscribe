import { OkPacket } from "mysql2";
import connection from "../database";

import Skill from "../models/skills.model";

interface IskillMigrate {
  save(skill: Skill): Promise<Skill>;
  retrieveAll(searchParams: {titre: string}): Promise<Skill[]>;
  retrieveById(skillId: number): Promise<Skill | undefined>;
  update(skill: Skill): Promise<number>;
  delete(skillId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class skillMigrate implements IskillMigrate {
  save(skill: Skill): Promise<Skill> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "INSERT INTO skill (titre, description) VALUES(?,?)",
        [skill.titre, skill.description ],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((skill) => resolve(skill!))
              .catch(reject);
        }
      );
    });
  }

  retrieveAll(searchParams: {titre?: string, description?: string}): Promise<Skill[]> {
    let query: string = "SELECT * FROM skill";
    let condition: string = "";

    if (searchParams?.description)
      condition += `LOWER(description) LIKE '%${searchParams.description}%'`

    if (searchParams?.titre)
      condition += `LOWER(titre) LIKE '%${searchParams.titre}%'`

    if (condition.length)
      query += " WHERE " + condition;

    return new Promise((resolve, reject) => {
      connection.query<Skill[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(skillId: number): Promise<Skill> {
    return new Promise((resolve, reject) => {
      connection.query<Skill[]>(
        "SELECT * FROM skill WHERE id = ?",
        [skillId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(skill: Skill): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "UPDATE skill SET titre = ?, description = ? WHERE id = ?",
        [skill.id, skill.titre, skill.description],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  delete(skillId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "DELETE FROM skill WHERE id = ?",
        [skillId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>("DELETE FROM skill", (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new skillMigrate();
