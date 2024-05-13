import React, { useContext, useEffect, useState } from 'react';
import { useTimer } from '../../context/timercontent';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';

function TimerPage() {
    const { minutes: contextMinutes } = useTimer();
    const minutes = contextMinutes || 30;

    const [targetTime, setTargetTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const target = new Date(new Date().getTime() + parseInt(minutes) * 60000);
        setTargetTime(target);
        sessionStorage.setItem('time', target);

        const intervalId = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
            if (now >= target) {
                sessionStorage.removeItem('time');
                clearInterval(intervalId);
                handleFinishTest(); // Call handleFinishTest when timer reaches zero
            }
        }, 10);

        return () => clearInterval(intervalId);
    }, [minutes]);

    const handleFinishTest = () => {
        // Perform any necessary actions upon timer reaching zero
        sessionStorage.removeItem('time');
        navigate("/final"); // Redirect to '/timer' page upon test completion
    };

    const submitTest = (e) => {
        // Perform any necessary actions upon timer reaching zero
        sessionStorage.removeItem('time');
        navigate("/final"); // Redirect to '/timer' page upon test completion
    };


    if (!targetTime) {
        return null;
    }

    return (
        <div className='centralize'>
            <NavbarComponent />
            <main>
                <form onSubmit={(e) => submitTest(e)} id="form"> {/* Prevent default form submission */}
                    <h1>Tempo de prova</h1>
                    <h1 className="timer">{new Date(targetTime - currentTime).toISOString().substring(11, 19)}</h1>
                    <button className="default-button" id="button" disabled={currentTime >= targetTime}>
                        Finalizar prova
                    </button>
                </form>
            </main>
        </div>
    );
}

export default TimerPage;
