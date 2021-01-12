import React, { useEffect, useContext, useState } from 'react'
import {database} from '../Firebase'
import { useHistory } from 'react-router-dom'
import { Context } from "../context/Context";

const New = () => {
    const [id, setid] = useState('');
    const [email, setemail] = useState('');
    //eslint-disable-next-line
    const [loading, setloading] = useContext(Context)
    useEffect(() => {
        setloading(false);
        //eslint-disable-next-line
    }, [])
    const history = useHistory();
    const newRecord = () => {
        setloading(true)
        
        database().ref('users/' + email.replace(/\./g,'')).update(
            { name: '', gender: 'Male', partner: '', noc: 0, imageURL:'',children: null },
            (error) => {
                if (error) {
                    setloading(false)
                    console.error(error)
                }
                else {
                    setloading(false)
                    localStorage.setItem('id', email.replace(/\./g,''))
                    console.log('Done')
                    history.push(`/add?path=${localStorage.getItem('id')}&mode=edit`)
                }
        })

    }

    const editRecord = () => {
        setloading(true)
        localStorage.setItem('id', id.replace(/\./g,''))
        console.log('Done')
        history.push(`/add?path=${localStorage.getItem('id')}`)

    }
    return (
        <div className="form-container">
            <h1>Welcome!</h1>
            <br />

            <span className="">Create new record to proceed</span>
            <div className="form-group">
                <label className="">Enter Email</label>
                <input type="email" value={email} onChange={(e) => {
                    const val = e.target.value;
                    setemail(val)
                }} placeholder="Enter email" />
            </div>
            <button onClick={newRecord} className="btn btn-block btn-success"> Create new <i className="fa fa-plus" /> </button>

            <br />
            <center>OR</center>
            <br />
            <span className="">Edit an existing Record by EMAIL</span>
            <div>
                <input type="email" value={id} onChange={(e) => {
                    const val = e.target.value;
                    setid(val)
                }} placeholder="Enter registered email" />
                <button onClick={editRecord} className="btn btn-dark btn-block" style={{ marginRight: "0" }}>
                    <span className="optional">Edit this</span> <i className="fa fa-edit" style={{ marginRight: "0" }} /> </button>
            </div>
        </div>
    )
}

export default New
