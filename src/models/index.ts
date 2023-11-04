import { Sequelize, Model } from "sequelize";
import config from "../config/config";
import Applicant from "./applicant";
import Job from "./job";
import Program from "./program";
import BlogPost from "./blogpost";
import Tag from "./tag";

// initialize db
const sequelize = new Sequelize(config.db.postgres.options);

// define relationships here

const setupAssociations = () => {
  // Many-to-One relationships
  Applicant.belongsTo(Program, { as: "program", foreignKey: "ProgramId" });
  Program.hasMany(Applicant, { as: "applicants", foreignKey: "ProgramId" });

  Applicant.belongsTo(Job, { as: "job", foreignKey: "JobId" });
  Job.hasMany(Applicant, { as: "applicants", foreignKey: "JobId" });

  // Many-to-Many relationship
  BlogPost.belongsToMany(Tag, { as: "tags", through: "BlogPostTags" });
  Tag.belongsToMany(BlogPost, { as: "blogPosts", through: "BlogPostTags" });
};

// Call the function to setup associations
setupAssociations();

export { sequelize, Applicant, Job, Program, BlogPost, Tag };
