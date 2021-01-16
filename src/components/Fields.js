import React, { useEffect, useState } from 'react'
import { database, storage } from '../Firebase'
import { useHistory } from 'react-router-dom'

const Fields = ({ person, setperson, refe, location }) => {
    const history = useHistory();
    const [status, setstatus] = useState(0)
    const [submit, setsubmit] = useState(true)
    const [root, setroot] = useState(false)
    const { name, gender, noc, partner, children, imageURL } = person;
    useEffect(() => {
        var count=0;
        for(var i=0;i<refe.length;++i){
            if(refe[i]==='/') count++
        }
        if(count===2) setroot(true)
        else setroot(false)
        if (!person.children) {
            setperson((prev) => ({ ...prev, children: [] }))
        }
        //eslint-disable-next-line
    }, [])
    const [loading, setLoading] = useState(false);

    const add = (e) => {
        e.preventDefault();
        setLoading(true);
        database().ref(refe).update(person).then((result) => {
            console.log("Success", result)
            setLoading(false)
            /* history.push(`/add?path=${location}`) */
            history.goBack()
        })
    }
    return (<>
        <form className="form-group" onSubmit={(e) => { add(e) }}>
            <h1 className="text-primary">{" "}
                <span className="text-dark">Add {root && "Root"}</span> Data{" "}
            </h1>
            <label>Name</label>
            <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => {
                    const val = e.target.value;
                    setperson((prev) => ({ ...prev, name: val }))
                }}
                placeholder="Enter name"
                autoComplete="off"
                required
            />
            {root && <>
                <label>Family Name</label>
                <input
                    type="text"
                    name="family"
                    value={person.family || ''}
                    onChange={(e) => {
                        const val = e.target.value;
                        setperson((prev) => ({ ...prev, family: val }))
                    }}
                    placeholder="Patni"
                    autoComplete="off"
                    required
                />
                <label>Address</label>
                <input
                    type="text"
                    name="address"
                    value={person.address || ''}
                    onChange={(e) => {
                        const val = e.target.value;
                        setperson((prev) => ({ ...prev, address: val }))
                    }}
                    placeholder="30-A, Sarvodaya Colony, Ajmer"
                    autoComplete="off"
                    required
                />
                <label>Mobile</label>
                <input
                    type="number"
                    name="mobile"
                    min="1000000000"
                    max="9999999999"
                    value={person.mobile || ''}
                    onChange={(e) => {
                        const val = e.target.value;
                        setperson((prev) => ({ ...prev, mobile: val }))
                    }}
                    placeholder="9876543210"
                    autoComplete="off"
                    required
                />
            </>}
            <label>Gender</label>
            <select name="gender" value={gender}
                onChange={(e) => {
                    const val = e.target.value;
                    setperson((prev) => ({ ...prev, gender: val }))
                }}
                required={true}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <label>Passport/close-up pic</label>
            <br />

            {imageURL ?
                <>
                    <img src={imageURL} className="round-img logo" alt="l" /><br />
                    <button type="button" className="btn" onClick={() => setperson((prev) => ({ ...prev, imageURL: '' }))}>Change Picture</button></>
                : <input type="file" name="imageURL" accept="image/*"
                    onChange={(e) => {
                        const val = e.target.files[0];
                        setsubmit(false)
                        var task = storage().ref(refe).put(val)
                        task.on('state_changed', (snapshot) => {
                            setstatus(snapshot.bytesTransferred * 100 / snapshot.totalBytes)
                        }, (err) => {
                            if (err) console.error(err)
                            else {

                            }
                        })
                        task.then((snapshot) => {
                            snapshot.ref.getDownloadURL().then((result) => {
                                console.log(result)
                                setperson((prev) => ({ ...prev, imageURL: result }))
                                setsubmit(true)
                            })
                        })
                    }}
                />}
            {imageURL === '' &&
                status > 0 && <progress value={status} max="100" style={{ width: "100%" }} />}
            <br />
            <label>Partner Name</label>
            <input
                type="text"
                name="partner"
                value={partner}
                onChange={(e) => {
                    const val = e.target.value;
                    setperson((prev) => ({ ...prev, partner: val }))
                }}
                placeholder="Enter name"
                autoComplete="off"
            />
            {gender === "Male" && <>
                <label>Number of children</label>
                <input
                    type="number"
                    name="noc"
                    value={noc}
                    onChange={(e) => {
                        const val = e.target.value;
                        setperson((prev) => ({ ...prev, noc: val }))
                        let arr = []
                        for (let i = 0; i < val - children.length; ++i) {
                            arr.push({ name: '', gender: 'Male', partner: '', imageURL: '', noc: 0, children: [] })
                        }
                        setperson((prev) => ({
                            ...prev, children: [...children, ...arr
                            ]
                        }))
                    }}
                    placeholder="Enter number"
                    autoComplete="off"
                    required
                />
            </>}
            <button type="submit" disabled={!submit} className="btn btn-block btn-success">
                {loading ? <i className="fa fa-spinner fa-spin" /> : "Submit"}
            </button>
        </form>
    </>
    )
}

export default Fields
