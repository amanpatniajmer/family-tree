import React, { useEffect, useContext, useState } from 'react'
/* import { database } from '../Firebase' */
import { Link, useHistory } from 'react-router-dom'
import { Context } from "../context/Context";
import {Firebase} from '../Firebase';
import google2 from '../images/google-g-2015.svg'

const New = () => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [result, setresult] = useState("")

    const history = useHistory();
    const googleLogin = () => {
        Firebase.auth().signInWithPopup(new Firebase.auth.GoogleAuthProvider())
            .then((result) => {
                history.push(`/add?path=0`)
            })
            .catch((e)=>setresult(e.toString()))
    }

    const passwordLogin = (e) => {
        e.preventDefault()
        Firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                history.push(`/add?path=0`)
            })
            .catch((e)=>setresult(e.toString()))
    }
    //eslint-disable-next-line
    const [loading, setloading] = useContext(Context)
    useEffect(() => {
        Firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                history.push('/instructions')
            }
        })
        setloading(false);
        //eslint-disable-next-line
    }, [])
    
    return (
        <div className="form-container">
            <h1>Welcome!</h1>
            <h3 className="text-success">Family <a href={`/tree?path=0`}>Tree </a><i className="fa fa-tree text-success" /></h3>
            <br />

            <span className="text-danger">{result}</span>
            <br />
            <form onSubmit={(e)=>passwordLogin(e)}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="small" name="email" autoComplete="off" value={email} onChange={(e) => setemail(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="small" name="password" value={password} onChange={(e) => setpassword(e.target.value)}></input>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success btn-block">Login <i className="fa fa-plus" /></button>
                </div>
            </form>
            <br/>
            <button className="btn-block btn" onClick={googleLogin} style={{ display: "flex", justifyContent: "center" }}>
                    <img src={google2} style={{ paddingTop: "3px",margin:"0",width:"30px",height:'30px' }} width="25px" alt="google" />
                    <span style={{ lineHeight: "2.0rem", paddingLeft: "5px",fontSize:"1.1rem" }}>Google SignIn</span>
                </button>
                <Link to='/register' className="small" style={{ color: "blue", marginLeft: "5%", textDecorationLine: "underline" }}>Create a new Account</Link>
        </div>
    )
}

export default New
