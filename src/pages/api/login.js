import User from '../../models/User'
import ConnectDb from '../../helpers/ConnectDb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

ConnectDb();

export default async (req,res) => {
    const {email,password} = req.body
    try {
        if(!email || !password){
            return res.status(422).json({error: 'Please fill all inputs'})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({error: 'This user is not excist'})
        }
        const doMatch = await bcrypt.compare(password,user.password)
        if(doMatch){
            const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET,{
                expiresIn:'7d'
            })
            const {name,role,email} = user
            res.status(201).json({token,user:{name,role,email}})
        } else {
            return res.status(401).json({error: 'Email or Password is wrong'})
        }
    } catch (error) {
        return res.status(401).json({error: 'Email or Password is wrong'})
    }
}