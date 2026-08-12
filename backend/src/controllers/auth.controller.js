import userModel from "../models/user.model.js";
import config from "../config/config.js";
import zod from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

const registerUser = async (req, res) => {
    try {
        const {username, password, firstName, lastName} = req.body;
        const { success } = signupBody.safeParse(req.body);

        if(!success){
            return res.status(411).json({
                message: "Incorrect inputs"
            })
        }
        
        const existingUser = await userModel.findOne({
            username: req.body.username
        });

        if(existingUser) {
            return res.status(411).json({
                message: "Email already taken/Incorrect inputs"
            })
        }

        const cryptedPass = await bcrypt.hash(password, saltRounds);

        const user = await userModel.create({
            username: username,
            password: cryptedPass,
            firstName: firstName,
            lastName: lastName
        });

        const userId = user._id;

        const token = jwt.sign({
            userId
        }, config.JWT_SECRET);

        res.json({message: "user created successfully", token: token})
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message})
    }
}

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const {success} = signinBody.safeParse(req.body);
        
        if(!success){
            return res.status(411).json({message: "Incorrect inputs"})
        }

        const user = await userModel.findOne({
            username: username
        })

        if(!user){
            return res.status(411).json({message: "Invalid credentials"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(411).json({message: "Invalid credentials"})
        }

        const token = jwt.sign({
            userId: user._id
        }, config.JWT_SECRET)

        res.json({message: "Login successful", token: token})

    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message})
    }
    
}

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

const updateUser = async (req, res) => {
    try{
        const { success } = updateBody.safeParse(req.body);

        if(!success){
            return res.status(411).json({message: "Incorrect Input"})
        }

        const updateData = { ...req.body };
        
        if(req.body.password){
            updateData.password = await bcrypt.hash(req.body.password, saltRounds);
        }

        await userModel.updateOne({_id: req.userId}, updateData);

        return res.json({message: "Updated successfully"});

    } catch(error){
        res.status(500).json({message: "Error while updating credentials", error: error.message})
    }
}

export { registerUser, loginUser, updateUser };