import React, { createContext, useState } from "react";

export const SeatsContext = createContext();

export const SeatsProvider = ({ children }) => {
  const [message, setMessage] = useState(""); //delete later
  const [chosen, setChosen] = useState();//seats chosen an seatmap
  const [secured, setSecured] = useState();//seats secured when user prec

  return (
    <div>
      <SeatsContext.Provider value={[message, setMessage, chosen, setChosen, secured, setSecured]}>
        {children}
      </SeatsContext.Provider>
    </div>
  );
};
