import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';

function FinishedPage() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <>
            <NavbarComponent />
            <main>
                <form onSubmit={handleSubmit}>
                    <h1>Prova finalizada!</h1>
                    <button className="default-button" type="submit" id="button">Página inicial</button>
                </form>
            </main>
        </>
    );
}

export default FinishedPage;
