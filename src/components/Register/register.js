import {useState} from 'react'
import {useRouter} from 'next/router'
import {useToasts} from 'react-toast-notifications'
import styles from './Register.module.scss'



const Register = () => {

    const router = useRouter()
    const {addToast} = useToasts()

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        if(email.length < 10 || name.length < 1 || password.length < 4){
            return addToast(`Some inputs fill wrongly` , {appearance:'warning'})
        }


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
            addToast(`Welcome ${name} Please login now` , {appearance:'success'})
            router.push(`/`)
        } catch (error) {
            addToast(`Connection problem` , {appearance: 'error'})
            console.log(error)
        }
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12 mx-auto my-2 d-flex p-0 justify-content-center">
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
                            placeholder='Name must be min 4 character'/>
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
                            placeholder='Password must be min 4 character'/>
                        </div>
                        <div>
                            <button 
                            type='submit'>
                                Create
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