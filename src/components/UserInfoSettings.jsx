import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const UserInfoSettings = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        axiosInstance.get('api/user-info/')
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    if (!userData) {
        return <p>Загрузка...</p>;
    }

    return (
        <h2 className="teacher-settings__section-title">{userData.surname} {userData.first_name} {userData.last_name}</h2>
    );
};

export default UserInfoSettings;
