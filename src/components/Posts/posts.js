import styles from './posts.module.scss'
import Link from 'next/link'


const Posts = ({posts}) => {
    return (
        <div className='container my-2'>
            <div className="row d-flex justify-content-evenly">
                {
                    posts ?
                        posts.map(post => 
                            <div key={post._id} className="col-lg-5 p-0">
                                <div className={`${styles.cardcontainer}`}>
                                    <img src={post.mediaurl} />
                                    <div className={styles.cardbody}>
                                        <h5>{post.name}</h5>
                                        <p>{post.description}</p>
                                        <Link href={`/post/[id]`} as={`/post/${post._id}`}>
                                            <a>
                                                Read More
                                                <i class="far fa-hand-point-right"></i>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    :
                    null
                }
            </div>
        </div>
    )
}

export default Posts;
