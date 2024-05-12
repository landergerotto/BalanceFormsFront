// TimerContext.js
import React, { createContext, useState, useContext } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [minutes, setMinutes] = useState('');

    return (
        <TimerContext.Provider value={{ minutes, setMinutes }}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => useContext(TimerContext);
