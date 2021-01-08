import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import React, { useState } from 'react';
import {useRouter} from 'next/router'
import cookie from 'js-cookie'
import {useToasts} from 'react-toast-notifications'
import styles from './EditAccount.module.scss'


const EditAccount = ({user}) => {

    const router = useRouter()

    const {addToast} = useToasts()

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const [name, setname] = useState(user.name)
    const [email, setemail] = useState(user.email)
    const [role, setrole] = useState(user.role)
    const [password, setpassword] = useState('')


    const handleSubmit = async e => {
        e.preventDefault()
        if(email.length < 10 || name.length < 1 || password.length < 4){
            return addToast(`Some inputs fill wrongly` , {appearance:'warning'})
        }

        cookie.remove('token')
        cookie.remove('user')

        try {
            const res = await fetch(`${process.env.BASE_URL}/api/register` , {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    role,
                    password
                })
            })
            const resData = await res.json()
            cookie.set('token',resData.token)
            cookie.set('user',resData.user)
            console.log(resData)
            addToast(`Your information changed successfully` , {appearance:'success'})
            router.push(`/`)
        } catch (error) {
            addToast(`Connection problem` , {appearance: 'error'})
            console.log(error)
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className={`col-lg-12 ${styles.header}`}>
                    <button type="button" className="button" onClick={() => setOpen(o => !o)}>
                        <i className="fas fa-tools"></i>
                        Edit
                    </button>
                    <Popup  open={open} closeOnDocumentClick onClose={closeModal}>
                        <div className="container">
                            <div className="row">
                                <div className={`col-lg-12 ${styles.maincontainer}`}>
                                    <button 
                                    onClick={closeModal}>
                                        <i className="fas fa-times"></i>
                                    </button>
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
                                                Save
                                                <i className="far fa-check-circle"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </div>
            </div>
        </div>
    )
}


export default EditAccount;