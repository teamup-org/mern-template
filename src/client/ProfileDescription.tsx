import React, {useRef, useState, useEffect} from "react";
import Profile from "./Profile";
import { Button, TextField, Typography } from "@mui/material";

const ProfileDescription = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [descriptionRef, setDescriptionRef] = useState('');
    const [message, setMessage] = useState('');

    const handleClick = async () => {
        try {
            setIsLoading(true);
            const reqBody = descriptionRef
            const response = await fetch(`http://localhost:3000/rewrite-ai?message=${reqBody}`,
                {
                    method: "POST"
                }
            );
            const data = await response.json();
            setIsLoading(false);
            setMessage(data.message);
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error
        }
    }

    const handleChange = (event: any) => {
        setDescriptionRef(event.target.value);
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
                onChange={handleChange}
                />
            </div>
            <div>
                <Button onClick={handleClick}> Rewrite With AI </Button>
            </div>
        </div>
        <div className="profile-output" style={{outline:'2px solid', width:'30vw', padding:'20px'}}>
            <Typography
                sx={{ wordBreak: "break-word" }}
            >
                {isLoading ? <p>loading...</p> : null}
                {message}
            </Typography>
        </div>
      </div>
    );
  }
  
  export default ProfileDescription;