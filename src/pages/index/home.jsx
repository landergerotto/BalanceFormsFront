import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import { useTimer } from '../../context/timercontent';
import ApiService from "../../services/requester/ApiService";
import '../../index.css';

function TimerForm() {
    const [errorMessage, setErrorMessage] = useState('');
    const { minutes, setMinutes } = useTimer();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setMinutes(inputValue);

        // Validation logic
        if (inputValue.includes('.') || inputValue.includes(',')) {
            setErrorMessage("Preencha o campo apenas com números inteiros.");
        } else if (isNaN(inputValue)) {
            setErrorMessage("Preencha o campo apenas com números.");
        } else if (parseInt(inputValue) < 10 || parseInt(inputValue) > 180) {
            setErrorMessage("Tempo de prova mínimo ou máximo excedido, tente um valor entre 10 a 180 minutos.");
        } else {
            setErrorMessage('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        if (errorMessage === '') {
            navigate('/timer');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Send a POST request to your backend
                await ApiService.post('test/postset', { test_value: 0 });
            } catch (error) {
                console.error('Error sending POST request:', error);
            }
        };

        fetchData();

        // Cleanup function
        return () => {
            // Perform any cleanup if necessary
        };
    }, []); 

    return (
        <div className='centralize'>
            <NavbarComponent /> 
            <main>
                <form onSubmit={handleSubmit}>
                    <h1>Defina o tempo de prova</h1>
                    <div className="define_time">
                        <label htmlFor="minutes">Minutos</label>
                        <input 
                            type="text" 
                            name="minutes" 
                            placeholder="Tempo padrão: 30 minutos" 
                            value={minutes} 
                            onChange={handleChange} 
                            autoComplete="off"
                        />
                        <div className="error">{errorMessage}</div>
                    </div>
                    <button className="default-button" type="submit" disabled={errorMessage !== ''}>Iniciar prova</button>
                </form>
            </main>
        </div>
    );
}

export default TimerForm;
