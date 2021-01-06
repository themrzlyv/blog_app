import {useState} from 'react'
import {useRouter} from 'next/router'

const Register = () => {

    const router = useRouter()

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await fetch(`${process.env.BASE_URL}/api/register` , {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            const resData = res.json()
            console.log(resData)
            router.push(`/`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                value={name}
                type="text" 
                onChange={(e)=> setname(e.target.value)} 
                name='name' 
                placeholder='name'/>
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
                    register now
                </button>
            </form>
        </div>
    )
}


export default Register;