import React, { createContext, useState } from "react";

export const SeatsContext = createContext();

export const SeatsProvider = ({ children }) => {
  //show is set here and this information can be passed in an API call, in case if there are many showtimes to choose from
  const [show, setShow] = useState({
    performer: "Cirque Du Soleil",
    stage: "Sony Centre for the Performing Arts",
    date: "September 9, 2021",
    time: "6:30 PM",
    location: "Toronto, ON, CA"
  });
  const [chosen, setChosen] = useState([]); //seats chosen an seat map
  const [secured, setSecured] = useState(); //seats secured when user proceeds to cart and payment
  const [timer, setTimer] = useState(null);
  const [total, setTotal] = useState(0); //total cost to pass into secure payment form

  return (
    <div>
      <SeatsContext.Provider
        value={{
          show,
          setShow,
          chosen,
          setChosen,
          secured,
          setSecured,
          timer,
          setTimer,
          total,
          setTotal
        }}
      >
        {children}
      </SeatsContext.Provider>
    </div>
  );
};
