import React, { createContext, useState } from "react";

export const SeatsContext = createContext();

export const SeatsProvider = ({ children }) => {
  const [message, setMessage] = useState(""); //delete later
  const [chosen, setChosen] = useState(JSON.parse(localStorage.getItem("chosenSeats")) || []);

  return (
    <div>
      <SeatsContext.Provider value={[message, setMessage, chosen, setChosen]}>
        {children}
      </SeatsContext.Provider>
    </div>
  );
};
