const UserData = require('../modules/userDatas');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserData.findOne({ email, password });
        if (!user) {
            res.status(401).json({ success: 0, message: "Invalid email" });
        }
        const isMatch = password === user.password
        if (!isMatch) {
            res.status(401).json({ success: 0, message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, "mysupersecretkey", { expiresIn: '1h' });
        res.status(200).json({ success: 1, message: "Login successful", data: user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
