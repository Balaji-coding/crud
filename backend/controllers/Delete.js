const UserData = require('../modules/userDatas');

exports.Delete = async (req, res) => {
  try {
    console.log("Request Body:", req.body); 
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const deleted = await UserData.findByIdAndDelete(
      _id 
    );

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Data deleted successfully",
      data: deleted
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
