const UserData = require('../modules/userDatas');

exports.addData = async (req, res) => {
  try {
    const { name,age,gender, email, password } = req.body;

    // Validate input
    if (!name || !email || !password || !age || ! gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await UserData.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new UserData({ name,age,gender, email, password });
    await newUser.save();

    res.status(201).json({
      success:1,
      msg :newUser
    }
);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};