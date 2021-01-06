import Post from '../../models/Post'
import ConnectDb from '../../helpers/ConnectDb'

ConnectDb();

export default async (req,res) => {
    const {method} = req

    switch (method) {
        case "GET":
            await getallPosts(req,res)
            break;
        case "POST":
            await addnewPosts(req,res)
            break;
    }
}

const getallPosts = async (req,res) => {
    const posts = await Post.find()
    try {
        res.status(200).json(posts)
    } catch (error) {
        console.log('Posts can not download')
    }
}

const addnewPosts = async(req,res) => {
    const {name,description,mediaurl} = req.body
    try {
        if(!name || !description || !mediaurl){
            return res.status(422).json({error:'PLease fill all inputs'})
        }
        const post = await new Post({
            name,
            description,
            mediaurl
        }).save()
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({error: 'internal server error'})
        console.log(error)
    }
}