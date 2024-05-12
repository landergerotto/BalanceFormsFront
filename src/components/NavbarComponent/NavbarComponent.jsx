// NavbarComponent.js
import React from 'react';
import { Link } from 'react-router-dom';

import ApiService from '../../services/requester/ApiService';

import navcolors from '/nav-colors.png'
import logobosch from '/logo-bosch.png'

import ExcelJS from 'exceljs'

import '../../index.css'

function NavbarComponent() {

    const fetchData = async () => {
        try {
            const playersData = await ApiService.get('player'); 
            generateExcel(playersData.players);
            // console.log(playersData.players) 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const generateExcel = (playersData) => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('PlayerData');

        // Add player data to the worksheet
        playersData.forEach((player, index) => {
            const rowData = [
                player.nome,
                player.nascimento,
                player.prova1.respostas.join(', '),
                player.prova1.tempo,
                player.prova1.quantidade,
                player.prova1.tentativas,
                player.prova1.acertos
            ];
            worksheet.addRow(rowData);
        });

        // Save the workbook and provide a download link
        workbook.xlsx.writeBuffer()
            .then(buffer => {
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'players_data.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Error generating Excel file:', error);
            });
    };

    return (
        <header>
            <img src={navcolors} className="nav-colors" alt="Nav Colors"/>
            <nav>
                <img src={logobosch} className="logo" alt="Bosch Logo"/>
                <button onClick={fetchData} className="nav-button">Download Excel</button>
                <Link to="/change_values" className="nav-button">Trocar valores</Link>
            </nav>
        </header>
    );
}

export default NavbarComponent;

