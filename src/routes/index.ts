import express, { Router } from "express";
import mailRoute from "./mail.route";
import applicantRoute from "./applicant.route";

const router: Router = express.Router();

interface DefaultRoute {
  path: string;
  route: Router;
}

const defaultRoutes: DefaultRoute[] = [
  {
    path: "/applicant",
    route: applicantRoute,
  },
  {
    path: "/mail",
    route: mailRoute,
  },
];

defaultRoutes.forEach((val) => {
  router.use(val.path, val.route);
});

export default router;
