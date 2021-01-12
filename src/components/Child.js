import React, { useState} from 'react';


const Child = ({id, delChild}) => {
    const [keys, setKeys] = useState([]);
    
      const addChilds= () => {
        setKeys([...keys, keys.length ? keys[keys.length - 1]+1 : 0]);
      }
    return (
        <div className = "form-container">
            <div className = "form-group">
              <label>Name</label>
              <input
                type = "text"
                name = "name"
                placeholder = "Enter name"
                autoComplete = "off"
                required
              />
              <label>Gender</label>
              <select name = "gender" required = {true}>
                    <option value = "Male">Male</option>
                    <option value = "Female">Female</option>
              </select>
              <label>Partner Name</label>
              <input
                type = "text"
                name = "partner"
                placeholder = "Enter name"
                autoComplete = "off"
              />
                <button type = "button" className = "btn" onClick = {() => addChilds()}><span><i className = "fa fa-plus-circle" style = {{ marginTop:"5px" }}/></span></button>
                <i style={{fontSize:"1.5rem", marginTop:"1rem", marginLeft:"0.5rem", cursor:"pointer"}} className="fa fa-times-circle" 
              onClick={()=>delChild(id)}/>
            </div>
            {keys.map(i => {
              return <Child key = {i} id = {i} delChild = {delChild}/>
              })}
        </div>
    )
}

export default Child;
