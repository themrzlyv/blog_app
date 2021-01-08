import {useRouter} from 'next/router'
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'
import EditAccount from '../components/EditAccount/EditAccount'
import Register from '../components/Register/register'
import Create from '../components/CreatePost/create'

import styles from '../styles/Account.module.scss'

const Account = () => {
    const cookieuser = parseCookies()
    const user = cookieuser.user ? JSON.parse(cookieuser.user) : ''
    return (
        <div className={`container my-4 ${styles.container}`}>
            <div className="row my-4">
                <div className={`col-lg-6 ${styles.header}`}>
                    <div className='col-lg-6'>
                        <h4>
                        <i className="fas fa-user-shield"></i>
                        {user.name}
                        </h4>
                    </div>
                    <div className='col-lg-4'>
                        <EditAccount user ={user}/>
                    </div>
                    <h4>
                    <i className="far fa-envelope"></i>
                    {user.email}
                    </h4>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-7">
                    <Create/>
                </div>
                <div className="col-lg-5">
                    <Register />
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

export default Account;