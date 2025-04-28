const Organization = require('../models/Organization');
const Volunteer = require('../models/Volunteer');
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
// const login = async (req,res)=>{ 
//     const { name, password } = req.body
//     if (!name || !password) {
//         return res.status(400).json({message:'All fields are required'})}
//         const foundOrganization = await Organization.findOne({name}).lean()
//         if (!foundOrganization || !foundOrganization.active) {
//             return res.status(401).json({ message: 'Unauthorized' })
//             }
//     const match = await bcrypt.compare(password, foundOrganization.password)
//     if(!match)return res.status(401).json({message:'Unauthorized' })
//     res.send("Logged In")
//     const organizationInfo= {_id:foundOrganization._id,name:foundOrganization.name,
//         email:foundOrganization.email,
//         phone:foundOrganization.phone,
//         history:foundOrganization.history,
//         image:foundOrganization.image,
//     }
//     const accessToken= jwt.sign(organizationInfo,process.env.ACCESS_TOKEN_SECRET)
//     res.json({accessToken:accessToken})


// }

const register = async (req, res) => {
    const { organizationName, email, phone, profileImage, password, organizationNumber } = req.body;
  
    if (!organizationName || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const duplicate = await Organization.findOne({ organizationName }).lean();
    if (duplicate) {
      return res.status(409).json({ message: "Duplicate organization name" });
    }
  
    const hashedPwd = await bcrypt.hash(password, 10);
  
    const organizationObject = {
      organizationName,
      email,
      phone,
      profileImage,
      password: hashedPwd,
      organizationNumber
    };
  
    const organization = await Organization.create(organizationObject);
  
    if (organization) {
      return res.status(201).json({ message: `New Organization ${organization.organizationName} created` });
    } else {
      return res.status(400).json({ message: 'Invalid Organization received' });
    }
  };
  const registerV = async (req, res) => {
    const {
      fullName,
      email,
      phone,
      profileImage,
      idNumber,
      selectedVolunteerOptions,
      selectedCities,
      history,
      password
    } = req.body;
  
    if (!fullName || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const duplicate = await Volunteer.findOne({ email }).lean();
    if (duplicate) {
      return res.status(409).json({ message: "Duplicate Volunteer email" });
    }
  
    const hashedPwd = await bcrypt.hash(password, 10);
  
    const volunteerObject = {
      fullName,
      email,
      phone,
      profileImage,
      idNumber,
      selectedVolunteerOptions,
      selectedCities,
      history,
      password:hashedPwd
    } 
  
    const volunteer = await Volunteer.create(volunteerObject);
  
    if (volunteer) {
      return res.status(201).json({ message: `New Organization ${volunteer.fullName} created` });
    } else {
      return res.status(400).json({ message: 'Invalid Organization received' });
    }
  };


const loginV = async (req, res) => {
  const { email, password } = req.body
  
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const foundVolunteer = await Volunteer.findOne({ email }).lean()
  

  if (!foundVolunteer) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const match = await bcrypt.compare(password, foundVolunteer.password)
  

  if (!match) {
    console.log(" סיסמה לא נכונה")
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const volunteerInfo = {
    fullName: foundVolunteer.fullName,
    email: foundVolunteer.email,
    phone: foundVolunteer.phone,
    profileImage: foundVolunteer.profileImage,
    idNumber: foundVolunteer.idNumber,
    selectedVolunteerOptions: foundVolunteer.selectedVolunteerOptions,
    selectedCities: foundVolunteer.selectedCities,
    history: foundVolunteer.history,
  }

  const accessToken = jwt.sign(volunteerInfo, process.env.ACCESS_TOKEN_SECRET)
  console.log(" התחברות הצליחה!")
  res.json({ accessToken })
}

const login = async (req, res) => {
  const { email, password } = req.body
  
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const foundOrganization = await Organization.findOne({ email }).lean()
  

  if (!foundOrganization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const match = await bcrypt.compare(password, foundOrganization.password)
  

  if (!match) {
    console.log(" סיסמה לא נכונה")
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const organizationInfo = {
    organizationName: foundOrganization.organizationName,
  email:foundOrganization.email, 
  phone:foundOrganization.phone,
  history:foundOrganization.history,
  profileImage:foundOrganization.profileImage,
  password:foundOrganization.password,
  organizationNumber:foundOrganization.organizationNumber
  }

  const accessToken = jwt.sign(organizationInfo, process.env.ACCESS_TOKEN_SECRET)
  console.log(" התחברות הצליחה!")
  res.json({ accessToken })
};
module.exports = {login, register,loginV, registerV}


