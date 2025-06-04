const Volunteering = require('../models/Volunteering');

module.exports = (io) => {
  return {
   getFilteredVolunteering: async (req, res) => {
  const {
    organizationNumber,
    selectedCities = [],
    selectedOptions = [],
    volunteerId
  } = req.body;

  try {
    const filter = {};
    if (volunteerId) {
      filter.idMaker = volunteerId; 
    } else {
      if (organizationNumber) {
        filter.byOrganizationNumber = organizationNumber;
      } else {
        filter.deadline = { $gte: new Date() };
        if (selectedCities.length > 0) {
          filter.origin = { $in: selectedCities };
        }
        if (selectedOptions.length > 0) {
          filter.title = { $in: selectedOptions };
        }
        filter.status = "PENDING";
      }
    }

    const filtered = await Volunteering.find(filter);
    res.json(filtered);
  } catch (error) {
    console.error("הסינון נכשל:", error);
    res.status(500).json({ message: "הסינון נכשל" });
  }
},

    addVolunteering: async (req, res) => {
      try {
        const volunteering = await Volunteering.create(req.body);
        io.emit('VolunteeringRoom', volunteering);

        res.json(volunteering);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'נכשל בהוספת התנדבות' });
      }
    },

    deleteVolunteering: async (req, res) => {
      const { id } = req.params;
      try {
        const deletedVolunteering = await Volunteering.findOneAndDelete({ _id: id });
        if (!deletedVolunteering) {
          return res.status(404).json({ message: 'ההתנדבות לא נמצאה' });
        }
        io.emit('VolunteeringRoom', deletedVolunteering);
        res.json({ message: 'ההתנדבות נמחקה בהצלחה' });
      } catch (error) {
        console.error('נכשל במחיקת ההתנדבות:', error);
        res.status(500).json({ message: 'נכשל במחיקת ההתנדבות' });
      }
    },

    updateVolunteering: async (req, res) => {
      const { id } = req.params;
      const { title, description, origin, phone, status, idMaker,rating } = req.body;
      
      try {
        const updatedVolunteering = await Volunteering.findOneAndUpdate(
          { _id: id },
          { title, description, origin, phone, idMaker, status ,rating},
          { new: true }
        );

        if (!updatedVolunteering) {
          return res.status(404).json({ message: 'ההתנדבות לא נמצאה' });
        }
        io.emit('VolunteeringRoom', updatedVolunteering);

        res.json(updatedVolunteering);
      } catch (error) {
        console.error('נכשל בעדכון ההתנדבות:', error);
        res.status(500).json({ message: 'נכשל בעדכון ההתנדבות' });
      }
    },

    getAllVolunteering: async (req, res) => {
      try {
        const volunteering = await Volunteering.find();
        res.json(volunteering);
      } catch (error) {
        console.error('נכשל בקבלת ההתנדבות:', error);
        res.status(500).json({ message: 'נכשל בקבלת ההתנדבות' });
      }
    },

    getVolunteeringById: async (req, res) => {
      const { id } = req.params;

      try {
        const volunteering = await Volunteering.findOne({ _id: id });
        if (!volunteering) {
          return res.status(404).json({ message: 'ההתנדבות לא נמצאה' });
        }
        res.json(volunteering);
      } catch (error) {
        console.error('נכשל בקבלת ההתנדבות:', error);
        res.status(500).json({ message: 'נכשל בקבלת ההתנדבות' });
      }
    },
  };
};