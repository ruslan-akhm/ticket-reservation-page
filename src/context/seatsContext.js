import React, { createContext, useState } from "react";

export const SeatsContext = createContext();

export const SeatsProvider = ({ children }) => {
  const [message, setMessage] = useState(""); //delete later
  const [chosen, setChosen] = useState([]);//seats chosen an seatmap
  const [secured, setSecured] = useState();//seats secured when user proceeds to cart and payment
  const [timer, setTimer] = useState();

  return (
    <div>
      <SeatsContext.Provider value={{message, setMessage, chosen, setChosen, secured, setSecured, timer, setTimer}}>
        {children}
      </SeatsContext.Provider>
    </div>
  );
};
