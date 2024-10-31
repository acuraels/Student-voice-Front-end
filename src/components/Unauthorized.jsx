import React from 'react';

const Unauthorized = () => {
    return (
        <div
            className="unauthorized"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                backgroundColor: '#f8f8f8'
            }}
        >
            <h1>Доступ запрещен</h1>
            <h3>Вы не авторизованы для просмотра этой страницы.</h3>
        </div>
    );
};

export default Unauthorized;
