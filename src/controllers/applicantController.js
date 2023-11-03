const Applicant = require("../models/applicant");

class ApplicantController {
  static async application(req, res) {
    const {
      firstName,
      lastName,
      email
    } = req.body;
    await Applicant.sync()
    const applicant = await Applicant.create({ firstName, lastName, email })

    // console.log(applicant.firstName);
    return res.json({ message: "success" })
  }
}

module.exports = ApplicantController;