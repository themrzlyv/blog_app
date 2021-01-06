import Post from '../../../models/Post'
import ConnectDb from '../../../helpers/ConnectDb'

ConnectDb();

export default async (req,res) => {
    switch (req.method) {
        case "GET":
            await getpostdata(req,res)
            break;
        case "PUT":
            await updatepostdata(req,res)
            break;
        case "DELETE":
            await deletepostdata(req,res)
            break;
    }
}

const getpostdata = async (req,res) => {
    const {pid} = req.query
    const post = await Post.findOne({_id:pid})
    res.status(200).json(post)
}

const updatepostdata = async (req,res) => {
    const {pid} = req.query
    const {name,description,mediaurl} = req.body
    try {
        if(!name || !description || !mediaurl){
            return res.status(422).json({error: 'Please fill all inputs'})
        }
        const post = await Post.findByIdAndUpdate({_id:pid} , {name,description,mediaurl}, {new: true})
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
    }
}

const deletepostdata = async (req,res) => {
    const {pid} = req.query
    const post = await Post.findOneAndDelete({_id:pid})
    res.status(200).json({})
}