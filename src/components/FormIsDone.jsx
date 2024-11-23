import React from "react";

const FormIsDone = () => {
    return (
        <div
            className="FormIsDone"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <h1>Форма успешно заполнена!</h1>
        </div>
    );
};

export default FormIsDone;
