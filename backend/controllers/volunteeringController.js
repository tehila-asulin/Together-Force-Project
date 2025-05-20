const Volunteering = require('../models/Volunteering');

exports.getFilteredVolunteering = async (req, res) => {
  const { organizationNumber, selectedCities = [], selectedOptions = [] } = req.body;

  console.log("selectedCities:", selectedCities);
 console.log("selectedOptions:", selectedOptions);

  
  try {
    let filter = {};

    if (organizationNumber) {
      filter.byOrganizationNumber = organizationNumber;
    } else {
      if (selectedCities.length > 0) {
        filter.origin = { $in: selectedCities };
      }
      if (selectedOptions.length > 0) {
        filter.title = { $in: selectedOptions };
      }
    }

    const filtered = await Volunteering.find(filter);
    res.json(filtered);
  } catch (error) {
    console.error('Filtering failed:', error);
    res.status(500).json({ message: 'Filtering failed' });
  }
};


exports.addVolunteering = async (req, res) => {
    const volunteering = await Volunteering.create(req.body);
    res.json(volunteering)
};

exports.deleteVolunteeing = async (req, res) => {
  const  {id} = req.params
  console.log(id);
    try {
      const deletedVolunteering = await Volunteering.findOneAndDelete({ _id: id });
      if (!deletedVolunteering) {
        return res.status(404).json({ message: 'Volunteering not found' });
      }
      res.json({ message: 'Volunteering deleted successfully' });
    } catch (error) {
      console.error('Failed to delete Volunteering:', error);
      res.status(500).json({ message: 'Failed to delete Volunteering' });
    }
   
};

exports.updateVolunteering = async (req, res) => {
  const {id} = req.params;
  const { title,description, skills,origin,phone,status,feedback,idMaker} = req.body;

  try {
    const updatedVolunteering = await Volunteering.findOneAndUpdate(
      {_id: id }, 
      {title,description, skills,origin,phone,feedback,idMaker,status},
      { new: true }
    );

    if (!updatedVolunteering) {
      return res.status(404).json({ message: 'Volunteering not found' });
    }

    res.json(updatedVolunteering);
  } catch (error) {
    console.error('Failed to update Volunteering:', error);
    res.status(500).json({ message: 'Failed to update Volunteering' });
  }
};
exports.getAllVolunteering = async (req, res) => {
    try {
      const volunteering = await Volunteering.find();
      res.json(volunteering);
    } catch (error) {
      console.error('Failed to get volunteering:', error);
      res.status(500).json({ message: 'Failed to get volunteering' });
    }
  };

  exports.getVolunteeringById = async (req, res) => {
    const { id } = req.params;
    console.log(id)
  
    try {
      const volunteering = await Volunteering.findOne({ _id: id });
      if (!volunteering) {
        return res.status(404).json({ message: 'Volunteering not found' });
      }
      res.json(volunteering);
    } catch (error) {
      console.error('Failed to get Volunteering:', error);
      res.status(500).json({ message: 'Failed to get Volunteering' });
    }
  };