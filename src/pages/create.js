import {useState} from 'react'
import {useRouter} from 'next/router'
import { parseCookies } from 'nookies'

const Create = () => {
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')
    const [mediaurl, setmediaurl] = useState('')

    const router = useRouter()

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const mediaurl = await imageupload()
            const res = await fetch(`${process.env.BASE_URL}/api/posts` , {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name,
                    description,
                    mediaurl
                })
            })
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
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                    type="text"
                    placeholder='name'
                    onChange={(e) => setname(e.target.value)}
                    />
                </div>
                <div>
                    <input 
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


export const getServerSideProps = async ctx => {
    const {token} = parseCookies(ctx)
    if(!token){
        const {res} = ctx
        res.writeHead(302,{Location: '/'})
        res.end()
    }

    return {
        props: {}
    }
}


export default Create;