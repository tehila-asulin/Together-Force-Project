const Organization = require('../models/Organization');
const Volunteer = require('../models/Volunteer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');


const register = async (req, res) => {


  const { name, email, phone, password, organizationNumber } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: 'כל השדות הם חובה' });
  }
  const emailExists = await Organization.findOne({ email }).lean();
  if (emailExists) {
    return res.status(409).json({ message: "קיים כבר ארגון עם מייל זהה" });
  }

  const numberExists = await Organization.findOne({ organizationNumber }).lean();
  if (numberExists) {
    return res.status(409).json({ message: "קיים כבר ארגון עם מספר זהה" });
  }


  let profileImageUrl = "";
  if (req.files && req.files.profileImage) {
    try {
      const result = await cloudinary.uploader.upload(req.files.profileImage.tempFilePath, {
        folder: "organizations"
      });
      profileImageUrl = result.secure_url;
    } catch (err) {
      return res.status(500).json({ message: "שגיאה בהעלאת תמונה" });
    }
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const organizationObject = {name,email, phone,profileImage: profileImageUrl,password: hashedPwd,organizationNumber};
  const organization = await Organization.create(organizationObject);
  try {
    if (organization) {
      const organizationInfo = {
        _id: organization._id,
        name: organization.name,
        email: organization.email,
        phone: organization.phone,
        profileImage: organization.profileImage,
        organizationNumber: organization.organizationNumber,
        history: organization.history,
      };
      const accessToken = jwt.sign(organizationInfo, process.env.ACCESS_TOKEN_SECRET)
      return res.status(201).json({ accessToken: accessToken, organization: organizationInfo })
    }

  } catch (err) {
    console.error("DB Save Error:", err);
    return res.status(400).json({ message: 'נתוני הארגון שהתקבלו אינם תקינים' });
  }
};

const registerV = async (req, res) => {
  try {
    const { name,  email, phone, idNumber,history,password} = req.body;

    const selectedVolunteerOptions = JSON.parse(req.body.selectedVolunteerOptions);
    const selectedCities = JSON.parse(req.body.selectedCities);
    if (!name || !password) {
      return res.status(400).json({ message: 'כל השדות חובה' });
    }

    const emailExists = await Volunteer.findOne({ email }).lean();
    if (emailExists) {
      return res.status(409).json({ message: "קיים כבר מתנדב עם מייל זהה" });
    }

    const idNumberExists = await Volunteer.findOne({ idNumber }).lean();
    if (idNumberExists) {
      return res.status(409).json({ message: "קיים כבר מתנדב עם תעודת זהות זהה" });
    }

    let profileImageUrl = "";
    if (req.files && req.files.profileImage) {
      try {
     
        const result = await cloudinary.uploader.upload(req.files.profileImage.tempFilePath, {
          folder: "volunteers"
        });
        profileImageUrl = result.secure_url;
      } catch (err) {
        return res.status(500).json({ message: "שגיאה בהעלאת תמונה" });
      }
    }
    const hashedPwd = await bcrypt.hash(password, 10);

    const volunteerObject = {
      name,
      email,
      phone,
      profileImage: profileImageUrl,
      idNumber,
      selectedVolunteerOptions,
      selectedCities,
      history: history || [],
      password: hashedPwd
    };

    const volunteer = await Volunteer.create(volunteerObject);

    if (volunteer) {
      const volunteerInfo = {
        _id: volunteer._id,
        name: volunteer.name,
        email: volunteer.email,
        phone: volunteer.phone,
        profileImage: volunteer.profileImage,
        idNumber: volunteer.idNumber,
        selectedVolunteerOptions: volunteer.selectedVolunteerOptions,
        selectedCities: volunteer.selectedCities,
        history: volunteer.history,

      };
      const accessToken = jwt.sign(volunteerInfo, process.env.ACCESS_TOKEN_SECRET)
      return res.status(201).json({ accessToken: accessToken, volunteer: volunteerInfo })
    } else {
      return res.status(400).json({ message: 'נתוני המתנדב שהתקבלו אינם תקינים' });
    }
  } catch (error) {
    res.status(500).json({ message: "שגיאת שרת" });
  }
};

const loginV = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'כל השדות חובה' });
    }

    const foundVolunteer = await Volunteer.findOne({ email }).lean();
    if (!foundVolunteer) {
      return res.status(401).json({ message: 'לא נמצא מתנדב עם פרטים אלו' });
    }

    const match = await bcrypt.compare(password, foundVolunteer.password);
    if (!match) {
      return res.status(401).json({ message: 'לא נמצא מתנדב עם פרטים אלו' });
    }

    const volunteerInfo = {
      name: foundVolunteer.name,
      email: foundVolunteer.email,
      phone: foundVolunteer.phone,
      profileImage: foundVolunteer.profileImage,
      idNumber: foundVolunteer.idNumber,
      selectedVolunteerOptions: foundVolunteer.selectedVolunteerOptions,
      selectedCities: foundVolunteer.selectedCities,
      history: foundVolunteer.history,
    };

    const accessToken = jwt.sign(volunteerInfo, process.env.ACCESS_TOKEN_SECRET);
  
    res.json({ accessToken: accessToken, volunteer: foundVolunteer })
  } catch (error) {
    res.status(500).json({ message: "שגיאת שרת" });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'כל השדות הינם חובה' });
    }

    const foundOrganization = await Organization.findOne({ email }).lean();
    if (!foundOrganization) {
      return res.status(401).json({ message: 'לא נמצא ארגון עם פרטים  אלו' });
    }

    const match = await bcrypt.compare(password, foundOrganization.password);
    if (!match) {
      return res.status(401).json({ message: 'לא נמצא ארגון עם פרטים  אלו' });
    }

    const organizationInfo = {
      _id: foundOrganization._id,
      name: foundOrganization.name,
      email: foundOrganization.email,
      phone: foundOrganization.phone,
      profileImage: foundOrganization.profileImage,
      organizationNumber: foundOrganization.organizationNumber,
      history: foundOrganization.history,
    };

    const accessToken = jwt.sign(organizationInfo, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken, organization: organizationInfo })
  } catch (error) {
    res.status(500).json({ message: "שגיאת שרת" });
  }
};
module.exports = { register, registerV, login, loginV };
