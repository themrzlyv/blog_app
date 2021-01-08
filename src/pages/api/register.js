import User from '../../models/User'
import ConnectDb from '../../helpers/ConnectDb'
import bcrypt from 'bcrypt'


ConnectDb();

export default async (req,res) => {
    const {method} = req
    switch (method) {
        case "POST":
            await registerUser(req,res)
            break;
        case "PUT":
            await updateUser(req,res)
            break;
    }
}


const registerUser =  async (req,res) => {
    const {email,name,password} = req.body
    try {
        if(!email || !name || !password){
            res.status(422).json({error: 'Please fill all inputs'})
        }
        const user = await User.findOne({email})
        if(user){
            res.status(422).json({error: 'This email is already registered'})
        }
        const hashedpassword = await bcrypt.hash(password,12)
        const newUser = await new User({
            name,
            email,
            password:hashedpassword
        }).save()
        res.status(200).json({message: 'successful registation'})
    } catch (error) {
        console.log(error)
    }
}


const updateUser =  async (req,res) => {
    const {email,name,role,password} = req.body
    try {
        if(!email || !name || !password){
            res.status(422).json({error: 'Please fill all inputs'})
        }

        const hashedpassword = await bcrypt.hash(password,12)
        const newUser = await User.findOneAndUpdate({role:role} ,{
            name,
            email,
            password:hashedpassword
        }, {new: true})
        res.status(200).json(newUser)
    } catch (error) {
        console.log(error)
    }
}


