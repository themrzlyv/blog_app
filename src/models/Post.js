import mongoose  from 'mongoose'

const PostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 25
    },
    description: {
        type:String,
        required: true,
    },
    mediaurl: {
        type: String,
        required: true
    }
})

export default mongoose.models.Post || mongoose.model('Post' , PostSchema)