import React, { useEffect, useState } from 'react';
import { useTimer } from '../../context/timercontent';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import ApiService from "../../services/requester/ApiService";

function TimerPage() {
    const { minutes: contextMinutes } = useTimer();
    const minutes = contextMinutes || 30;

    const [targetTime, setTargetTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [elapsedSeconds, setElapsedSeconds] = useState(0); // State to track elapsed seconds
    const navigate = useNavigate();

    useEffect(() => {
        ApiService.post('test/postset', { test_value: 1 })
            .then(() => {
                console.log('a')
            })
            .catch(error => {
                console.error('Error sending POST request:', error);
                // Handle error if necessary
            });
    }, []); // Update effect when minutes change

    useEffect(() => {
        const target = new Date(new Date().getTime() + parseInt(minutes) * 60000);
        setTargetTime(target);
        sessionStorage.setItem('time', target);

        const intervalId = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
            // Increment elapsed seconds every second
            setElapsedSeconds(prevElapsedSeconds => prevElapsedSeconds + 1);
            if (now >= target) {
                sessionStorage.removeItem('time');
                clearInterval(intervalId);
                handleFinishTest(); // Call handleFinishTest when timer reaches zero
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [minutes]); // Update effect when minutes change

    const handleFinishTest = () => {
        // Perform any necessary actions upon timer reaching zero
        ApiService.post('test/postset', { test_value: 2 })
        .then(response => {
            setTimeout(() => {
                sessionStorage.removeItem('time');
                navigate("/final"); // Redirect to '/final' page upon test completion
            }, 5000);
        })
        .catch(error => {
            console.error('Error sending POST request:', error);
            // Handle error if necessary
        });
    };

    const submitTest = (e) => {
        // Prevent default form submission
        e.preventDefault();
        // Perform any necessary actions upon timer reaching zero
        ApiService.post('test/postset', { test_value: 2 })
        .then(response => {
            setTimeout(() => {
                sessionStorage.removeItem('time');
                navigate("/final"); // Redirect to '/final' page upon test completion
            }, 5000);
        })
        .catch(error => {
            console.error('Error sending POST request:', error);
            // Handle error if necessary
        });
    };

    const sendPostRequest = () => {
        // Send POST request
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
