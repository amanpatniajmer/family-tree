import React from 'react'
import {database} from '../Firebase';

const Links = ({ person, setperson, location, refe }) => {

    const deleteChild = (index) => {
        console.log(refe + "children/" + index.toString())
        if(console.log(window.confirm("Deleting this item?"))){
        database().ref(refe + "children/" + index.toString()).remove().then(() => {
            database().ref(refe).update({ noc: person.noc - 1 }).then((res) => {
                window.location.reload();
            })
        })
    }
    }

    return (
        <>
        <div>
            <div className="container alert-success" style={{position:"relative",width:"100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <h3 style={{ borderBottom: "1px solid #ececec", paddingBottom:"5px" }}>
                    <span>Parent</span>
                    <span style={{ float: "right" }}>
                        <a href={`/add?path=${location}&mode=edit`}><i className="btn fa fa-edit" style={{ margin: "0" }} /></a>
                    </span>
                </h3>
                <div  style={{position:"relative", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    {person.imageURL && 
                    <img src={person.imageURL} style={{position:"absolute",top:6,right:0}} className="round-img logo" alt="l" />
                    }
                <span>Name: {person.name}</span>
                <span>Gender: {person.gender}</span>
                <span>Partner: {person.partner}</span>
                </div>
            </div>
            <br/>
            </div>
            <div>
            {person.noc!==0 && <h3 style={{ borderBottom: "1px solid #ececec" }}>Children</h3>}
            {   person.children &&
                person.children.map((i, index) => {
                    return <div key={index} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", margin: "20px" }}>
                        <div key={`/add?path=${location}/${index}`}
                            className="alert" style={{ opacity: "1", marginTop: "0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                            onClick={(e) => {

                            }
                            }>
                            <span className="btn btn-white">{index+1}
                                <span style={{float:"right"}}>
                                    <i className="btn btn-danger fa fa-trash" onClick={() => deleteChild(index)} />
                                </span>
                            </span>
                            <span>Name: {i.name}
                                
                            </span>

                            <span>Gender: {i.gender}</span>
                            <span>Partner: {i.partner}</span>
                            {i.gender==="Male" && <span>No of Children: {i.noc}</span>}

                            <div style={{textAlign:"center"}}>
                                {(i.name && i.noc) ? <span style={{ marginLeft: "auto"}}>
                                    <a href={`/add?path=${location}/${index}`} style={{textDecoration:"none" }} className="btn btn-dark">
                                        Children <i className="fa fa-edit" /></a>
                                </span>
                                :null
                                }
                                
                                <span>
                                    <a href={`/add?path=${location}/${index}&mode=edit`} style={{textDecoration:"none" }} className="btn btn-dark">
                                        {i.name ? "Edit " : "Add "} <i className="fa fa-edit" style={{margin:"0"}}/></a>
                                </span>
                                
                            </div>
                        </div>
                    </div>
                })
            }

        </div>
        </>
    )
}

export default Links
