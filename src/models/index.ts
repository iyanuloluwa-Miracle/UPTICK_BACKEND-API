import { DataTypes } from "sequelize";
import AdminUser from "./adminUser";
import ProgramApplicant from "./programApplicant";
import BlogPost from "./blogpost";
import ContactUsRequest from "./contactUsRequest";
import Contact from "./contactFormSubmission";
import Job from "./job";
import JobApplicant from "./jobApplicant";
import Program from "./program";
import Tag from "./tag";
import User from "./user";
import StartupApplicant from "./startUpApplicant";
import TalentApplicant from "./techTalentApplicant";

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

export {
  AdminUser,
  ProgramApplicant,
  JobApplicant,
  BlogPost,
  ContactUsRequest,
  Job,
  Program,
  Tag,
  Contact,
  User,
  TalentApplicant,
  StartupApplicant,
};
