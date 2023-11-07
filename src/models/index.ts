import Applicant from "./applicant";
import Job from "./job";
import Program from "./program";
import BlogPost from "./blogpost";
import Tag from "./tag";
import AdminUser from "./adminUser";
import ContactUsRequest from "./contactUsRequest";
import { DataTypes } from "sequelize";

const setupAssociations = () => {
  // Many-to-One relationships
  Applicant.belongsTo(Program, { as: "program", foreignKey: "programId", keyType: DataTypes.UUID });
  Program.hasMany(Applicant, { as: "program", foreignKey: "programId",keyType: DataTypes.UUID });

  Applicant.belongsTo(Job, { as: "job", foreignKey:"jobId", keyType: DataTypes.UUID });
  Job.hasMany(Applicant, { as: "job", foreignKey: "jobId", keyType: DataTypes.UUID });

  // Many-to-Many relationship
  BlogPost.belongsToMany(Tag, {
    as: "associatedTags",
    through: "BlogPostTags",
  });
  Tag.belongsToMany(BlogPost, { as: "blogPosts", through: "BlogPostTags" });
};

// Call the function to setup associations
setupAssociations();

export { Applicant, Job, Program, BlogPost, Tag, AdminUser, ContactUsRequest };
