import {useRouter} from 'next/router'
import Link from 'next/link'
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'
import styles from './styles/Navi.module.scss'

const Navi = () => {

    const cookieuser = parseCookies()
    const user = cookieuser.user ? JSON.parse(cookieuser.user) : ''

    const router = useRouter()

    const isActive = (route) => {
        if(route === router.pathname){
            return "active"
        }else {
            ""
        }
    }

    return (
        <div className={styles.container}>
            <div className='container'>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className={`${styles.navbar} container-fluid`}>
                        <Link href={`/`}>
                            <a className={`${styles.logo} navbar-brand`}>THEMRZLYV</a>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="fas fa-align-right"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link href={`/`}>
                                        <a className="nav-link" aria-current="page">Home</a>
                                    </Link>
                                </li>
                                {
                                    user ? 
                                    <div>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Account
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <li>
                                                    <Link href={`/account`}>
                                                        <a className="dropdown-item">
                                                        {user.name}
                                                        <i className="fas fa-user-cog mx-2"></i>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/create`}>
                                                        <a className="dropdown-item">
                                                        New Post
                                                        <i className="far fa-edit mx-2"></i>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                    onClick={() => {
                                                        cookie.remove('token')
                                                        cookie.remove('user')
                                                        router.push('/')
                                                    }} 
                                                    className="dropdown-item">
                                                        Logout
                                                        <i className="fas fa-sign-out-alt mx-2"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </li>
                                    </div>
                                    :
                                    <li className="nav-item">
                                        <Link href={`/login`}>
                                            <a className={"nav-link " + isActive('/login')} aria-current="page">
                                            Login
                                            <i className="fas fa-sign-in-alt mx-2"></i>
                                            </a>
                                        </Link>
                                    </li>
                                }
                                
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navi;
