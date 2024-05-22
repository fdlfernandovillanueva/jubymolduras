const { PDFDocument, rgb } = require('pdf-lib');

async function crearPDFConTextoJustificado(texto, limite, nombreArchivo) {
    const doc = await PDFDocument.create();
    const page = doc.addPage();

    const fontSize = 12;
    const lineHeight = fontSize * 1.2;
    const padding = 50;
    const width = page.getWidth() - padding * 2;

    let y = page.getHeight() - padding;

    const font = await doc.embedFont(PDFDocument.FontTimesRoman);

    const lines = dividirTextoEnLineas(texto, limite);

    for (const line of lines) {
        const { width: lineWidth } = font.widthOfTextAtSize(line, fontSize);
        const spaceCount = line.split(" ").length - 1;
        const spaceWidth = (width - lineWidth) / spaceCount;

        let x = padding;

        for (const word of line.split(" ")) {
            const wordWidth = font.widthOfTextAtSize(word, fontSize);
            const wordHeight = font.heightAtSize(fontSize);

            if (x + wordWidth > page.getWidth() - padding) {
                y -= lineHeight;
                x = padding;
            }

            page.drawText(word, { x, y, size: fontSize });
            x += wordWidth + spaceWidth;
        }

        y -= lineHeight;
    }

    const pdfBytes = await doc.save();

    // Para guardar el PDF en el sistema de archivos:
    // const fs = require('fs');
    // fs.writeFileSync(nombreArchivo, pdfBytes);

    // Para descargar el PDF en el navegador:
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = nombreArchivo;
    link.click();
}

function dividirTextoEnLineas(texto, limite) {
    const palabras = texto.split(" ");
    let linea = palabras[0];
    const lineas = [];

    for (let i = 1; i < palabras.length; i++) {
        const palabra = palabras[i];
        if (linea.length + palabra.length + 1 <= limite) {
            linea += " " + palabra;
        } else {
            lineas.push(linea);
            linea = palabra;
        }
    }

    lineas.push(linea);
    return lineas;
}

// Ejemplo de uso:
const texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const limite = 100;
const nombreArchivo = "texto_justificado.pdf";

crearPDFConTextoJustificado(texto, limite, nombreArchivo)
    .then(() => console.log("PDF creado con éxito"))
    .catch(error => console.error("Error al crear PDF:", error));