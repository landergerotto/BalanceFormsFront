import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';

import ApiService from "../../services/requester/ApiService";

function FinishedPage() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/');
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
                    <h1>Prova finalizada!</h1>
                    <button className="default-button" type="submit" id="button">Página inicial</button>
                </form>
            </main>
        </div>
    );
}

export default FinishedPage;
