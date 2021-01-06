import GeneralConsumer from '../components/Context/Context'
import Link from 'next/link'
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'


const Home = ({posts}) => {
    const cookieuser = parseCookies()
    const user = cookieuser.user ? JSON.parse(cookieuser.user) : ''
    return (
        <GeneralConsumer>
            {
                value => {
                    return (
                        <div className='container'>
                            <div className="row">
                                <div className="col-lg-12">
                                    {
                                        user ? 
                                        <>
                                            <h4>{user.name}</h4>
                                            <button onClick={()=> {
                                                cookie.remove('token')
                                                cookie.remove('user')
                                            }}>Logout</button>
                                        </>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 d-flex align-items-center justify-content-between">
                                    {
                                        posts ? 
                                        posts.map(post => (
                                            <Link key={post._id} href={`/post/[id]`} as={`/post/${post._id}`}>
                                                <div>
                                                    <div>
                                                        <img style={{maxWidth:'250px' , width:'250px' , minWidth:'250px'}} src={post.mediaurl}/>
                                                    </div>
                                                    {post.name}
                                                    {post.description}
                                                </div>
                                            </Link>
                                        ))
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        </GeneralConsumer>
    )
}


export async function getStaticProps() {
    const res = await fetch(`${process.env.BASE_URL}/api/posts`)
    const posts = await res.json()
    return {
        props: {
            posts
        }
    }
}


export default Home;


