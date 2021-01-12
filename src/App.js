import { useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ContextProvider } from './context/Context';
import New from './components/New';
/* import Tree from './Tree'; */

function App() {

  /* const Person={
    name:"",
    gender:"",
    imageURL:"",
    children:[]
  } */

  function makeNode(person) {
    let a = (
      <li key={person.name} className={person.gender.toLowerCase()}>
        <a href="/">
          <img src={"./images/" + person.imageURL} className="round-img" alt="" /><br />
          {person.name}
        </a>
        {person.children.length > 0 &&
          <ul>
            {person.children.map((item) => {
              console.log(makeNode(item))
              return makeNode(item)
            })}
          </ul>}
      </li>
    );
    return a;
  }
  useEffect(() => {

  }, [])
  return (
    <Router>
      <ContextProvider>
        <Switch>
          <Route exact path="/add" render={(props)=><Form {...props}/>}/>
          <Route exact path="/new" render={(props)=><New {...props}/>}/>
          <div className="App">
            
            <div className="tree">
              <ul>
                {/* {makeNode({
            name:"Aman",
            gender:"Male",
            imageURL:"aman passport.jpg",
            children:[{
              name:"AJ",
              gender:"Male",
              imageURL:"aman passport.jpg",
              children:[]
            },
            {
              name:"Anjali",
              gender:"Male",
              imageURL:"aman passport.jpg",
              children:[]
            }
          ]
          })} */}
              </ul>
            </div>
            <Form />
          </div>
        </Switch>
      </ContextProvider>
    </Router>
  );
}

export default App;
