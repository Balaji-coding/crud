const UserData = require('../modules/userDatas');

exports.EditData = async (req, res) => {
  try {
    console.log("Request Body:", req.body); 
    const { _id,age,gender, name, email, password } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const updatedUser = await UserData.findByIdAndUpdate(
      _id,
      { name,age,gender, email, password },
      { new: true } // returns updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: 1,
      message: "Data updated successfully",
      data: updatedUser
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
