import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const RoleSelectionPage = () => {
    const [redirect, setRedirect] = useState(false);
    const { getAccessTokenSilently, user } = useAuth0();

    const handleRoleSelect = async (role: string) => {
        if (!user || !user.email) {
            console.error('User is not available.');
            return;
        }
        console.log(`Role selected: ${role}`);
        
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch('http://localhost:3000/api/users/update/role', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    email: user.email,
                    role: role,
                }),
            });
        
            if (response.ok) {
                console.log('User role updated successfully');
                console.log(user.email);
                setRedirect(true);
            } else {
                console.error('Error updating user role:', response.status);
            }
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    if (redirect) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div style={{ padding: "20px", textAlign: "center", marginTop: "100px" }}>
            <h2>Select Your Role</h2>
            <button onClick={() => handleRoleSelect('student')}>Student</button>
            <button onClick={() => handleRoleSelect('teacher')}>Teacher</button>
            <button onClick={() => handleRoleSelect('parent')}>Parent</button>
        </div>
    );
};

export default RoleSelectionPage;
