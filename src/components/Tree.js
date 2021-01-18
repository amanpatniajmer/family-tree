import React, { useEffect, useState, useContext } from 'react'
import queryString from "query-string";
import { database } from "../Firebase";
import { Context } from "../context/Context";

const Tree = ({ location }) => {
    const colors = ["ee6055", "60d394", "aaf683", "ffd97d", "ff9b85"]
    const [data, setdata] = useState()


    //eslint-disable-next-line
    const [loading, setloading] = useContext(Context)
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

    const save = () => {
        window.print()
        /* const doc = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [document.body.scrollWidth, document.body.scrollHeight]
        });
        html2canvas(document.getElementsByClassName('tree')[0],{
            allowTaint: true,
            useCORS: true
        }).then((canvas)=>{
            console.log(canvas)
        }) */

        /* doc.html(document.body.innerHTML, {
            callback: function (pdf) {
                pdf.save("two-by-four.pdf")
            }
        }); */
    }
    function makeNode(person, depth) {
        let a = (
            <li key={person.name} className={person.gender.toLowerCase()}>
                <a href="/" style={{ backgroundColor: `#${colors[depth % 5]}` }}>
                    {person.imageURL && <img src={person.imageURL} className="logo round-img" alt="" />}
                    <br />
                    {person.name + (person.partner && " - " + person.partner)}
                </a>
                {person.children && person.children.length > 0 &&
                    <ul>
                        {person.children.map((item) => {
                            /* console.log(makeNode(item)) */
                            if (item.name)
                                return makeNode(item, depth + 1)
                            else return null;
                        })}
                    </ul>}
            </li>
        );
        return a;
    }

    return (
        <div className="tree">
            <button className="btn" id="printBtn" onClick={save}>SAVE</button>
            <div style={{ borderBottom: "5px solid green" }}>
                <h2 className="text-success">"{data && data.family}" <a href={`/tree?path=0`}>Family Tree </a><i className="fa fa-tree text-success" style={{ fontSize: "3rem" }} /></h2>
                <center><h4>Contact: {data && data.address}
                    <br />
                    <i className="fa fa-phone" />: {data && data.mobile}
                </h4></center>
            </div>
            <ul>
                {data && makeNode(data, 0/* {
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
