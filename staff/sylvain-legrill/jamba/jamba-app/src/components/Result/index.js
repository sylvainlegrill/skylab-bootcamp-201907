import React, { useState, useEffect } from "react";

import { withRouter } from "react-router-dom";
import logic from "../../logic";

function Result({architects}) {


  // const [architects, setArchitects] = useState([]);

  // useEffect(() => {
  //   async function retrieveAllArchitects() {
  //     const res = await logic.retrieveUsersByRole("architect");
  //     setArchitects(res);
  //   }
  //   retrieveAllArchitects();
  // }, []);

//   useEffect(() => {
//     async function searchArchitects() {
//       const res = await logic.searchArchitectsByCityAndSpecialty();
//       setArchitects(res);
//     }
//     searchArchitects();
//   }, []);

  return (
    <>     
        <ul className="architect__ul">
          {architects.length ? (
            architects.map(architect => (
              <li className="architects" key={architect._id}>
                {/* <img className="user__img" src={architect.profileImg}></img> */}
                <div className="user__container">
                  <p className="user__name">{architect.name}</p>
                  <p className="user__specialty">{architect.specialty}</p>
                  <p className="user__city">{architect.city}</p>
                </div>
              </li>
            ))
          ) : (
            <p className="user__none">No architects found</p>
          )}
        </ul>
     
    </>
  );
}

export default withRouter(Result);
