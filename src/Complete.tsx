import React from 'react'
import Check from "./check.svg";

const Complete: React.FC = () => {
  return (
    <div>
      <div style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh', alignItems:'center', fontFamily: 'Rubik'}}>
        <img src={Check} style={{ width: "20rem", height: "15rem" }} />
        <p style = {{fontWeight: '700', fontSize: '25px'}}>Congratulations</p>
        <div style = {{color: 'gray'}}>You have completed all the necessary tasks</div>
      </div>
    </div>
  );
};

export default Complete;
