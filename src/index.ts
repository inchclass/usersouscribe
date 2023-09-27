import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from './routes';
import path from "path";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:8081"
    };

    app.use(express.static('src'));

    //Serves all the request which includes /images in the url from Images folder
    app.use('/images', express.static(__dirname + '/images'));
    app.set('view engine', 'pug');
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}