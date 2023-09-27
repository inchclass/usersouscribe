import { RowDataPacket } from "mysql2"

export default interface User extends RowDataPacket {
  id?: number;
  nom?: string;
  prenom?: string;
  email?: string;
  phone?: number;
}