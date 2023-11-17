import ProgramApplicant from "./programApplicant";
import JobApplicant from "./jobApplicant";
import Job from "./job";
import Program from "./program";
import BlogPost from "./blogpost";
import contact from "./ContactFormSubmission"
import Tag from "./tag";
import AdminUser from "./adminUser";
import ContactUsRequest from "./contactUsRequest";
import { DataTypes } from "sequelize";

const setupAssociations = () => {
  // Many-to-One relationships
  ProgramApplicant.belongsTo(Program, {
    as: "program",
    foreignKey: "programId",
    keyType: DataTypes.UUID,
  });
  Program.hasMany(ProgramApplicant, {
    as: "program",
    foreignKey: "programId",
    keyType: DataTypes.UUID,
  });

  JobApplicant.belongsTo(Job, {
    as: "job",
    foreignKey: "jobId",
    keyType: DataTypes.UUID,
  });
  Job.hasMany(JobApplicant, {
    as: "job",
    foreignKey: "jobId",
    keyType: DataTypes.UUID,
  });

  // Many-to-Many relationship
  BlogPost.belongsToMany(Tag, {
    as: "associatedTags",
    through: "BlogPostTags",
  });
  Tag.belongsToMany(BlogPost, { as: "blogPosts", through: "BlogPostTags" });
};

// Call the function to setup associations
setupAssociations();

export {
  ProgramApplicant,
  JobApplicant,
  Job,
  Program,
  BlogPost,
  Tag,
  AdminUser,
  ContactUsRequest,
  contact
};
