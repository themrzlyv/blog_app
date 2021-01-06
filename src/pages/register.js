import {useState} from 'react'
import {useRouter} from 'next/router'
import styles from '../styles/Register.module.scss'



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
        <div className='container'>
            <div className="row">
                <div className="col-lg-8 mx-auto my-3 d-flex p-0 justify-content-center">
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <h4>
                                <i className="fas fa-user"></i>
                                Name:
                            </h4>
                            <input 
                            value={name}
                            type="text" 
                            onChange={(e)=> setname(e.target.value)} 
                            name='name' 
                            placeholder='name'/>
                        </div>
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
                            placeholder='email'/>
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
                            placeholder='password'/>
                        </div>
                        <div>
                            <button 
                            type='submit'>
                                register now
                                <i className="far fa-check-circle"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Register;