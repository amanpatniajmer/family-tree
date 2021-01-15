import { useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ContextProvider } from './context/Context';
import New from './components/New';
import Tree from './components/Tree';
import Register from './components/Register';
import ErrorBoundary from "./components/ErrorBoundary";
/* import Tree from './Tree'; */

function App() {

  /* const Person={
    name:"",
    gender:"",
    partner:"",
    imageURL:"",
    children:[]
  } */

  
  useEffect(() => {

  }, [])
  return (
    <ErrorBoundary>
    <Router>
      <ContextProvider>
        <Switch>
          <Route exact path="/" render={(props)=><New {...props}/>}/>
          <Route exact path="/add" render={(props)=><Form {...props}/>}/>
          <Route exact path="/tree" render={(props)=><Tree {...props}/>}/>
          <Route exact path="/register" render={(props)=><Register {...props}/>}/>
          <Route exact path="/" render={(props)=><Tree {...props}/>}/>
          <div className="App">
          </div>
        </Switch>
      </ContextProvider>
    </Router>
    </ErrorBoundary>
  );
}

export default App;
