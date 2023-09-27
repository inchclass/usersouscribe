import { RowDataPacket } from "mysql2"

export default interface Typeofjob extends RowDataPacket {
  id?: number;
  intitule?: string;
  description?: string;
}