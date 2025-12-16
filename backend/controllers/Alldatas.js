
const UserData = require('../modules/userDatas');

exports.Alldatas = async(req, res) => {
  try {
    const datas = await UserData.find();
    res.status(200).json(datas);         
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

