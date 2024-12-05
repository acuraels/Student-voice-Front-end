import React from "react";

const FormIsDone = () => {
    return (
        <div
            className="FormIsDone"
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
            <h1>Спасибо за отзыв! Вы улучшаете процесс обучения.</h1>
        </div>
    );
};

export default FormIsDone;
