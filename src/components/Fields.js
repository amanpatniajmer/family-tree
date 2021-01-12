import React, { useEffect, useState } from 'react'
import database from '../Firebase'
import { useHistory} from 'react-router-dom'

const Fields = ({ person, setperson,refe,location }) => {
    const history=useHistory();
    const { name, gender, noc, partner,children } = person;
    useEffect(() => {
        if(!person.children){
            setperson((prev)=>({...prev,children:[]}))
        }
        //eslint-disable-next-line
    }, [])
    const [loading, setLoading] = useState(false);

    const add = (e) => {
        e.preventDefault();
        setLoading(true);
        database().ref(refe).update(person).then((result)=>{
            console.log("Success",result)
            setLoading(false)
            history.push(`/add?path=${location}`)
        })
    }
    return (<>
        <form className="form-group" onSubmit={(e) => { add(e) }}>
            <h1 className="text-primary">{" "}
                <span className="text-dark">Add </span> Data{" "}
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
            <label>Number of children</label>
            <input
                type="number"
                name="noc"
                value={noc}
                onChange={(e) => {
                    const val = e.target.value;
                    setperson((prev) => ({ ...prev, noc: val }))
                    let arr=[]
                    for(let i=0;i<val-children.length;++i){
                        arr.push({name: '', gender: 'Male', partner: '', noc:0, children: []})
                    }
                    setperson((prev)=>({...prev, children:[...children,...arr
                    ]}))
                }}
                placeholder="Enter number"
                autoComplete="off"
                required
            />
            <button type="submit" className="btn btn-block btn-success">
                {loading ? <i className="fa fa-spinner fa-spin" /> : "Submit"}
            </button>
        </form>
        </>
    )
}

export default Fields
