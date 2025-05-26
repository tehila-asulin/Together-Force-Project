// // // const Organization = require('../models/Organization');
// // // const Volunteer = require('../models/Volunteer');
// // // const bcrypt= require('bcrypt')
// // // const jwt= require('jsonwebtoken')

// // // const register = async (req, res) => {
// // //     const { name, email, phone, profileImage, password, organizationNumber } = req.body;

// // //     if (!name || !password) {
// // //       return res.status(400).json({ message: 'All fields are required' });
// // //     }

// // //     const duplicate = await Organization.findOne({ name }).lean();
// // //     if (duplicate) {
// // //       return res.status(409).json({ message: "Duplicate organization name" });
// // //     }

// // //     const hashedPwd = await bcrypt.hash(password, 10);

// // //     const organizationObject = {
// // //       name,
// // //       email,
// // //       phone,
// // //       profileImage,
// // //       password: hashedPwd,
// // //       organizationNumber
// // //     };

// // //     const organization = await Organization.create(organizationObject);

// // //     if (organization) {
// // //       return res.status(201).json({ message: `New Organization ${organization.name} created` });
// // //     } else {
// // //       return res.status(400).json({ message: 'Invalid Organization received' });
// // //     }
// // //   };
// // //   const registerV = async (req, res) => {
// // //     const {
// // //       name,
// // //       email,
// // //       phone,
// // //       profileImage,
// // //       idNumber,
// // //       selectedVolunteerOptions,
// // //       selectedCities,
// // //       history,
// // //       password
// // //     } = req.body;



// // //     if (!name || !password) {
// // //       return res.status(400).json({ message: 'All fields are required' });
// // //     }

// // //     const duplicate = await Volunteer.findOne({ email }).lean();
// // //     if (duplicate) {
// // //       return res.status(409).json({ message: "Duplicate Volunteer email" });
// // //     }

// // //     const hashedPwd = await bcrypt.hash(password, 10);

// // //     const volunteerObject = {
// // //       name,
// // //       email,
// // //       phone,
// // //       profileImage,
// // //       idNumber,
// // //       selectedVolunteerOptions,
// // //       selectedCities,
// // //       history: history || [],
// // //       password:hashedPwd
// // //     } 

// // //     const volunteer = await Volunteer.create(volunteerObject);

// // //     if (volunteer) {
// // //       return res.status(201).json({ message: `New Volunteer ${volunteer.name} created` });
// // //     } else {
// // //       return res.status(400).json({ message: 'Invalid Volunteer received' });
// // //     }
// // //   };


// // // const loginV = async (req, res) => {
// // //   const { email, password } = req.body

// // //   if (!email || !password) {
// // //     return res.status(400).json({ message: 'All fields are required' })
// // //   }

// // //   const foundVolunteer = await Volunteer.findOne({ email }).lean()


// // //   if (!foundVolunteer) {
// // //     return res.status(401).json({ message: 'Unauthorized' });
// // //   }

// // //   const match = await bcrypt.compare(password, foundVolunteer.password)


// // //   if (!match) {
// // //     console.log(" סיסמה לא נכונה")
// // //     return res.status(401).json({ message: 'Unauthorized' })
// // //   }

// // //   const volunteerInfo = {
// // //     name: foundVolunteer.name,
// // //     email: foundVolunteer.email,
// // //     phone: foundVolunteer.phone,
// // //     profileImage: foundVolunteer.profileImage,
// // //     idNumber: foundVolunteer.idNumber,
// // //     selectedVolunteerOptions: foundVolunteer.selectedVolunteerOptions,
// // //     selectedCities: foundVolunteer.selectedCities,
// // //     history: foundVolunteer.history,
// // //   }

// // //   const accessToken = jwt.sign(volunteerInfo, process.env.ACCESS_TOKEN_SECRET)
// // //   console.log(" התחברות הצליחה!")
// // //   res.json({ accessToken })
// // // }

// // // const login = async (req, res) => {
// // //   const { email, password } = req.body

// // //   if (!email || !password) {
// // //     return res.status(400).json({ message: 'All fields are required' })
// // //   }

// // //   const foundOrganization = await Organization.findOne({ email }).lean()


// // //   if (!foundOrganization) {
// // //     return res.status(401).json({ message: 'Unauthorized' });
// // //   }

// // //   const match = await bcrypt.compare(password, foundOrganization.password)


// // //   if (!match) {
// // //     console.log(" סיסמה לא נכונה")
// // //     return res.status(401).json({ message: 'Unauthorized' })
// // //   }

// // //   const organizationInfo = {
// // //   name: foundOrganization.name,
// // //   email:foundOrganization.email, 
// // //   phone:foundOrganization.phone,
// // //   history:foundOrganization.history,
// // //   profileImage:foundOrganization.profileImage,
// // //   password:foundOrganization.password,
// // //   organizationNumber:foundOrganization.organizationNumber
// // //   }

// // //   const accessToken = jwt.sign(organizationInfo, process.env.ACCESS_TOKEN_SECRET)
// // //   console.log(" התחברות הצליחה!")
// // //   res.json({ accessToken })
// // // };
// // // module.exports = {login, register,loginV, registerV}

// // const Organization = require('../models/Organization');
// // const Volunteer = require('../models/Volunteer');
// // const bcrypt= require('bcrypt')
// // const jwt= require('jsonwebtoken')



// // const register = async (req, res) => {
// //   try {
// //     const { name, email, phone, password, organizationNumber } = req.body;

// //     const profileImagePath = req.file ? req.file.path : null;

// //     const newOrg = new Organization({
// //       name,
// //       email,
// //       phone,
// //       password,
// //       organizationNumber,
// //       profileImage: profileImagePath, // רק הנתיב
// //     });

// //     await newOrg.save();

// //     res.status(201).json({ message: "Organization created successfully" });
// //   } catch (error) {
// //     console.error("Error registering organization:", error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // const register = async (req, res) => {
// // //     const { name, email, phone, profileImage, password, organizationNumber } = req.body;

// // //     if (!name || !password) {
// // //         return res.status(400).json({ message: 'All fields are required' });
// // //     }

// // //     const duplicate = await Organization.findOne({ name }).lean();
// // //     if (duplicate) {
// // //         return res.status(409).json({ message: "Duplicate organization name" });
// // //     }

// // //     const hashedPwd = await bcrypt.hash(password, 10);

// // //     const organizationObject = {
// // //         name,
// // //         email,
// // //         phone,
// // //         profileImage,
// // //         password: hashedPwd,
// // //         organizationNumber
// // //     };

// // //     const organization = await Organization.create(organizationObject);

// // //     if (organization) {
// // //         return res.status(201).json({ message: `New Organization ${organization.name} created` });
// // //     } else {
// // //         return res.status(400).json({ message: 'Invalid Organization received' });
// // //     }
// // // };
// // const registerV = async (req, res) => {
// //     const {
// //         name,
// //         email,
// //         phone,
// //         profileImage,
// //         idNumber,
// //         selectedVolunteerOptions,
// //         selectedCities,
// //         history,
// //         password
// //     } = req.body;

// //     if (!name || !password) {
// //         return res.status(400).json({ message: 'All fields are required' });
// //     }

// //     const duplicate = await Volunteer.findOne({ email }).lean();
// //     if (duplicate) {
// //         return res.status(409).json({ message: "Duplicate Volunteer email" });
// //     }

// //     const hashedPwd = await bcrypt.hash(password, 10);

// //     const volunteerObject = {
// //         name,
// //         email,
// //         phone,
// //         profileImage,
// //         idNumber,
// //         selectedVolunteerOptions,
// //         selectedCities,
// //         history: history || [],
// //         password:hashedPwd
// //     }

// //     const volunteer = await Volunteer.create(volunteerObject);

// //     if (volunteer) {
// //         return res.status(201).json({ message: `New Volunteer ${volunteer.name} created` });
// //     } else {
// //         return res.status(400).json({ message: 'Invalid Volunteer received' });
// //     }
// // };


// // const loginV = async (req, res) => {
// //     const { email, password } = req.body

// //     if (!email || !password) {
// //         return res.status(400).json({ message: 'All fields are required' })
// //     }

// //     const foundVolunteer = await Volunteer.findOne({ email }).lean()


// //     if (!foundVolunteer) {
// //         return res.status(401).json({ message: 'Unauthorized' });
// //     }

// //     const match = await bcrypt.compare(password, foundVolunteer.password)


// //     if (!match) {
// //         console.log(" סיסמה לא נכונה")
// //         return res.status(401).json({ message: 'Unauthorized' })
// //     }

// //     const volunteerInfo = {
// //         name: foundVolunteer.name,
// //         email: foundVolunteer.email,
// //         phone: foundVolunteer.phone,
// //         profileImage: foundVolunteer.profileImage,
// //         idNumber: foundVolunteer.idNumber,
// //         selectedVolunteerOptions: foundVolunteer.selectedVolunteerOptions,
// //         selectedCities: foundVolunteer.selectedCities,
// //         history: foundVolunteer.history,
// //     }

// //     const accessToken = jwt.sign(volunteerInfo, process.env.ACCESS_TOKEN_SECRET)
// //     console.log(" התחברות הצליחה!")
// //     res.json({ accessToken, user: foundVolunteer }); // שינוי כאן
// // }

// // const login = async (req, res) => {
// //     const { email, password } = req.body

// //     if (!email || !password) {
// //         return res.status(400).json({ message: 'All fields are required' })
// //     }

// //     const foundOrganization = await Organization.findOne({ email }).lean()


// //     if (!foundOrganization) {
// //         return res.status(401).json({ message: 'Unauthorized' });
// //     }

// //     const match = await bcrypt.compare(password, foundOrganization.password)


// //     if (!match) {
// //         console.log(" סיסמה לא נכונה")
// //         return res.status(401).json({ message: 'Unauthorized' })
// //     }

// //     const organizationInfo = {
// //     name: foundOrganization.name,
// //     email:foundOrganization.email,
// //     phone:foundOrganization.phone,
// //     history:foundOrganization.history,
// //     profileImage:foundOrganization.profileImage,
// //     password:foundOrganization.password,
// //     organizationNumber:foundOrganization.organizationNumber
// //     }

// //     const accessToken = jwt.sign(organizationInfo, process.env.ACCESS_TOKEN_SECRET)
// //     console.log(" התחברות הצליחה!")
// //     res.json({ accessToken, organization: foundOrganization }); // שינוי כאן
// // };
// // module.exports = {login, register,loginV, registerV}
// const Organization = require('../models/Organization');
// const Volunteer = require('../models/Volunteer');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


// const cloudinary = require('cloudinary').v2;

// // הרשמה של ארגון
// const register = async (req, res) => {
//   try {
//     const { name, email, phone, password, organizationNumber } = req.body;

//     const duplicate = await Organization.findOne({ email }).lean();
//     if (duplicate) {
//       return res.status(409).json({ message: "Duplicate organization email" });
//     }

//     let profileImageUrl = "";

//     if (req.files && req.files.profileImage) {
//       const result = await cloudinary.uploader.upload(
//         req.files.profileImage.tempFilePath,
//         {
//           folder: "organizations"
//         }
//       );
//       profileImageUrl = result.secure_url;
//     }

//     const hashedPwd = await bcrypt.hash(password, 10);

//     const newOrg = new Organization({
//       name,
//       email,
//       phone,
//       password: hashedPwd,
//       organizationNumber,
//       profileImage: profileImageUrl,
//     });

//     await newOrg.save();

//     res.status(201).json({ message: "Organization created successfully" });
//   } catch (error) {
//     console.error("Error registering organization:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// // הרשמה של ארגון
// // const register = async (req, res) => {
// //   try {
// //     const { name, email, phone, password, organizationNumber } = req.body;

// //     const duplicate = await Organization.findOne({ email }).lean();
// //     if (duplicate) {
// //       return res.status(409).json({ message: "Duplicate organization email" });
// //     }

// //     const profileImagePath = req.file ? req.file.path : null;

// //     const hashedPwd = await bcrypt.hash(password, 10);

// //     const newOrg = new Organization({
// //       name,
// //       email,
// //       phone,
// //       password: hashedPwd,
// //       organizationNumber,
// //       profileImage: profileImagePath,
// //     });

// //     await newOrg.save();

// //     res.status(201).json({ message: "Organization created successfully" });
// //   } catch (error) {
// //     console.error("Error registering organization:", error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // הרשמה של מתנדב
// const registerV = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       phone,
//       profileImage,
//       idNumber,
//       selectedVolunteerOptions,
//       selectedCities,
//       history,
//       password
//     } = req.body;

//     if (!name || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const duplicate = await Volunteer.findOne({ email }).lean();
//     if (duplicate) {
//       return res.status(409).json({ message: "Duplicate Volunteer email" });
//     }

//     const hashedPwd = await bcrypt.hash(password, 10);

//     const volunteerObject = {
//       name,
//       email,
//       phone,
//       profileImage,
//       idNumber,
//       selectedVolunteerOptions,
//       selectedCities,
//       history: history || [],
//       password: hashedPwd
//     };

//     const volunteer = await Volunteer.create(volunteerObject);

//     if (volunteer) {
//       return res.status(201).json({ message: `New Volunteer ${volunteer.name} created` });
//     } else {
//       return res.status(400).json({ message: 'Invalid Volunteer received' });
//     }
//   } catch (error) {
//     console.error("Error registering volunteer:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // התחברות של מתנדב
// const loginV = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const foundVolunteer = await Volunteer.findOne({ email }).lean();
//     if (!foundVolunteer) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const match = await bcrypt.compare(password, foundVolunteer.password);
//     if (!match) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const volunteerInfo = {
//       name: foundVolunteer.name,
//       email: foundVolunteer.email,
//       phone: foundVolunteer.phone,
//       profileImage: foundVolunteer.profileImage,
//       idNumber: foundVolunteer.idNumber,
//       selectedVolunteerOptions: foundVolunteer.selectedVolunteerOptions,
//       selectedCities: foundVolunteer.selectedCities,
//       history: foundVolunteer.history,
//     };

//     const accessToken = jwt.sign(volunteerInfo, process.env.ACCESS_TOKEN_SECRET);
//     res.json({ accessToken, user: foundVolunteer });
//   } catch (error) {
//     console.error("Error logging in volunteer:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // התחברות של ארגון
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const foundOrganization = await Organization.findOne({ email }).lean();
//     if (!foundOrganization) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const match = await bcrypt.compare(password, foundOrganization.password);
//     if (!match) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const organizationInfo = {
//       name: foundOrganization.name,
//       email: foundOrganization.email,
//       phone: foundOrganization.phone,
//       profileImage: foundOrganization.profileImage,
//       organizationNumber: foundOrganization.organizationNumber,
//       history: foundOrganization.history,
//     };

//     const accessToken = jwt.sign(organizationInfo, process.env.ACCESS_TOKEN_SECRET);
//     res.json({ accessToken, organization: foundOrganization });
//   } catch (error) {
//     console.error("Error logging in organization:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = {
//   register,
//   registerV,
//   login,
//   loginV
// };



// const register = async (req, res) => {
//     const { name, email, phone, password, organizationNumber } = req.body;
//     let { profileImage } = req;

//     // אם התמונה לא הועלתה
//     if (!profileImage) {
//         return res.status(400).json({ message: 'Profile image is required' });
//     }

//     if (!name || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     const duplicate = await Organization.findOne({ name }).lean();
//     if (duplicate) {
//         return res.status(409).json({ message: "Duplicate organization name" });
//     }

//     const hashedPwd = await bcrypt.hash(password, 10);

//     // כאן, אני יוצר נתיב לתמונה שהועלתה
//     const profileImagePath = path.join('uploads', req.file.filename); // נתיב תמונה

//     const organizationObject = {
//         name,
//         email,
//         phone,
//         profileImage: profileImagePath, // נתיב התמונה נשמר בבסיס הנתונים
//         password: hashedPwd,
//         organizationNumber
//     };

//     const organization = await Organization.create(organizationObject);

//     if (organization) {
//         return res.status(201).json({ message: `New Organization ${organization.name} created` });
//     } else {
//         return res.status(400).json({ message: 'Invalid Organization received' });
//     }
// };



// const register = async (req, res) => {
//     const { name, email, phone, password, organizationNumber } = req.body;

//     if (!name || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     const duplicate = await Organization.findOne({ name }).lean();
//     if (duplicate) {
//         return res.status(409).json({ message: "Duplicate organization name" });
//     }

//     // כאן אנחנו מקבלים את הנתיב של התמונה ששמרנו
//     let profileImagePath = "";
//     if (req.file) {
//         profileImagePath = path.join("uploads", req.file.filename);
//     }

//     const hashedPwd = await bcrypt.hash(password, 10);

//     const organizationObject = {
//         name,
//         email,
//         phone,
//         profileImage: profileImagePath, // נשמר הנתיב לקובץ
//         password: hashedPwd,
//         organizationNumber
//     };

//     const organization = await Organization.create(organizationObject);

//     if (organization) {
//         return res.status(201).json({ message: `New Organization ${organization.name} created` });
//     } else {
//         return res.status(400).json({ message: 'Invalid Organization received' });
//     }
// };

const Organization = require('../models/Organization');
const Volunteer = require('../models/Volunteer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Organization registration
const fs = require('fs');
const path = require('path');


const cloudinary = require('../config/cloudinary'); // חיבור ל-Cloudinary

// const register = async (req, res) => {
//     const { name, email, phone, password, organizationNumber } = req.body;

//     if (!name || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     const duplicate = await Organization.findOne({ name }).lean();
//     if (duplicate) {
//         return res.status(409).json({ message: "Duplicate organization name" });
//     }

//     let profileImageUrl = "";
//     if (req.file) {
//         try {
//             // העלאת התמונה ל-Cloudinary
//             const result = await cloudinary.uploader.upload(req.file.path); // אם התמונה מגיעה בנתיב
//             profileImageUrl = result.secure_url; // מקבלים את ה-URL של התמונה
//         } catch (err) {
//             return res.status(500).json({ message: "Error uploading image to Cloudinary" });
//         }
//     }

//     const hashedPwd = await bcrypt.hash(password, 10);

//     const organizationObject = {
//         name,
//         email,
//         phone,
//         profileImage: profileImageUrl, // נשמור את ה-URL של התמונה ב-Cloudinary
//         password: hashedPwd,
//         organizationNumber
//     };

//     const organization = await Organization.create(organizationObject);

//     if (organization) {
//         return res.status(201).json({ message: `New Organization ${organization.name} created` });
//     } else {
//         return res.status(400).json({ message: 'Invalid Organization received' });
//     }
// };



const register = async (req, res) => {
  console.log(req.files.profileImage);

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
      // העלאת התמונה ל-Cloudinary
      const result = await cloudinary.uploader.upload(req.files.profileImage.tempFilePath, {
        folder: "organizations"
      });
      profileImageUrl = result.secure_url;
    } catch (err) {
      return res.status(500).json({ message: "שגיאה בהעלאת תמונה" });
    }
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const organizationObject = {
    name,
    email,
    phone,
    profileImage: profileImageUrl,
    password: hashedPwd,
    organizationNumber
  };
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



// Volunteer registration
const registerV = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      idNumber,
      history,
      password
    } = req.body;

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
        // העלאת התמונה ל-Cloudinary
        const result = await cloudinary.uploader.upload(req.files.profileImage.tempFilePath, {
          folder: "volunteers"
        });
        profileImageUrl = result.secure_url; // שומרים את ה-URL המלא
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

// Volunteer login
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
    // res.json({ accessToken, user: foundVolunteer });

    res.json({ accessToken: accessToken, volunteer: foundVolunteer })
  } catch (error) {
    res.status(500).json({ message: "שגיאת שרת" });
  }
};


// Organization login
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
