import Applicant from "./applicant";
import Job from "./job";
import Program from "./program";
import BlogPost from "./blogpost";
import Tag from "./tag";
import AdminUser from "./adminUser";
import ContactUsRequest from "./contactUsRequest";

const setupAssociations = () => {
  // Many-to-One relationships
  Applicant.belongsTo(Program, { as: "program", foreignKey: "programId" });
  Program.hasMany(Applicant, { as: "applicants", foreignKey: "applicantId" });

  Applicant.belongsTo(Job, { as: "job", foreignKey: "jobId" });
  Job.hasMany(Applicant, { as: "applicants", foreignKey: "applicantId" });

  // Many-to-Many relationship
  BlogPost.belongsToMany(Tag, { as: "associatedTags", through: "BlogPostTags" });
  Tag.belongsToMany(BlogPost, { as: "blogPosts", through: "BlogPostTags" });
};

// Call the function to setup associations
setupAssociations();

export { Applicant, Job, Program, BlogPost, Tag, AdminUser, ContactUsRequest };
