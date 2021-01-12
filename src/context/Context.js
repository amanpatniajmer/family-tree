import React, {useState, createContext} from 'react';

export const Context=createContext();
export const ContextProvider= props =>{
    const [loading,setloading]=useState(true);

    return <Context.Provider value={[loading,setloading]}>
        {loading && 
        <div>
        <div className="loader">
        </div>
        </div>
        }
        {props.children}
        </Context.Provider>
}