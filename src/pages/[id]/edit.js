import {useState} from 'react'
import {parseCookies} from 'nookies'
import {useRouter} from 'next/router'
import { useToasts } from 'react-toast-notifications'
import styles from '../../styles/Edit.module.scss'

const Edit = ({post}) => {
    const {addToast} = useToasts();
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
            addToast('Post changed successfully' , {appearance: 'success'})
            router.push(`/`)
        } catch (error) {
            addToast('Connection problem' , {appearance: 'error'})
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
                <div className="col-lg-10 mx-auto my-3 d-flex p-0 justify-content-center">
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <input
                            type="text"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            />
                        </div>
                        <div>
                            <textarea
                            value={description}
                            rows="8" 
                            cols="60"
                            type="text"
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
                            Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
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