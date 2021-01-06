import {useState} from 'react'
import cookie from 'js-cookie'
import {useRouter} from 'next/router'



const Login = () => {

    const router = useRouter();

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

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
            
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                value={email}
                type="text" 
                onChange={(e)=> setemail(e.target.value)} 
                name='email' 
                placeholder='email'/>
                <input 
                value={password}
                type="password" 
                onChange={(e)=> setpassword(e.target.value)} 
                name='password' 
                placeholder='password'/>
                <button 
                type='submit'>
                    Login now
                </button>
            </form>
        </div>
    )
}


export default Login;