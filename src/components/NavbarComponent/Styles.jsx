export const headerStyle = {
    font: { bold: true, color: "FFFFFF" },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "0099CCFF" } },
    alignment: { horizontal: "center", vertical: "middle" },
    border: {
        top: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
    },
};

export const defaultStyle = {
    alignment: { horizontal: "center", vertical: "middle" },
    border: {
        top: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
    },
};

export const percentageStyle = {
    alignment: { horizontal: "center", vertical: "middle" },
    border: {
        top: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
    },
    numFmt: "0%",
};

export const correctStyle = {
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

export const wrongStyle = {
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

export const nullStyle = {
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

export function verifyStyle(answer, correct) {
    return answer == correct ? correctStyle : answer == 0 ? nullStyle : wrongStyle;
}