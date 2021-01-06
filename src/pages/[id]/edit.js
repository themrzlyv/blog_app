import {useState} from 'react'
import {parseCookies} from 'nookies'
import {useRouter} from 'next/router'

const Edit = ({post}) => {
    const router = useRouter();
    const [name, setname] = useState(post.name)
    const [description, setdescription] = useState(post.description)
    const [mediaurl, setmediaurl] = useState('')


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const mediaurl = await imageupload()
            const res = await fetch(`${process.env.BASE_URL}/api/post/${post._id}` , {
                method: "PUT",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name,
                    description,
                    mediaurl
                })
            })
            const resData = await res.json()
            console.log(resData)
            router.push(`/`)
        } catch (error) {
            console.log(error)
        }
    }

    const imageupload = async () => {
        const data =  new FormData()
        data.append('file',mediaurl)
        data.append('upload_preset',"blogApp")
        data.append('cloud_name',"themrzlyv")
        const res = await fetch("https://api.cloudinary.com/v1_1/themrzlyv/image/upload",{
            method:"POST",
            body:data
        })
        const res2  = await res.json()
        return res2.url
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                    value={name}
                    type="text"
                    placeholder='name'
                    onChange={(e) => setname(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    value={description}
                    type="text"
                    placeholder='description'
                    onChange={(e) => setdescription(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    accept='image/*'
                    onChange={(e) => setmediaurl(e.target.files[0])}
                    type="file"/>
                    <img src={mediaurl?URL.createObjectURL(mediaurl): ""}/>
                </div>
                <div>
                    <button type='submit'>Write</button>
                </div>
            </form>
        </div>
    )
}

export const getStaticProps = async ({params:{id}}) => {

    const res = await fetch(`${process.env.BASE_URL}/api/post/${id}`)
    const post = await res.json()
    return {
        props: {post}
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { id:"5ff2f38e5f771e206897ba8b" } } 
        ],
        fallback: true
    }
}





export default Edit;