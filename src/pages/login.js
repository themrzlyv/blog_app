import {useState} from 'react'
import cookie from 'js-cookie'
import {useRouter} from 'next/router'
import {useToasts} from 'react-toast-notifications'

import styles from '../styles/Login.module.scss'


const Login = () => {

    const router = useRouter();

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const { addToast } = useToasts()

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await fetch(`${process.env.BASE_URL}/api/login` , {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const resData = await res.json()
            cookie.set('token',resData.token)
            cookie.set('user',resData.user)
            router.push(`/`)
        } catch (error) {
            addToast('wrong entry',{appearance:'error'})
            router.push('/login')
        }
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-8 mx-auto my-3 d-flex p-0 justify-content-center">
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <h4>
                                <i className="far fa-envelope-open"></i>
                                Email:
                            </h4>
                            <input 
                            value={email}
                            type="text" 
                            onChange={(e)=> setemail(e.target.value)} 
                            name='email' 
                            placeholder='Email must be min 10 character'/>
                        </div>
                        <div>
                            <h4>
                                <i className="fas fa-passport"></i>
                                Password:
                            </h4>
                            <input
                            value={password} 
                            type="password" 
                            onChange={(e)=> setpassword(e.target.value)} 
                            name='password' 
                            placeholder='Password must be min 4'/>
                        </div>
                        <div>
                            <button
                            onClick={() => addToast(`Welcome ${email}` , {appearance: 'success'})} 
                            type='submit'>
                                Login
                                <i className="far fa-check-circle"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Login;