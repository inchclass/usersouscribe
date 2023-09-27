import { Application } from "express";
import userRoutes from "./user.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/", (req, res) =>{
      res.sendFile('C:\\xampp\\htdocs\\UserSouscribe\\views\\index.html');
    });
    // app.use("/", userRoutes);
    app.use("/user", userRoutes);
  }
}