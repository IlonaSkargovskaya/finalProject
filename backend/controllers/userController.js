import { getAllUsers, addNewUser, getUserById } from "../models/userModel.js";

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'})
    }
}

export const getUserByIdController = async (req, res) => {
    const {userId} = req.params;
    try {
        const user = await getUserById(userId);
        if (!user) {
            res.status(404).json({msg: 'User not found'})
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const addNewUserController = async (req, res) => {
    console.log(req.body);
    const {username, email, password, role} = req.body;

    try {
        const newUser = await addNewUser({
            username,
            email,
            password,
            role
        });
        
        res.status(201).json(newUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
}