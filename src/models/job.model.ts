import { RowDataPacket } from "mysql2"

export default interface Job extends RowDataPacket {
  id?: number;
  titre?: string;
  description?: string;
}