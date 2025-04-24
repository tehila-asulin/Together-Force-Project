const Organization = require('../models/Organization');
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const login = async (req,res)=>{ 
    const { name, password } = req.body
    if (!name || !password) {
        return res.status(400).json({message:'All fields are required'})}
        const foundOrganization = await Organization.findOne({name}).lean()
        if (!foundOrganization || !foundOrganization.active) {
            return res.status(401).json({ message: 'Unauthorized' })
            }
    const match = await bcrypt.compare(password, foundOrganization.password)
    if(!match)return res.status(401).json({message:'Unauthorized' })
    res.send("Logged In")
    const organizationInfo= {_id:foundOrganization._id,name:foundOrganization.name,
        email:foundOrganization.email,
        phone:foundOrganization.phone,
        history:foundOrganization.history,
        image:foundOrganization.image,
    }
    const accessToken= jwt.sign(organizationInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})


}

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
module.exports = {login, register}

// const Organization = require('../models/Organization');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const login = async (req, res) => {
//     const { name, password } = req.body;

//     if (!name || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     const foundOrganization = await Organization.findOne({ name }).lean();
//     if (!foundOrganization || !foundOrganization.active) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const match = await bcrypt.compare(password, foundOrganization.password);
//     if (!match) return res.status(401).json({ message: 'Unauthorized' });

//     const organizationInfo = {
//         _id: foundOrganization._id,
//         name: foundOrganization.name,
//         email: foundOrganization.email,
//         phone: foundOrganization.phone,
//         history: foundOrganization.history,
//         image: foundOrganization.image
//     };

//     const accessToken = jwt.sign(organizationInfo, process.env.ACCESS_TOKEN_SECRET);
//     res.json({ accessToken });
// };

// const register = async (req, res) => {
//     const { name, email, phone, history, image, password, AssociationNumber } = req.body;

//     if (!name || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     const duplicate = await Organization.findOne({ name }).lean();
//     if (duplicate) {
//         return res.status(409).json({ message: "Duplicate organization name" });
//     }

//     const hashedPwd = await bcrypt.hash(password, 10);

//     const orgObject = {
//         name,
//         email,
//         phone,
//         history,
//         image,
//         password: hashedPwd,
//         AssociationNumber
//     };

//     const organization = await Organization.create(orgObject);

//     if (organization) {
//         return res.status(201).json({ message: `New organization ${organization.name} created` });
//     } else {
//         return res.status(400).json({ message: 'Invalid organization received' });
//     }
// };

// module.exports = { login, register };
