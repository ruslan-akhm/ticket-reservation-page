import React, {createContext, useState} from 'react';

export const MessageContext = createContext();

export const MessageProvider=({ children })=>{
    const [message,setMessage] = useState("");
    return( 
        
        <div>
            <MessageContext.Provider value={[message,setMessage]}>
                { children }
            </MessageContext.Provider>
        </div>
    )
}