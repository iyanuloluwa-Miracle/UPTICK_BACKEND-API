import express, { Router } from "express";
import applicantRoute from "./applicant.route";
import blogpostRoute from "./blogpost.route";
import jobRoute from "./job.route";
import mailRoute from "./mail.route";
import programRoute from "./program.route";
import tagRoute from "./tag.route";

const router: Router = express.Router();

interface DefaultRoute {
  path: string;
  route: Router;
}

const defaultRoutes: DefaultRoute[] = [
  {
    path: "/applicants",
    route: applicantRoute,
  },
  {
    path: "/mail",
    route: mailRoute,
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
];

defaultRoutes.forEach((val) => {
  router.use(val.path, val.route);
});

export default router;
