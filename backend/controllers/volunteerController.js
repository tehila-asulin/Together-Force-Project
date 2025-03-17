const Volunteer = require('../models/Volunteer');


exports.addVolunteer = async (req, res) => {
    const volunteer = await Volunteer.create(req.body);
    res.json(volunteer)
};

exports.deleteVolunteer = async (req, res) => {
  const  {id} = req.params
  console.log(id);
    try {
      const deletedVolunteer = await Volunteer.findOneAndDelete({ _id: id });
      if (!deletedVolunteer) {
        return res.status(404).json({ message: 'Volunteer not found' });
      }
      res.json({ message: 'Volunteer deleted successfully' });
    } catch (error) {
      console.error('Failed to delete Volunteer:', error);
      res.status(500).json({ message: 'Failed to delete Volunteer' });
    }
   
};

exports.updateVolunteer = async (req, res) => {
  const {id} = req.params;
  const {name,	email,Skills,Origin,phone,history,image} = req.body;

  try {
    const updatedVolunteer = await User.findOneAndUpdate(
      {_id: id }, 
      {name,	email,Skills,Origin,phone,history,image },
      { new: true }
    );

    if (!updatedVolunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    res.json(updatedVolunteer);
  } catch (error) {
    console.error('Failed to update Volunteer:', error);
    res.status(500).json({ message: 'Failed to update Volunteer' });
  }
};
exports.getAllVolunteers = async (req, res) => {
    try {
      const volunteers = await Volunteer.find();
      res.json(volunteers);
    } catch (error) {
      console.error('Failed to get volunteers:', error);
      res.status(500).json({ message: 'Failed to get volunteers' });
    }
  };
  exports.getVolunteerById = async (req, res) => {
    const { id } = req.params;
    console.log(id)
  
    try {
      const volunteer = await Volunteer.findOne({ _id: id });
      if (!volunteer) {
        return res.status(404).json({ message: 'Volunteer not found' });
      }
      res.json(volunteer);
    } catch (error) {
      console.error('Failed to get Volunteer:', error);
      res.status(500).json({ message: 'Failed to get Volunteer' });
    }
  };