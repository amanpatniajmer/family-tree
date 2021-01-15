import React, { useEffect, useContext,useState } from 'react'
import {Firebase} from '../Firebase';
import { Link, useHistory } from "react-router-dom";
import { Context } from "../context/Context";

const Register = () => {
    const history=useHistory()

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [name, setname] = useState("")
    const [result, setresult] = useState("")
    //eslint-disable-next-line
    const [loading, setloading] = useContext(Context)

    const register = (e) => {
        e.preventDefault()
        Firebase.auth().createUserWithEmailAndPassword(email,password)
            .then((result) => {
                const { user } = result;
                console.log(user)
                if(user) 
                Firebase.auth().currentUser.sendEmailVerification({
                    url:'http://family-tree-47404.web.app/add?path=0',
                }).then((result) => {
                    history.push('/add?path=0')
                    console.log(result)
                })
            })
            .catch((e)=>setresult(e.toString()))
    }

    useEffect(() => {
        setloading(false)
        //eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="container nav-space">
                <div className="container" style={{ borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.4)", color: "black" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                        <div style={{ paddingBottom: "5px" }}>
                        <span className="text-danger">{result}</span>
                            <form className="form-container" onSubmit={register} style={{ margin: "0" }}>

                                <b><p className="medium text-center" style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                    Registration</p></b>

                                <div className="form-group">
                                    <label>Name:</label>
                                    <input type="text" className="small" name="name" autoComplete="off" value={name} onChange={(e) => setname(e.target.value)}></input>
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="email" className="small" name="email" autoComplete="off" value={email} onChange={(e) => setemail(e.target.value)}></input>
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input type="password" className="small" name="password" value={password} onChange={(e) => setpassword(e.target.value)}></input>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </div>
                            </form>
                            <Link to='/' className="small" style={{ color: "blue", marginLeft: "5%", textDecorationLine: "underline" }}>Already have an account? Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
