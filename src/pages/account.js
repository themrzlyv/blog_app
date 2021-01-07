import {useRouter} from 'next/router'
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'

const Account = () => {
    const cookieuser = parseCookies()
    const user = cookieuser.user ? JSON.parse(cookieuser.user) : ''
    return (
        <div className='container bg-danger'>
            <div className="row">
                
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