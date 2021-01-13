import React, { useEffect, useContext, useState } from 'react'
/* import { database } from '../Firebase' */
import { useHistory } from 'react-router-dom'
import { Context } from "../context/Context";

const New = () => {
    const [id, setid] = useState('');
    /* const [phone, setphone] = useState(''); */
    //eslint-disable-next-line
    const [loading, setloading] = useContext(Context)
    useEffect(() => {
        setloading(false);
        //eslint-disable-next-line
    }, [])
    const history = useHistory();
    /* const newRecord = (e) => {
        e.preventDefault();
        setloading(true)

        database().ref('users/' + phone).update(
            { name: '', gender: 'Male', partner: '', noc: 0, imageURL: '', children: null },
            (error) => {
                if (error) {
                    setloading(false)
                    console.error(error)
                }
                else {
                    setloading(false)
                    localStorage.setItem('id', phone)
                    console.log('Done')
                    history.push(`/add?path=${localStorage.getItem('id')}`)
                }
            })

    } */

    const editRecord = (e) => {
        e.preventDefault();
        setloading(true)
        localStorage.setItem('id', id)
        console.log('Done')
        history.push(`/add?path=${localStorage.getItem('id')}`)

    }
    return (
        <div className="form-container">
            <h1>Welcome!</h1>
            <h3 className="text-success">Family <a href={`/tree?path=${id}`}>Tree </a><i className="fa fa-tree text-success"/></h3>
            <br />

            <span className="">Enter mobile number to proceed.</span>
            <br />
            <form onSubmit={editRecord}>
                <div className="form-group">
                    <label className="">Mobile No (10 digits)</label>
                    <input type="tel" pattern="[0-9]{10}" value={id} onChange={(e) => {
                        const val = e.target.value;
                        setid(val)
                    }} placeholder="Enter mobile no" />
                </div>
                <button type="submit" className="btn btn-block btn-success"> Submit <i className="fa fa-plus" /> </button>
            </form>
        </div>
    )
}

export default New
