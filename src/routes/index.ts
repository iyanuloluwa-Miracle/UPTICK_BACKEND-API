import express, { Router } from "express";
import progApplicantRoute from "./progApplicant.route";
import jobApplicantRoute from "./jobApplicant.route";
import blogpostRoute from "./blogpost.route";
import jobRoute from "./job.route";
//import mailRoute from "./mail.route";
import programRoute from "./program.route";
import tagRoute from "./tag.route";
import authRoute from "./authAdmin.route";
import contactRoute from "./contact.route";

const router: Router = express.Router();

interface DefaultRoute {
  path: string;
  route: Router;
}

const defaultRoutes: DefaultRoute[] = [
  {
    path: "/progApplicant",
    route: progApplicantRoute,
  },
  {
    path: "/jobApplicant",
    route: jobApplicantRoute,
  },
  {
    path: "/programs",
    route: programRoute,
  },
  {
    path: "/jobs",
    route: jobRoute,
  },
  {
    path: "/blogposts",
    route: blogpostRoute,
  },
  {
    path: "/tags",
    route: tagRoute,
  },
  {
    path: "/contact",
    route: contactRoute,
  },
  {
    path: "/",
    route: authRoute,
  },
];

defaultRoutes.forEach((val) => {
  router.use(val.path, val.route);
});

export default router;
