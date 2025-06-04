
const Volunteer = require('../models/Volunteer');
const cloudinary = require('../config/cloudinary');
const jwt = require('jsonwebtoken');
module.exports = (io) => {
  return {
    addVolunteer: async (req, res) => {
      try {
        const { name, email, phone, selectedVolunteerOptions, selectedCities, idNumber, password } = req.body;

        const profileImage = req.file ? req.file.path : '';

        const newVolunteer = new Volunteer({
          name,
          email,
          phone,
          selectedVolunteerOptions,
          selectedCities,
          idNumber,
          password,
          profileImage,
        });

        await newVolunteer.save();

        res.status(201).json(newVolunteer);
      } catch (err) {
        res.status(500).json({ message: 'שגיאת שרת', error: err.message });
      }
    },


    deleteVolunteer: async (req, res) => {
      const { id } = req.params
      console.log(id);
      try {
        const deletedVolunteer = await Volunteer.findOneAndDelete({ _id: id });
        if (!deletedVolunteer) {
          return res.status(404).json({ message: 'המתנדב לא נמצא' });
        }
        res.json({ message: 'המתנדב נמחק בהצלחה' });
      } catch (error) {
        console.error('נכשל במחיקת המתנדב:', error);
        res.status(500).json({ message: 'נכשל במחיקת המתנדב' });
      }

    },

    updateVolunteer: async (req, res) => {
      const { id } = req.params;
      const { name, phone } = req.body;

      let selectedVolunteerOptions = [];
      let selectedCities = [];
      if (req.body.selectedVolunteerOptions) {
        selectedVolunteerOptions = JSON.parse(req.body.selectedVolunteerOptions);
      }
      if (req.body.selectedCities) {
        selectedCities = JSON.parse(req.body.selectedCities);
      }

      let profileImageUrl;

      try {
        if (req.files && req.files.profileImage) {
          try {
            const result = await cloudinary.uploader.upload(req.files.profileImage.tempFilePath, {
              folder: "volunteers"
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
        if (selectedVolunteerOptions.length > 0) updateFields.selectedVolunteerOptions = selectedVolunteerOptions;
        if (selectedCities.length > 0) updateFields.selectedCities = selectedCities;
        if (profileImageUrl) updateFields.profileImage = profileImageUrl;

        const updatedVolunteer = await Volunteer.findOneAndUpdate(
          { _id: id },
          updateFields,
          { new: true }
        );

        if (!updatedVolunteer) {
          return res.status(404).json({ message: 'המתנדב לא נמצא' });
        }

        const volunteerInfo = {
          _id: updatedVolunteer._id,
          name: updatedVolunteer.name,
          email: updatedVolunteer.email,
          phone: updatedVolunteer.phone,
          profileImage: updatedVolunteer.profileImage,
          idNumber: updatedVolunteer.idNumber,
          selectedVolunteerOptions: updatedVolunteer.selectedVolunteerOptions,
          selectedCities: updatedVolunteer.selectedCities,
          history: updatedVolunteer.history,
        };

        const accessToken = jwt.sign(volunteerInfo, process.env.ACCESS_TOKEN_SECRET);
       io.emit('VolunteeringRoom', volunteerInfo);
        res.json({ accessToken, volunteer: volunteerInfo });

      } catch (error) {
        console.error('נכשל בעדכון המתנדב:', error);
        res.status(500).json({ message: 'נכשל בעדכון המתנדב' });
      }
    },


    getAllVolunteers: async (req, res) => {
      try {
        const volunteers = await Volunteer.find();
        res.json(volunteers);
      } catch (error) {
        console.error('נכשל בקבלת המתנדבים:', error);
        res.status(500).json({ message: 'נכשל בקבלת המתנדבים' });
      }
    },
    getVolunteerById: async (req, res) => {
      const { id } = req.params;
      console.log(id)

      try {
        const volunteer = await Volunteer.findOne({ _id: id });
        if (!volunteer) {
          return res.status(404).json({ message: 'המתנדב לא נמצא' });
        }
        res.json(volunteer);
      } catch (error) {
        console.error('נכשל בקבלת המתנדב:', error);
        res.status(500).json({ message: 'נכשל בקבלת המתנדב' });
      }
    }
  }
}