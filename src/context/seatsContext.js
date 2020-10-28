import React, { createContext, useState } from "react";

export const SeatsContext = createContext();

export const SeatsProvider = ({ children }) => {
  //const [message, setMessage] = useState(""); //delete later
  const [show, setShow] = useState({
    performer:"Cirque Du Soleil",
    stage: "Sony Centre for the Performing Arts",
    date: "September 9, 2021",
    time:"6:30 PM",
    location: "Toronto, ON, CA"
  })
  const [chosen, setChosen] = useState([]);//seats chosen an seatmap
  const [secured, setSecured] = useState();//seats secured when user proceeds to cart and payment
  const [timer, setTimer] = useState(null);
  const [total, setTotal] = useState(0);//total cost to pass into secure payment form

  return (
    <div>
      <SeatsContext.Provider value={{ show, setShow, chosen, setChosen, secured, setSecured, timer, setTimer, total, setTotal}}>
        {children}
      </SeatsContext.Provider>
    </div>
  );
};
