// import { Router } from "express";
// import JobController from "../controllers/job.controller";

// class JobRoutes {
//   router = Router();
//   controller = new JobController();

//   constructor() {
//     this.intializeRoutes();
//   }

//   intializeRoutes() {
//     // Create a new Job
//     this.router.post("/", this.controller.create);

//     // Get all Jobs
//     this.router.get("/", this.controller.findAll);

//     // Get a single Job with id
//     this.router.get("/:id", this.controller.findOne);

//     // Update a Job with id
//     this.router.put("/:id", this.controller.update);

//     // Delete a Job with id
//     this.router.delete("/:id", this.controller.delete);

//     // Delete all Jobs
//     this.router.delete("/", this.controller.deleteAll);
//   }
// }

// export default new JobRoutes().router;