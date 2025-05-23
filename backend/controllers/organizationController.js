const Organization = require('../models/Organization');
const cloudinary = require('cloudinary').v2;

exports.addOrganization = async (req, res) => {
    const organization = await Organization.create(req.body);
    res.json(organization)
};

exports.deleteOrganization = async (req, res) => {
  const  {id} = req.params
  console.log(id);
    try {
      const deleteOrganization = await Organization.findOneAndDelete({ _id: id });
      if (!deleteOrganization) {
        return res.status(404).json({ message: 'Organization not found' });
      }
      res.json({ message: 'Organization deleted successfully' });
    } catch (error) {
      console.error('Failed to delete Organization:', error);
      res.status(500).json({ message: 'Failed to delete Organization' });
    }
   
};

exports.updateOrganization = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, history, password, organizationNumber } = req.body;
  let profileImageUrl;

  try {
    if (req.files && req.files.profileImage) {
      try {
        const result = await cloudinary.uploader.upload(req.files.profileImage.tempFilePath, {
          folder: "volunteers"
        });
        profileImageUrl = result.secure_url;
      } catch (err) {
        console.error("Cloudinary upload error:", err);
        return res.status(500).json({ message: "Error uploading image to Cloudinary" });
      }
    }

    const updateFields = { name, email, phone, history, organizationNumber };
    if (profileImageUrl) {
      updateFields.profileImage = profileImageUrl;
    }
    if (password && password.trim() !== "") {
      updateFields.password = password;
    }

    const updatedOrganization = await Organization.findOneAndUpdate(
      { _id: id },
      updateFields,
      { new: true }
    );

    if (!updatedOrganization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.json(updatedOrganization);
  } catch (error) {
    console.error("Failed to update Organization:", error);
    res.status(500).json({ message: "Failed to update Organization" });
  }
};


exports.getAllOrganizations = async (req, res) => {
    try {
      const organizations = await Organization.find();
      res.json(organizations);
    } catch (error) {
      console.error('Failed to get organizations:', error);
      res.status(500).json({ message: 'Failed to get organizations' });
    }
  };
  // exports.getOrganizationById = async (req, res) => {
  //   const { id } = req.params;
  //   console.log(id)
  
  //   try {
  //     const organization = await Organization.findOne({ _id: id });
  //     if (!organization) {
  //       return res.status(404).json({ message: 'Organization not found' });
  //     }
  //     res.json(organization);
  //   } catch (error) {
  //     console.error('Failed to get organization:', error);
  //     res.status(500).json({ message: 'Failed to get organization' });
  //   }
  // };
  exports.getOrganizationByNumber = async (req, res) => {
    const { id } = req.params;
    console.log(id)
  
    try {
      const organization = await Organization.findOne({ organizationNumber: id });
      if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
      }
      res.json(organization);
    } catch (error) {
      console.error('Failed to get organization:', error);
      res.status(500).json({ message: 'Failed to get organization' });
    }
  };
  
  