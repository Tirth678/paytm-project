import zod from 'zod';
import userModel from '../models/user.model.js';

const searchUser = async (req, res) => {
   try {
    const filter = req.query.filter || "";

    const users = await userModel.find({
        $or: [
            {
                firstName: {
                    $regex: filter,
                    $options: "i"  // case insensitive
                }
            },
            {
                lastName: {
                    $regex: filter,
                    $options: "i"
                }
            }
        ]
    }).select("-password");  // Exclude password field

    return res.status(200).json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
   } 
    catch (error) {
        return res.status(500).json({message: "Error searching users", error: error.message})
   }
}

export { searchUser };