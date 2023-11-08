import express, { Router } from "express";
import mailRoute from "./mail.route";
import applicantRoute from "./applicant.route";
import programRoute from "./program.route";
import jobRoute from "./job.route";

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
];

defaultRoutes.forEach((val) => {
  router.use(val.path, val.route);
});

export default router;
