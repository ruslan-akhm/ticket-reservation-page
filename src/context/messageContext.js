import React, {createContext, useState} from 'react';

export const MessageContext = createContext();

export const MessageProvider=({ children })=>{
    const [message,setMessage] = useState("HELLO");
//     const [isAuthenticated,setIsAuthenticated] = useState(false);
//     const [isLoaded,setIsLoaded] = useState(false);
    
    // useEffect(()=>{
    //     AuthService.isAuthenticated().then(data=>{
    //         setUser(data.user);
    //         setIsAuthenticated(data.isAuthenticated);
    //         setIsLoaded(true);
    //     })
    // },[]);
    
    //console.log(isLoaded);
    return( 
        
        <div>
            <MessageContext.Provider value={{message}}>
                { children }
            </MessageContext.Provider>
        </div>
    )
}