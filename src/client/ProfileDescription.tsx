import React, {useRef, useState} from "react";
import Profile from "./Profile";
import { Button, TextField } from "@mui/material";

const ProfileDescription = () => {

    const descriptionRef = useRef({value: ''});

    const handleClick = async (e: any) => {
        console.log(descriptionRef.current.value)
    }
    return (
      <div>
        <div className="profile-box" style={{outline:'2px solid', width:'30vw', padding:'20px'}}>
            <div className="profile-header">
                <Profile />
            </div>
            <div className="profile-body">
                <h1>Profile Description:</h1>
                <TextField
                multiline
                fullWidth
                inputRef={descriptionRef}
                />
            </div>
            <div>
                <Button onClick={handleClick}> Rewrite With AI </Button>
            </div>
        </div>
      </div>
    );
  }
  
  export default ProfileDescription;