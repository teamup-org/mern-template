import React, {useRef, useState, useEffect} from "react";
import Profile from "./Profile";
import { Button, TextField, Typography, Slider, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ProfileDescription = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [descriptionRef, setDescriptionRef] = useState('');
    const [message, setMessage] = useState('');
    const [temperature, setTemperature] = useState(0.2);
    const [tone, setTone] = useState('technical');
    const [maxWords, setMaxWords] = useState(20);
    const [advanceSettingDisplay, setAdvanceSettingDisplay] = useState(false);

    const handleClick = async () => {
        try {
            setIsLoading(true);
            const reqBody = descriptionRef
            const response = await fetch(`http://localhost:3000/rewrite-ai`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: reqBody,
                        temperature: temperature,
                        maxWords: maxWords,
                        tone: tone
                    })
                }
            );
            const data = await response.json();
            setIsLoading(false);
            setMessage(data.message);
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
            // Display error on UI
            setIsLoading(false);
            setMessage('There is an error during your request. Please try again later.');
            // Handle error
        }
    }

    const handleChange = (event: any) => {
        setDescriptionRef(event.target.value);
    }

    const handleTemperatureChange = (event: any) => {
        setTemperature(event.target.value);
        console.log("Temperature: " + temperature)
    }

    const handleMaxWordsChange = (event: any) => {
        setMaxWords(event.target.value);
        console.log("Max words: " + maxWords)
    }

    const handleToneChange = (event: any) => {
        setTone(event.target.value);
        console.log("Tone: " + tone)
    }

    const handleAdvanceSetting = () => {
        setAdvanceSettingDisplay(!advanceSettingDisplay)
    }

    // Reset variables to default when advance setting is closed
    useEffect(() => {
        if (!advanceSettingDisplay) {
            setTemperature(0.2);
            setTone('technical');
            setMaxWords(20);
        }
    }
    , [advanceSettingDisplay])


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
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                <Button onClick={handleClick}> Rewrite With AI </Button>
                <Button onClick={handleAdvanceSetting}> Advance Setting </Button>
            </div>
            <div style={{display: advanceSettingDisplay ? 'block' : 'none'}}>
                <FormControl fullWidth>
                    <InputLabel id="tone-label">Tone</InputLabel>
                    <Select
                        labelId="tone-label"
                        id="tone-select"
                        value={tone}
                        onChange={handleToneChange}
                        label="Tone"
                    >
                        <MenuItem value="formal">Formal</MenuItem>
                        <MenuItem value="casual">Casual</MenuItem>
                        <MenuItem value="technical">Technical</MenuItem>
                        <MenuItem value="academic">Academic</MenuItem>
                        <MenuItem value="creative">Creative</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{display: advanceSettingDisplay ? 'block' : 'none'}}>
                <Typography id="temperature-slider" gutterBottom>
                    Temperature: {temperature}
                </Typography>
                <Slider
                    value={temperature}
                    onChange={handleTemperatureChange}
                    aria-labelledby="temperture-slider"
                    valueLabelDisplay="auto"
                    step={0.1}
                    marks
                    min={0}
                    max={2}
                />
            </div>
            <div style={{display: advanceSettingDisplay ? 'block' : 'none'}}>
                <Typography id="wordcount-slider" gutterBottom>
                    Max Words: {maxWords}
                </Typography>
                <Slider
                    value={maxWords}
                    onChange={handleMaxWordsChange}
                    aria-labelledby="wordcount-slider"
                    valueLabelDisplay="auto"
                    step={5}
                    marks
                    min={20}
                    max={50}
                />
            </div>
        </div>
        <div className="profile-output" style={{outline:'2px solid', width:'30vw', padding:'20px'}}>
            <Typography
                sx={{ wordBreak: "break-word" }}
            >
                {isLoading ? <p>loading...</p> : message}
            </Typography>
        </div>
      </div>
    );
  }
  
  export default ProfileDescription;