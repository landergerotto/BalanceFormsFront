import React, { useContext, useEffect, useState } from 'react';
import { useTimer } from '../../context/timercontent';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';

import ApiService from "../../services/requester/ApiService";

function TimerPage() {
    const { minutes: contextMinutes } = useTimer();
    const minutes = contextMinutes || 1;

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
            } else {
                    console.log('a')
                    sendPostRequest();
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [minutes]);

    const handleFinishTest = () => {
        // Perform any necessary actions upon timer reaching zero
        ApiService.post('test/postset', { test_value: 2 })
        .then(response => {
            setTimeout(() => {
                sessionStorage.removeItem('time');
                navigate("/final"); // Redirect to '/final' page upon test completion
            }, 2000);
        })
        .catch(error => {
            console.error('lascou vei');
            console.error('Error sending POST request:', error);
        });
    };

    const submitTest = (e) => {
        // Perform any necessary actions upon timer reaching zero
        e.preventDefault();
        ApiService.post('test/postset', { test_value: 2 })
        .then(response => {
            setTimeout(() => {
                sessionStorage.removeItem('time');
                navigate("/final"); // Redirect to '/final' page upon test completion
            }, 2000);
        })
        .catch(error => {
            console.error('lascou vei');
            console.error('Error sending POST request:', error);
        });
    };

    const sendPostRequest = () => {
        return ApiService.post('test/postset', { test_value: 1 });
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
