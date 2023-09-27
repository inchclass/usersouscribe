import { RowDataPacket } from "mysql2"

export default interface Skills extends RowDataPacket {
  id?: number;
  id_job?: number;
  titre?: string;
  description?: string;

}