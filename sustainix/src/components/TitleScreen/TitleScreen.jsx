/* import React from 'react'
import { useNavigate } from 'react-router-dom' */

import './TitleScreen.css'
/* import trophy from "../../assets/tro.svg"
import codeslash from "../../assets/cod.svg" */

const TitleScreen = () => {
  /* const navigate=useNavigate() */
  /* const leaderboardclick=()=>{
    navigate("/Leaderboard")
  } */
  return (
    <div className='title-box'>
        <div className="title"><p>Sustainix</p></div>
        <div className="title"><p>EcoQuest</p></div>
        <div className="title"><p>SeekCycle</p></div>
    </div>
  )
}

export default TitleScreen