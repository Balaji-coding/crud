const UserData = require('../modules/userDatas');
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserData.findOne({ email, password });
        if (user) {
            res.status(200).json({ success: 1, message: "Login successful", data: user });
        } else {
            res.status(401).json({ success: 0, message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
