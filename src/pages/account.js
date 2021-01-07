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
                    <h4>{user.name}</h4>
                    <h4>{user.email}</h4>
                </div>
                <div className="col-lg-6">
                    <EditAccount />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8">
                    <Create/>
                </div>
                <div className="col-lg-4">
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