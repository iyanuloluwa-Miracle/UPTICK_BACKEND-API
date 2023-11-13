import { DataTypes } from "sequelize";
import AdminUser from "./adminUser";
import Applicant from "./applicant";
import BlogPost from "./blogpost";
import ContactUsRequest from "./contactUsRequest";
import Job from "./job";
import Program from "./program";
import Tag from "./tag";

import Contact from "./contact.model";

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

  Applicant.belongsTo(Job, {
    as: "job",
    foreignKey: "jobId",
    keyType: DataTypes.UUID,
  });
  Job.hasMany(Applicant, {
    as: "job",
    foreignKey: "jobId",
    keyType: DataTypes.UUID,
  });

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
  Applicant,
  BlogPost,
  Contact,
  ContactUsRequest,
  Job,
  Program,
  Tag,
};
