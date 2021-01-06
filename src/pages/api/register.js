import User from '../../models/User'
import ConnectDb from '../../helpers/ConnectDb'
import bcrypt from 'bcrypt'


ConnectDb();


export default async (req,res) => {
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


