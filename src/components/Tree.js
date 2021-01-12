import React, { useEffect, useState,useContext } from 'react'
import queryString from "query-string";
import { database } from "../Firebase";
import { Context } from "../context/Context";

const Tree = ({ location }) => {
    const [data, setdata] = useState()
    //eslint-disable-next-line
    const [loading,setloading]=useContext(Context)
    useEffect(() => {
        let query = queryString.parse(location.search)
        if (!query.path) {
            alert('Bad Parameters')
            return;
        }
        else {
            console.log(query.path)
            database().ref('users/' + query.path).once('value', (result) => {
                setdata(result.val())
                if (!result.val()) {
                    alert('Bad Parameters given')
                    return;
                }
                setloading(false);
                console.log(result.val())
            })
        }
        //eslint-disable-next-line
    }, [])
    function makeNode(person) {
        let a = (
            <li key={person.name} className={person.gender.toLowerCase()}>
                <a href="/">
                    {person.imageURL && <img src={person.imageURL} className="logo round-img" alt="" />}
                    <br />
                    {person.name + (person.partner && " - "+person.partner)}
                </a>
                {person.children && person.children.length > 0 &&
                    <ul>
                        {person.children.map((item) => {
                            /* console.log(makeNode(item)) */
                            if(item.name)
                            return makeNode(item)
                            else return null;
                        })}
                    </ul>}
            </li>
        );
        return a;
    }

    return (
        <div className="tree">
            <ul>
                {data && makeNode(data/* {
                    name: "Aman",
                    gender: "Male",
                    imageURL: "aman passport.jpg",
                    children: [{
                        name: "AJ",
                        gender: "Male",
                        imageURL: "aman passport.jpg",
                        children: []
                    },
                    {
                        name: "Anjali",
                        gender: "Male",
                        imageURL: "aman passport.jpg",
                        children: []
                    }
                    ]
                } */)}
            </ul>
        </div>
    )
}

export default Tree
