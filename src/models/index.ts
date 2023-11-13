import { DataTypes } from "sequelize";
import AdminUser from "./adminUser";
import Applicant from "./applicant";
import BlogPost from "./blogpost";
import ContactUsRequest from "./contactUsRequest";
import Job from "./job";
import JobApplicant from "./jobApplicant";
import Program from "./program";
import Tag from "./tag";

const setupAssociations = () => {
  // Many-to-One relationships
  Applicant.belongsTo(Program, {
    as: "program",
    foreignKey: "programId",
    keyType: DataTypes.UUID,
  });
  Program.hasMany(Applicant, {
    as: "program",
    foreignKey: "programId",
    keyType: DataTypes.UUID,
  });

  Job.hasMany(JobApplicant, { as: "applicants", foreignKey: "jobId" });
  JobApplicant.belongsTo(Job, { as: "job", foreignKey: "jobId" });

  // Many-to-Many relationship
  BlogPost.belongsToMany(Tag, {
    as: "tags",
    through: "blogPostTags",
  });
  Tag.belongsToMany(BlogPost, { as: "blogPosts", through: "blogPostTags" });
};

// Call the function to setup associations
setupAssociations();

export { AdminUser, Applicant, BlogPost, ContactUsRequest, Job, Program, Tag };
