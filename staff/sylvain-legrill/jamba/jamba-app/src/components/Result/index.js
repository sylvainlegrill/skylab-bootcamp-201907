import React from 'react'

import { withRouter } from "react-router-dom"
//import logic from "../../logic"

function Result({history, architects}) {


  function handleArchitectDetail(id) {
    
    history.push(`/architects/${id}`)
  }

  function handleArrangeMeeting() {
    
    history.push(`/meeting`)
  }


  // const [architects, setArchitects] = useState([])

  // useEffect(() => {
  //   async function retrieveAllArchitects() {
  //     const res = await logic.retrieveUsersByRole("architect")
  //     setArchitects(res)
  //   }
  //   retrieveAllArchitects()
  // }, [])

//   useEffect(() => {
//     async function searchArchitects() {
//       const res = await logic.searchArchitectsByCityAndSpecialty()
//       setArchitects(res)
//     }
//     searchArchitects()
//   }, [])

  return (
    <>     
        <ul className="architect__ul">
          {architects.length ? (
            architects.map(architect => (
              <li className="architects" key={architect._id}>
                {/* <img className="user__img" src={architect.profileImg}></img> */}
                <div className="architect__container">
                  <p className="architect__name">{architect.name}</p>
                  <p className="architect__specialty">{architect.specialty}</p>
                  <p className="architect__city">{architect.city}</p>
                  <button className="architect__detail" 
                  title=""
                  href="#"
                  onClick={() => {handleArchitectDetail(architect._id)}}>see profile</button>
                  <button className="architect__meeting" 
                  title="meeting"
                  href="#"
                  onClick={() => {handleArrangeMeeting()}}>arrange meeting</button>

                </div>
              </li>
            ))
          ) : (
            <p className="user__none">No architects found</p>
          )}
        </ul>
     
    </>
  )
}

export default withRouter(Result)
