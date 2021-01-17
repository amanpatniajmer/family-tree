import React from 'react'

const Structure = ({allrecords}) => {
    /* const colors1=["#ffadad","#ffd6a5","#fdffb6","#9BF6FF","#FFC6FF","#CAFFBF","#A0C4FF","#BDB2FF","#FFFFFC"]
    const colors2=["ef476f","ffd166","06d6a0","118ab2","073b4c"]
    const colors3=["ff99c8","fcf6bd","d0f4de","a9def9","e4c1f9"];
    const colors4=["70d6ff","ff70a6","ff9770","ffd670","e9ff70"]; */
    const colors=["ee6055","60d394","aaf683","ffd97d","ff9b85"]
    function makeNode(person,index,path,depth) {
        let a = (
            <li key={person.name} style={{position:"relative"}}>
                <a href={`/add?path=${path}`} className="btn btn-white" style={{backgroundColor:`#${colors[depth%5]}`}}>
                    {/* {index+"-"} */}{person.name + (person.partner && " - "+person.partner)}
                    {person.imageURL && <img src={person.imageURL} className="logo round-img" alt="" style={{position:"absolute", right:"12px",top:'0px',width:"43px",height:"43px"}}/>}
                </a>
                {person.children && person.children.length > 0 &&
                    <ul>
                        {person.children.map((item,index) => {
                            /* console.log(makeNode(item)) */
                            if(item.name)
                            return makeNode(item,index+1,`${path}/${index}`,depth+1)
                            else return null;
                        })}
                    </ul>}
            </li>
        );
        return a;
    }
    return (
        <div className="structure">
            <div>
            <h2 className="text-success" style={{borderBottom:"5px solid green"}}>"{allrecords && allrecords.family}" <a href={`/tree?path=0`}>Family Tree </a><i className="fa fa-tree text-success" style={{fontSize:"3rem"}} /></h2>
            <center><h4>Contact: {allrecords && allrecords.address}
            <br/>
            <i className="fa fa-phone"/>: {allrecords && allrecords.mobile}
            </h4></center>
            </div>
            {
                allrecords && <ul>{makeNode(allrecords,1,0,0)}</ul>
            }
        </div>
    )
}

export default Structure
