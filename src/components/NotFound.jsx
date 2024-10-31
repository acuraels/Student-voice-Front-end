import React from 'react';

const NotFound = () => {
    return (
        <div
            className="notfound"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            <h1>ERROR 404</h1>
            <h3>Эта страница не существует.</h3>
        </div>
    );
};

export default NotFound;
