import { OkPacket } from "mysql2";
import connection from "../database";

import Typeofjob from "../models/typeofjob.model";

interface ITypeofjobMigrate {
  save(typeofjob: Typeofjob): Promise<Typeofjob>;
  retrieveAll(searchParams: {intitule: string}): Promise<Typeofjob[]>;
  retrieveById(typeofjobId: number): Promise<Typeofjob | undefined>;
  update(typeofjob: Typeofjob): Promise<number>;
  delete(typeofjobId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class TypeofjobMigrate implements ITypeofjobMigrate {
  save(typeofjob: Typeofjob): Promise<Typeofjob> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "INSERT INTO typeofjob (intitule, description) VALUES(?,?)",
        [typeofjob.intitule, typeofjob.description ],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((typeofjob) => resolve(typeofjob!))
              .catch(reject);
        }
      );
    });
  }

  retrieveAll(searchParams: {intitule?: string, description?: string}): Promise<Typeofjob[]> {
    let query: string = "SELECT * FROM typeofjob";
    let condition: string = "";

    if (searchParams?.description)
      condition += `LOWER(description) LIKE '%${searchParams.description}%'`

    if (searchParams?.intitule)
      condition += `LOWER(intitule) LIKE '%${searchParams.intitule}%'`

    if (condition.length)
      query += " WHERE " + condition;

    return new Promise((resolve, reject) => {
      connection.query<Typeofjob[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(typeofjobId: number): Promise<Typeofjob> {
    return new Promise((resolve, reject) => {
      connection.query<Typeofjob[]>(
        "SELECT * FROM typeofjob WHERE id = ?",
        [typeofjobId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(typeofjob: Typeofjob): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "UPDATE Typeofjob SET intitule = ?, description = ? WHERE id = ?",
        [typeofjob.id, typeofjob.intitule, typeofjob.description],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  delete(typeofjobId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "DELETE FROM typeofjob WHERE id = ?",
        [typeofjobId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>("DELETE FROM typeofjob", (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new TypeofjobMigrate();
