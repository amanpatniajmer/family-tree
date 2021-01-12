import React, { useEffect, useState } from 'react';

let personTemp;
const Child1 = ({ person, setperson, id }) => {

  const [path, setpath] = useState()
  const [pathTemp, setpathTemp] = useState()
  useEffect(() => {
    personTemp = person;
    const address = id.split(".").map((i) => parseInt(i));
    console.log(address)
    var temp = "person"
    var temp1 = "personTemp"
    address.forEach((i) => {
      temp += ".children[" + i + "]";
      temp1 += ".children[" + i + "]";
    })
    //eslint-disable-next-line
    temp = eval(temp);
    console.log(temp);
    setpath(temp);
    //eslint-disable-next-line
    temp1 = eval(temp1);
    console.log(temp1);
    setpathTemp(temp1);
    console.log(personTemp)
    //eslint-disable-next-line
  }, [])
  const addChild = () => {
    /* pathTemp.children.push({
      name: '', gender: 'Male', partner: '', children: []
    });
    console.log(personTemp) */
    console.log(path)
    /* setperson(path.children.push({
      name: '', gender: 'Male', partner: '', children: []
    })); */
  }
return (
  <div className="form-container">
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={path && path.name}
        onChange={(e) => {
          const val = e.target.value;
          pathTemp.name = val;
          console.log(path)
          /* setperson(); */
        }}
        placeholder="Enter name"
        autoComplete="off"
        required
      />
      <label>Gender</label>
      <select name="gender"
        value={path && path.gender}
        onChange={(e) => {
          const val = e.target.value;
          pathTemp.gender = val;
          setperson(personTemp);
        }}
        required={true}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <label>Partner Name</label>
      <input
        type="text"
        name="partner"
        value={path && path.partner}
        onChange={(e) => {
          const val = e.target.value;
          pathTemp.partner = val;
          setperson(personTemp);
        }}
        placeholder="Enter name"
        autoComplete="off"
      />
      <button type="button" className="btn" onClick={() => addChild(path)}><span><i className="fa fa-plus-circle" style={{ marginTop: "5px" }} /></span></button>
      <i style={{ fontSize: "1.5rem", marginTop: "1rem", marginLeft: "0.5rem", cursor: "pointer" }} className="fa fa-times-circle"
              /* onClick={()=>delChild(id)} */ />
    </div>
    {person &&  personTemp && path && path.children.map((item, index) => {
      return <Child1 person={person} key={index} id={id + '.' + index.toString()} setperson={setperson} />
    })}
  </div>
)
}

export default Child1;
