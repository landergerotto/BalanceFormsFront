import React, { useRef } from 'react';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';

const defaultValues = [
    1000, 750, 500, 200, 100,
    675, 600, 500, 50, 25
];

function ValuesPage() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [values, setValues] = React.useState(Array(10).fill(''));
    const [formIndex, setFormIndex] = React.useState(1);

    const handleChange = (index, value) => {
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);
    };

    const handleSubmit = () => {
        setModalOpen(false);
        window.location.replace('/')
    };

    const closeModal = () => {
        setModalOpen(false);
        if (formIndex === 1) {
            setValues(Array(10).fill(''));
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const handleNextForm = () => {
        setFormIndex(2);
    };

    const handlePrevForm = () => {
        setFormIndex(1);
    };

    return (
        <div className='centralize'>
            <NavbarComponent />
            <div id="modal" style={{ display: modalOpen ? 'flex' : 'none' }}>
                <main>
                    <h1>Deseja mesmo utilizar esses valores?</h1>
                    <hr />
                    <div className="format-modal">
                        <div>
                            <h2>Prova 1</h2>
                            {values.slice(0, 5).map((value, index) => (
                                <div className="text" key={`choose${index + 1}`}>{value || defaultValues[index]}</div>
                            ))}
                        </div>
                        <div>
                            <h2>Prova 2</h2>
                            {values.slice(5).map((value, index) => (
                                <div className="text" key={`choose${index + 6}`}>{value || defaultValues[index + 5]}</div>
                            ))}
                        </div>
                    </div>
                    <hr />
                    <div className="align-buttons">
                        <button onClick={closeModal}>Cancelar</button>
                        <button className="send-button" onClick={handleSubmit}>Enviar valores</button>
                    </div>
                </main>
            </div>
            <main className="values-main">
                <form id="form" action="/change_values" method="post">
                    <h1>Defina os valores</h1>
                    <div className={`test${formIndex}`} id={`test${formIndex}`}>
                        <h2>Prova {formIndex}</h2>
                        {[...Array(5)].map((_, index) => (
                            <React.Fragment key={`input${index + 1}`}>
                                <label htmlFor={`value${index + 1}`}>Figura {index + 1}</label>
                                <input
                                    type="number"
                                    name={`value${index + 1}`}
                                    id={`value${index + 1}`}
                                    placeholder="Digite um valor..."
                                    autoComplete="off"
                                    value={values[(formIndex - 1) * 5 + index]}
                                    onChange={(e) => handleChange((formIndex - 1) * 5 + index, e.target.value)}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                    <button className="default-button" type="button" id="next" onClick={formIndex === 1 ? handleNextForm : openModal}>
                        {formIndex === 1 ? 'Próxima' : 'Alterar'}
                    </button>
                    {formIndex === 2 && (
                        <button className="default-button" type="button" id="prev" onClick={handlePrevForm}>
                            Voltar
                        </button>
                    )}
                </form>
            </main>
        </div>
    );
}

export default ValuesPage;
