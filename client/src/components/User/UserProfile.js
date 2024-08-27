import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [editing, setEditing] = useState(false);
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(response.data);
                setBio(response.data.bio);
                setAvatar(response.data.avatar);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSave = async () => {
        try {
            await axios.put('/api/users/profile', { bio, avatar }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div>
            <h1>{user.name}'s Profile</h1>
            {editing ? (
                <div>
                    <input
                        type="text"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                    <input
                        type="text"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    <p>Bio: {user.bio}</p>
                    <p>Avatar: <img src={user.avatar} alt="Avatar" /></p>
                    <button onClick={() => setEditing(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
