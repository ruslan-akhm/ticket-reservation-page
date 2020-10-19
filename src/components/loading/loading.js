import React, { useState, useContext, useEffect } from "react";
import "./loading.scss";

function Loading(props) {
  //const { chosen, setChosen, secured, setSecured } = useContext(SeatsContext);
  //const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(props.isLoading){
      document.getElementById("loading-modal").style.display="block";
    }
    else{
      document.getElementById("loading-modal").style.display="none";
    }
  },[props])

  return (
    <div id="loading-modal">
      <div id="loading-box">
        <h1>We are securing your tickets...</h1>
        <div className="loading-animation"></div>
      </div>
    </div>
  );
}

export default Loading;
