// NavbarComponent.js
import React from "react";
import { Link } from "react-router-dom";

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
      // console.log(playersData.players)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const generateExcel = (playersData) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet1 = workbook.addWorksheet("Prova 1");
    const worksheet2 = workbook.addWorksheet("Prova 2");

    // Define named styles
    const headerStyle = {
      font: { bold: true, color: "FFFFFF" },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FFA500" } },
      alignment: { horizontal: "center", vertical: "middle" },
      border: {
        top: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
      },
    };

    const defaultStyle = {
      alignment: { horizontal: "center", vertical: "middle" },
      border: {
        top: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
      },
    };

    const percentageStyle = {
      alignment: { horizontal: "center", vertical: "middle" },
      border: {
        top: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
      },
      numFmt: "0%",
    };

    const correctStyle = {
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "0039E75F" },
      },
      alignment: { horizontal: "center", vertical: "middle" },
      border: {
        top: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
      },
    };

    const wrongStyle = {
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "00FF7F7F" },
      },
      alignment: { horizontal: "center", vertical: "middle" },
      border: {
        top: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
      },
    };

    const nullStyle = {
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "00C0C0C0" },
      },
      alignment: { horizontal: "center", vertical: "middle" },
      border: {
        top: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
      },
    };

    // Add player data to the worksheet
    worksheet1
      .addRow([
        "Nome",
        "Data de nascimento",
        "Respostas",
        "Tempo de prova",
        "Quantidade de peças utilizadas",
        "Tentativas",
        "% de acertos",
      ])
      .eachCell((cell) => {
        cell.style = headerStyle;
      });

      worksheet2
      .addRow([
        "Nome",
        "Data de nascimento",
        "Respostas",
        "Tempo de prova",
        "Quantidade de peças utilizadas",
        "Tentativas",
        "% de acertos",
      ])
      .eachCell((cell) => {
        cell.style = headerStyle;
      });

    playersData.forEach((player) => {
      const rowData1 = [
        player.nome,
        player.nascimento,
        player.prova1.respostas.join(", "),
        player.prova1.tempo,
        player.prova1.quantidade,
        player.prova1.tentativas,
        player.prova1.acertos,
      ];
      const rowData2 = [
        player.nome,
        player.nascimento,
        player.prova2.respostas.join(", "),
        player.prova2.tempo,
        player.prova2.quantidade,
        player.prova2.tentativas,
        player.prova2.acertos,
      ];
      worksheet1.addRow(rowData1).eachCell((cell) => {
        cell.style = defaultStyle;
      });
      worksheet2.addRow(rowData2).eachCell((cell) => {
        cell.style = defaultStyle;
      });
    });

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
