import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";

import Fields from './Fields';
import Links from './Links';
import queryString from "query-string";
import { Context } from "../context/Context";
import { database, Firebase } from '../Firebase'
import Structure from './Structure';

const Form = ({ location }) => {
    const history = useHistory()
    //eslint-disable-next-line
    const [loading, setloading] = useContext(Context);

    const [structure, setstructure] = useState(false)
    const [allrecords, setallrecords] = useState()
    const [path, setpath] = useState()
    const [partialpath, setpartialpath] = useState()
    const [mode, setmode] = useState()
    const [ref, setref] = useState()
    const [completepath, setcompletepath] = useState()
    const [person, setperson] = useState()

    useEffect(() => {
        let query = queryString.parse(location.search)
        setcompletepath(query.path)
        setmode(query.mode)
        if (!query.path) {
            alert('Bad Parameters')
            return;
        }
        let temp = query.path.split('/');
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if(user.emailVerified){
                    temp[0] = user.email.replace(/\./g, '');
                    setpath(temp)
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
        //eslint-disable-next-line
    }, [history.location])

    useEffect(() => {
        if (path) {
            database().ref(`users/${path[0]}`).once('value', (result) => {
                setallrecords(result.val())
                if (!result.val()) {
                    database().ref('users/' + path[0]).update(
                        { name: '', gender: 'Male', partner: '', noc: 0, imageURL: '', children: null },
                        (error) => {
                            if (error) {
                                setloading(false)
                                console.error(error)
                            }
                            else {
                                setloading(false)
                                localStorage.setItem('new', true)
                                console.log('Done')
                                history.push(`/add?path=0`)
                            }
                        })

                    return;
                }
            })
            let refTemp = 'users/' + path[0] + '/';
            for (let i = 1; i < path.length; ++i) {
                refTemp += 'children/' + path[i] + '/'
            }
            setref(refTemp)
            database().ref(refTemp).once('value', (result) => {
                setperson(result.val())
            })
        }
        //eslint-disable-next-line
    }, [path])

    useEffect(() => {
        if (allrecords) {
            setpartialpath(path.map((item, index) => {
                return 'allrecords' + (path.slice(1, index + 1).length > 0 ? ".children[" + path.slice(1, index + 1).join("].children[") + "]" : "")
            }))
            setloading(false)
        }
        //eslint-disable-next-line
    }, [allrecords])

    return (
        <div>
            <div className="form-container">
                {path &&
                <span>
                <a href={`/add?path=0`}>
                    <span className="text-light">{
                        (partialpath && allrecords.name

                        ) || path[0]}
                    </span>
                </a> &nbsp;<i className="fa fa-chevron-right" /></span>
                }
                {path && path.length > 1 && path.map((item, index) => {
                    if(index>0)
                    return <span key={path.slice(1, index + 1).join('/')} >
                        <a href={`/add?path=0/${path.slice(1, index + 1).join('/')}`}>
                            <span className="text-light">{
                                //eslint-disable-next-line
                                (partialpath && eval(partialpath[index] + ".name")

                                ) || Number(item) + 1}</span>
                        </a>
                            &nbsp;<i className="fa fa-chevron-right" /></span>
                    else return null
                })
                }
                <br />
                <br />
                <div style={{ borderBottom: "2px solid black", paddingBottom: "10px", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                    <button className="btn btn-white" onClick={() => { structure ? setstructure(false) : history.goBack() }}><i className="fa fa-arrow-left" style={{ margin: "0" }} /> Go Back</button>
                    {!structure && <button className="btn btn-dark" onClick={() => { setstructure(true) }}><i className="fa fa-list" /> Structure</button>}
                    <button className="btn btn-white" onClick={() => { Firebase.auth().signOut(); history.push('/'); }}> Logout <i className="fa fa-home" style={{ margin: "0" }} /></button>
                </div>
                {(person && !structure) && (!person.children || mode === "edit" ?
                    <Fields refe={ref} location={completepath} person={person} setperson={setperson} />
                    :
                    <Links refe={ref} person={person} setperson={setperson} location={completepath} />
                )
                }
                {
                    structure &&
                    <Structure allrecords={allrecords} />
                }
            </div>
        </div>
    )
}

export default Form;
