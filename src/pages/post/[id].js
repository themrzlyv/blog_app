import Link from 'next/link'
import {parseCookies} from 'nookies'
import {useRouter} from 'next/router'

const Post = ({post}) => {
    const router = useRouter();
    const cookie = parseCookies()
    const user = cookie.user ? JSON.parse(cookie.user) : ''

    


    const handleDelete = async () => {
        try {
            const res = await fetch(`${process.env.BASE_URL}/api/post/${post._id}` , {
                method: "DELETE",
            })
            await res.json()
            router.push(`/`)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <h2>
                {post.name}
            </h2>
            <img src={post.mediaurl} />
            <p>
                {post.description}
            </p>
            {
                user ? 
                <>
                    <button onClick={handleDelete}>delete post</button>
                    <Link href={`/${post._id}/edit`}><a>Edit</a></Link>
                </>
                :
                null
            }
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


export default Post;