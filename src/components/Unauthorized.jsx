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
                background: "url('/background-1080.png')",
                padding: '20px',
            }}
        >
            <h1>Доступ запрещен</h1>
            <h3>Вы не авторизованы для просмотра этой страницы.</h3>
        </div>
    );
};

export default Unauthorized;
