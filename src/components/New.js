import React, { useEffect, useContext, useState } from 'react'
import { database } from '../Firebase'
import { useHistory } from 'react-router-dom'
import { Context } from "../context/Context";

const New = () => {
    const [id, setid] = useState('');
    const [phone, setphone] = useState('');
    //eslint-disable-next-line
    const [loading, setloading] = useContext(Context)
    useEffect(() => {
        setloading(false);
        //eslint-disable-next-line
    }, [])
    const history = useHistory();
    const newRecord = (e) => {
        e.preventDefault();
        setloading(true)

        database().ref('users/' + phone.replace(/\./g, '')).update(
            { name: '', gender: 'Male', partner: '', noc: 0, imageURL: '', children: null },
            (error) => {
                if (error) {
                    setloading(false)
                    console.error(error)
                }
                else {
                    setloading(false)
                    localStorage.setItem('id', phone.replace(/\./g, ''))
                    console.log('Done')
                    history.push(`/add?path=${localStorage.getItem('id')}&mode=edit`)
                }
            })

    }

    const editRecord = (e) => {
        e.preventDefault();
        setloading(true)
        localStorage.setItem('id', id.replace(/\./g, ''))
        console.log('Done')
        history.push(`/add?path=${localStorage.getItem('id')}`)

    }
    return (
        <div className="form-container">
            <h1>Welcome!</h1>
            <br />

            <span className="">Create new record to proceed</span>
            <form onSubmit={newRecord}>
            <div className="form-group">
                <label className="">Mobile No (10 digits)</label>
                <input type="tel" pattern="[0-9]{10}" value={phone} onChange={(e) => {
                    const val = e.target.value;
                    setphone(val)
                }} placeholder="Enter mobile no" />
            </div>
            <button type="submit" className="btn btn-block btn-success"> Create new <i className="fa fa-plus" /> </button>
            </form>
            <br />
            <center>OR</center>
            <br />
            <span className="">Edit an existing record</span>
            <form onSubmit={editRecord}>
                <input type="tel" pattern="[0-9]{10}" value={id} onChange={(e) => {
                    const val = e.target.value;
                    setid(val)
                }} placeholder="Enter registered mobile no" />
                <button type="submit" className="btn btn-dark btn-block" style={{ marginRight: "0" }}>
                    <span className="optional">Edit </span> <i className="fa fa-edit" style={{ marginRight: "0" }} /> </button>
            </form>
        </div>
    )
}

export default New
