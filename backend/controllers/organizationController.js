const Organization = require('../models/Organization');
const cloudinary = require('../config/cloudinary');
const jwt = require('jsonwebtoken');
module.exports = (io) => {
  return {

    addOrganization: async (req, res) => {
      const organization = await Organization.create(req.body);
      res.json(organization)
    },

    deleteOrganization: async (req, res) => {
      const { id } = req.params
      console.log(id);
      try {
        const deleteOrganization = await Organization.findOneAndDelete({ _id: id });
        if (!deleteOrganization) {
          return res.status(404).json({ message: 'הארגון לא נמצא' });
        }
        res.json({ message: 'הארגון נמחק בהצלחה' });
      } catch (error) {
        console.error('נכשל במחיקת הארגון:', error);
        res.status(500).json({ message: 'נכשל במחיקת הארגון' });
      }

    },

    updateOrganization: async (req, res) => {
      const { id } = req.params;
      const { name, phone } = req.body;
      let profileImageUrl;

      try {
    
        if (req.files && req.files.profileImage) {
          try {
            const result = await cloudinary.uploader.upload(req.files.profileImage.tempFilePath, {
              folder: "organizations"
            });
            profileImageUrl = result.secure_url;
          } catch (err) {
            console.error("שגיאה בהעלאת תמונה ל-Cloudinary:", err);
            return res.status(500).json({ message: "שגיאה בהעלאת התמונה ל-Cloudinary" });
          }
        }

        const updateFields = {};
        if (name) updateFields.name = name;
        if (phone) updateFields.phone = phone;
        if (profileImageUrl) updateFields.profileImage = profileImageUrl;

        
        const updatedOrganization = await Organization.findOneAndUpdate(
          { _id: id },
          updateFields,
          { new: true }
        );

        if (!updatedOrganization) {
          return res.status(404).json({ message: "הארגון לא נמצא" });
        }

        const organizationInfo = {
          _id: updatedOrganization._id,
          name: updatedOrganization.name,
          email: updatedOrganization.email,
          phone: updatedOrganization.phone,
          profileImage: updatedOrganization.profileImage,
          organizationNumber: updatedOrganization.organizationNumber,
          history: updatedOrganization.history,
        };

        const accessToken = jwt.sign(organizationInfo, process.env.ACCESS_TOKEN_SECRET);
        io.emit('VolunteeringRoom', organizationInfo);
       
        res.json({ accessToken, organization: organizationInfo });

      } catch (error) {
        console.error("נכשל בעדכון הארגון:", error);
        res.status(500).json({ message: "נכשל בעדכון הארגון" });
      }
    },



    getAllOrganizations: async (req, res) => {
      try {
        const organizations = await Organization.find();
        res.json(organizations);
      } catch (error) {
        console.error('נכשל בקבלת הארגונים:', error);
        res.status(500).json({ message: 'נכשל בקבלת הארגונים' });
      }
    },

    getOrganizationByNumber: async (req, res) => {
      const { id } = req.params;
      console.log(id)

      try {
        const organization = await Organization.findOne({ organizationNumber: id });
        if (!organization) {
          return res.status(404).json({ message: 'הארגון לא נמצא' });
        }
        res.json(organization);
      } catch (error) {
        console.error('נכשל בקבלת הארגון:', error);
        res.status(500).json({ message: 'נכשל בקבלת הארגון' });
      }
    }
  }
}