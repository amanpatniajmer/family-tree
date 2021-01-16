import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Context } from "../context/Context";
import { Firebase } from '../Firebase'

const Instructions = () => {
    const history = useHistory()
    //eslint-disable-next-line
    const [loading, setloading] = useContext(Context);

    const [email, setemail] = useState()

    useEffect(() => {
        
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if(user.emailVerified){
                    setemail(user.email.replace(/\./g, ''))
                }
                else {
                    alert('Please verify your email address. Check your email account')
                    Firebase.auth().signOut();
                    history.push('/')
                    return;
                }
                
            }
            else {
                
            }
        })
        setloading(false)
        //eslint-disable-next-line
    }, [])


    return (
        <div>
            <div className="form-container">
                {email &&
                <span>
                <a href={`/add?path=0`}>
                    <span className="text-light">{
                        email}
                    </span>
                </a> &nbsp;<i className="fa fa-chevron-right" /></span>
                }
                <br />
                <br />
                <div style={{ borderBottom: "2px solid black", paddingBottom: "10px", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                    
                    
                    <button className="btn btn-white" onClick={() => { Firebase.auth().signOut(); history.push('/'); }}> Logout <i className="fa fa-home" style={{ margin: "0" }} /></button>
                </div>
                <h2 className="alert-dark">Instructions</h2>
                <br/>
                <ol>
                    <li>Don`t write surnames anywhere except Family name field.</li>
                    <li>Collect photos of all family members in one folder for easy uploading.</li>
                    <li>Photos should be clear and close-up.</li>
                    <li>Married couples may upload their pic with their spouse.</li>
                    <li>Only one permanent address may be given for contacting the family.</li>
                    <li>For ensuring all particulars please see the Structure on the top of the page.</li>
                    <li>Data is to be filled in chronological order. (GrandFather &gt; Father &gt; Son ...)</li>
                </ol>
                <div className="text-right">
                <button className="btn btn-danger" onClick={() => { history.push('/add?path=0') }}> Next <i className="fa fa-arrow-right" style={{ margin: "0" }} /></button>
                </div>
            </div>
        </div>
    )
}

export default Instructions;
