import React, { useEffect, useState } from 'react'
import Fields from './Fields';
import { Link } from 'react-router-dom'

const Child2 = ({ person, setperson }) => {
    const { name, gender, partner, noc, children } = person;

    const [child, setchild] = useState([]);
    const [confirm, setconfirm] = useState(false)
    useEffect(() => {
        console.log(person)
        let arr = []
        for (let i = 0; i < noc; ++i) {
            arr.push(i);
        }
        setchild(arr);
        //eslint-disable-next-line
    }, [])
    const addChilds = () => {
        setconfirm(true);
        let temp = person;
        for (let i = 0; i < person.noc; ++i) {
            temp.children.push({ name: '', gender: 'Male', partner: '', noc: 0, children: [] })
        }

        setperson(temp);
        /* setperson((prev)=>({...prev,name: '', gender: 'Male', partner: '', noc:0, children: []})) */
    }
    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Link to=''><span>Name: {name}</span></Link>
                <span>Gender: {gender}</span>
                <span>Partner: {partner}</span>
                <span>No of Children: {noc}</span>
            </div>
            {!confirm ?
                <div className="form-container">
                    {
                        child.map((i) => {
                            return <Fields key={i} person={person.children[i]} setperson={setperson} />
                        })
                    }
                    <button type="button" className="btn" onClick={() => addChilds()}>{"Confirm "}<span><i className="fa fa-plus-circle" style={{ margin: "0", padding: "0" }} /></span></button>
                </div>
                :
                <Child2 person={person} setperson={setperson} />
            }
        </div>
    )
}

export default Child2
