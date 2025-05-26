// const Volunteer = require('../models/Volunteer');
// const cloudinary = require('cloudinary').v2;
// module.exports = (io) => {
//   return {
//     addVolunteer: async (req, res) => {
//       try {
//         const { name, email, phone, selectedVolunteerOptions, selectedCities, idNumber, password } = req.body;

//         const profileImage = req.file ? req.file.path : '';

//         const newVolunteer = new Volunteer({
//           name,
//           email,
//           phone,
//           selectedVolunteerOptions,
//           selectedCities,
//           idNumber,
//           password,
//           profileImage,
//         });

//         await newVolunteer.save();

//         res.status(201).json(newVolunteer);
//       } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//       }
//     },


//     deleteVolunteer: async (req, res) => {
//       const { id } = req.params
//       console.log(id);
//       try {
//         const deletedVolunteer = await Volunteer.findOneAndDelete({ _id: id });
//         if (!deletedVolunteer) {
//           return res.status(404).json({ message: 'Volunteer not found' });
//         }
//         res.json({ message: 'Volunteer deleted successfully' });
//       } catch (error) {
//         console.error('Failed to delete Volunteer:', error);
//         res.status(500).json({ message: 'Failed to delete Volunteer' });
//       }

//     },

//     updateVolunteer: async (req, res) => {
//       const { id } = req.params;
//       const {
//         name,
//         email,
//         phone,
//         password
//       } = req.body;

//       const selectedVolunteerOptions = JSON.parse(req.body.selectedVolunteerOptions);
//       const selectedCities = JSON.parse(req.body.selectedCities);
//       let profileImageUrl;

//       try {

//         if (req.files && req.files.profileImage) {
//           try {
//             const result = await cloudinary.uploader.upload(req.files.profileImage.tempFilePath, {
//               folder: "volunteers"
//             });
//             profileImageUrl = result.secure_url;
//           } catch (err) {
//             console.error("Cloudinary upload error:", err);
//             return res.status(500).json({ message: "Error uploading image to Cloudinary" });
//           }
//         }

//         const updateFields = {
//           name,
//           email,
//           phone,
//           selectedCities,
//           selectedVolunteerOptions,
//         };

//         if (profileImageUrl) {
//           updateFields.profileImage = profileImageUrl;
//         }

//         if (password && password.trim() !== "") {
//           updateFields.password = password;
//         }

//         const updatedVolunteer = await Volunteer.findOneAndUpdate(
//           { _id: id },
//           updateFields,
//           { new: true }
//         );

//         if (!updatedVolunteer) {
//           return res.status(404).json({ message: 'Volunteer not found' });
//         }
//         io.emit('VolunteeringRoom', updatedVolunteer);
//         res.json(updatedVolunteer);
//       } catch (error) {
//         console.error('Failed to update Volunteer:', error);
//         res.status(500).json({ message: 'Failed to update Volunteer' });
//       }
//     },

//     getAllVolunteers : async (req, res) => {
//       try {
//         const volunteers = await Volunteer.find();
//         res.json(volunteers);
//       } catch (error) {
//         console.error('Failed to get volunteers:', error);
//         res.status(500).json({ message: 'Failed to get volunteers' });
//       }
//     },
//     getVolunteerById : async (req, res) => {
//       const { id } = req.params;
//       console.log(id)

//       try {
//         const volunteer = await Volunteer.findOne({ _id: id });
//         if (!volunteer) {
//           return res.status(404).json({ message: 'Volunteer not found' });
//         }
//         res.json(volunteer);
//       } catch (error) {
//         console.error('Failed to get Volunteer:', error);
//         res.status(500).json({ message: 'Failed to get Volunteer' });
//       }
//     }
//   }
// }
const Volunteer = require('../models/Volunteer');
const cloudinary = require('cloudinary').v2;
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
      const {
        name,
        email,
        phone,
        password
      } = req.body;

      const selectedVolunteerOptions = JSON.parse(req.body.selectedVolunteerOptions);
      const selectedCities = JSON.parse(req.body.selectedCities);
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

        const updateFields = {
          name,
          email,
          phone,
          selectedCities,
          selectedVolunteerOptions,
        };

        if (profileImageUrl) {
          updateFields.profileImage = profileImageUrl;
        }

        if (password && password.trim() !== "") {
          updateFields.password = password;
        }

        const updatedVolunteer = await Volunteer.findOneAndUpdate(
          { _id: id },
          updateFields,
          { new: true }
        );

        if (!updatedVolunteer) {
          return res.status(404).json({ message: 'המתנדב לא נמצא' });
        }
        io.emit('VolunteeringRoom', updatedVolunteer);
        res.json(updatedVolunteer);
      } catch (error) {
        console.error('נכשל בעדכון המתנדב:', error);
        res.status(500).json({ message: 'נכשל בעדכון המתנדב' });
      }
    },

    getAllVolunteers : async (req, res) => {
      try {
        const volunteers = await Volunteer.find();
        res.json(volunteers);
      } catch (error) {
        console.error('נכשל בקבלת המתנדבים:', error);
        res.status(500).json({ message: 'נכשל בקבלת המתנדבים' });
      }
    },
    getVolunteerById : async (req, res) => {
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