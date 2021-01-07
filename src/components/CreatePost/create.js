import {useState} from 'react'
import {useRouter} from 'next/router'
import { parseCookies } from 'nookies'
import {useToasts} from 'react-toast-notifications'
import styles from './Create.module.scss'



const Create = () => {
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')
    const [mediaurl, setmediaurl] = useState('')

    const router = useRouter()
    const {addToast} = useToasts()

    const handleSubmit = async e => {
        e.preventDefault()
        if(name.length < 5 || description.length < 10 || name.length > 35){
            return addToast('Some inputs fill wrongly' , {appearance:'warning'})
        }


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
            addToast('Post created successfully', {appearance:'success'})
            router.push(`/`)
        } catch (error) {
            addToast('Connection problem', {appearance:'error'})
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
            <div className="row">
                <div className="col-lg-12 mx-auto my-2 d-flex p-0 justify-content-center">
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <input
                            type="text"
                            placeholder='Title must be max 35 character'
                            onChange={(e) => setname(e.target.value)}
                            />
                        </div>
                        <div>
                            <textarea
                            rows="8" 
                            cols="60"
                            type="text"
                            placeholder='Description must be min 20 character'
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
                            <button type='submit'>
                            <i className="fas fa-pencil-alt"></i>
                            Create post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
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