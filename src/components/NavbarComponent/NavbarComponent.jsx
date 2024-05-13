// NavbarComponent.js
import React from "react";
import { Link } from "react-router-dom";
import {
  headerStyle,
  defaultStyle,
  percentageStyle,
  verifyStyle
} from "./Styles";
import ApiService from "../../services/requester/ApiService";

import navcolors from "/nav-colors.png";
import logobosch from "/logo-bosch.png";

import ExcelJS from "exceljs";

import "../../index.css";

function NavbarComponent() {
  const fetchData = async () => {
    try {
      const playersData = await ApiService.get("player/getPlayer");
      generateExcel(playersData.players);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const generateExcel = (playersData) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet1 = workbook.addWorksheet("Prova 1");
    const worksheet2 = workbook.addWorksheet("Prova 2");
    const worksheets = [worksheet1, worksheet2];

    var header = ["Nome", "Data de nascimento", "Respostas", "Tempo de prova", "Quantidade de peças utilizadas", "Tentativas", "% de acertos"];
    var current = 1;

    for (const [index, worksheet] of worksheets.entries()) {
      for (var i = 0; i < header.length; i++) {
        var cell = worksheet.getCell(`A${current}`);
        
        if (current == 3) {
          cell.value = header[i];
          cell.style = headerStyle;
          worksheet.mergeCells(cell.row, cell.row + 4, cell.col, cell.col);
          continue;
        }

        current++;
        if (current > 2 && current < 8)
          continue;

        cell.value = header[i];
        cell.style = headerStyle;
        worksheet.mergeCells(cell.row, cell.row + 1, cell.col, cell.col);;
      };
      
      playersData.forEach(player => {
        var provas = [player.prova1, player.prova2];

        worksheet
          .addRow(header)
          .eachCell((cell, col) => {
            cell.style = headerStyle;
            worksheet.mergeCells(cell.row, cell.row + 1, col, col);
          });
        
        var data = [
          player.nome,
          player.nascimento,
          provas[index].corretas[0],
          provas[index].corretas[1],
          provas[index].corretas[2],
          provas[index].corretas[3],
          provas[index].corretas[4],
          provas[index].tempo,
          provas[index].quantidade,
          provas[index].tentativas,
          provas[index].acertos
        ];
  
        var data2 = [
          '',
          '',
          provas[index].respostas[0],
          provas[index].respostas[1],
          provas[index].respostas[2],
          provas[index].respostas[3],
          provas[index].respostas[4],
          '',
          '',
          '',
          ''
        ]
  
        worksheet.addRow(data).eachCell((cell, col) => {
          if (col != 11)
            cell.style = defaultStyle;
          else
            cell.style = percentageStyle;
        });
  
        worksheet.addRow(data2).eachCell((cell, col) => {
          if (col > 2 && col < 8)
            cell.style = verifyStyle(provas[index].respostas[col - 1], provas[index].corretas[col - 1]);
          else
            worksheet.mergeCells(cell.row, cell.row - 1, col, col);
        });
      });
      
    };

    // Save the workbook and provide a download link
    workbook.xlsx
      .writeBuffer()
      .then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "players_data.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error generating Excel file:", error);
      });
  };
  console.log()
  return (
    <header>
      <img src={navcolors} className="nav-colors" alt="Nav Colors" />
      <nav>
        <img src={logobosch} className="logo" alt="Bosch Logo" />
        <div>
          {
            window.location.pathname == '/' &&
            <button onClick={fetchData} className="nav-button">
              Download Excel
            </button>
          }
          {
            window.location.pathname == '/' ?
              <Link to="/change_values" className="nav-button">Trocar valores</Link> :
              <Link to="/" className="nav-button">Início</Link>
          }
        </div>
      </nav>
    </header>
  );
}

export default NavbarComponent;
