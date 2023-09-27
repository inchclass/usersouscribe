import { OkPacket } from "mysql2";
import connection from "../database";

import Job from "../models/job.model";

interface IJobMigrate {
  save(job: Job): Promise<Job>;
  retrieveAll(searchParams: {titre: string}): Promise<Job[]>;
  retrieveById(jobId: number): Promise<Job | undefined>;
  update(job: Job): Promise<number>;
  delete(jobId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class JobMigrate implements IJobMigrate {
  save(job: Job): Promise<Job> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "INSERT INTO job (titre, description) VALUES(?,?)",
        [job.titre, job.description ],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((job) => resolve(job!))
              .catch(reject);
        }
      );
    });
  }

  retrieveAll(searchParams: {titre?: string, description?: string}): Promise<Job[]> {
    let query: string = "SELECT * FROM job";
    let condition: string = "";

    if (searchParams?.description)
      condition += `LOWER(description) LIKE '%${searchParams.description}%'`

    if (searchParams?.titre)
      condition += `LOWER(titre) LIKE '%${searchParams.titre}%'`

    if (condition.length)
      query += " WHERE " + condition;

    return new Promise((resolve, reject) => {
      connection.query<Job[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(jobId: number): Promise<Job> {
    return new Promise((resolve, reject) => {
      connection.query<Job[]>(
        "SELECT * FROM job WHERE id = ?",
        [jobId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(job: Job): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "UPDATE job SET titre = ?, description = ? WHERE id = ?",
        [job.id, job.titre, job.description],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  delete(jobId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "DELETE FROM job WHERE id = ?",
        [jobId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>("DELETE FROM job", (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new JobMigrate();
