import User from "../models/UserSchema";

export const updateUser = async(req,res) => {
    const id = req.params.id

    try{
        const updateUser = await User.findByIdAndUpdate(id, {$set: req.body}, {new:true})
        res.status(200).json({success:true, message: 'User successfully updated', data: updateUser});

    }catch(e){
        res.status(500).json({success:false, message: 'Failed to update'});
        console.log(e);
    }
}

export const deleteUser = async(req,res) => {
    const id = req.params.id

    try{
        const deleteUser = await User.findByIdAndDelete(id)
        res.status(200).json({success:true, message: 'Successfully deleted'});

    }catch(e){
        res.status(500).json({success:false, message: 'Failed to delete'});
        console.log(e);
    }
}

export const getSingleUser = async(req,res) => {
    const id = req.params.id

    try{
        const user = await User.findById(id)
        res.status(200).json({success:true, message: 'User found', data: user});

    }catch(e){
        res.status(404).json({success:false, message: 'User not found'});
        console.log(e);
    }
}

export const getAllUsers = async(req,res) => {

    try{
        const users = await User.findById({})
        res.status(200).json({success:true, message: 'Users found', data: users});

    }catch(e){
        res.status(404).json({success:false, message: 'Not found'});
        console.log(e);
    }
}