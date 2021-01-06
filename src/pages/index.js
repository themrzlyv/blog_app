import GeneralConsumer from '../components/Context/Context'
import Link from 'next/link'
import Posts from '../components/Posts/posts'


const Home = ({posts}) => {
    return (
        <GeneralConsumer>
            {
                value => {
                    return (
                        <div className='container'>
                            <div className="row">
                                <div className="col-lg-12 border border-dark my-3">
                                    <Posts posts={posts}/>
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


