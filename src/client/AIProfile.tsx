import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react"; 
import { Navigate } from "react-router-dom";
import Header from "./Header";
import ProfileDescription from "./ProfileDescription";
import { set } from "mongoose";

const AIProfile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [ listResponses, setListResponses ] = useState(false);
    const [ responses, setResponses ] = useState<any[]>([]);

    if (!isAuthenticated || !user) {
      return <Navigate to="/" />;
    }

    const userEmail: string = user.email || '';
    
    // example of retrieving AI Responses from the backend given user email
    const fetchResponses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/ai_responses?email=${user.email}`);
        const data = await response.json();
        setResponses(data);
        console.log('Successfully fetched responses:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      if (listResponses) {
        fetchResponses();
      }
    }, [listResponses, user.email]);

    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    const handleClick = () => {
      setListResponses(true);
      fetchResponses();
    };

    return (
      isAuthenticated && user && (
        <div>
          <Header />
          <div style={{padding: '80px'}}>
          <h1>AI Profile Summary Page</h1>
          <ProfileDescription
            email={userEmail}
          />
          <br />
          {listResponses?
            <div>
              <h2>AI Responses</h2>
              {responses.length > 0 ? (
                <ul>
                  {responses.map((response: any) => (
                    <li key={response._id} style={{ outline:'2px solid' }}>
                      <p><strong>Original Message:</strong> {response.originalMessage}</p>
                      <p><strong>AI Response:</strong> {response.aiResponse}</p>
                      <p><strong>Tone:</strong> {response.tone}</p>
                      <p><strong>Temperature:</strong> {response.temperature}</p>
                      <p><strong>Max Words:</strong> {response.maxWords}</p>
                      <p><strong>Created At:</strong> {new Date(response.createdAt).toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No responses found.</p>
              )}
            </div>
            :<button onClick={handleClick}> List All Previous Responses for This User </button>
          }
        </div>
        </div>
      )
    );
  }
  
  export default AIProfile;