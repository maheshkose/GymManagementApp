import React, { useState } from 'react'
import './LiveMembers.css';
import { AppContextHook } from '../../context/AppState';


const LiveMembers = () => {
    const {getAllLiveMembers} = AppContextHook();
    const [allLiveMembers, setAllLiveMembers] = useState(second)
  return (
    <div>LiveMembers</div>
  )
}

export default LiveMembers