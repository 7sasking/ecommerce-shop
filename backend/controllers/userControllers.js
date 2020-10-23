import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//@desc     Auth user & get Token
//@rout     Post /api/products
//@access   Public
const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    res.send({
        email,
        password,
    })
})

export {authUser}