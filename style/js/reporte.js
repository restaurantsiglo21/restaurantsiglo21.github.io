function createPdf() {

    var doc = new jsPDF();

    doc.text(20, 20, "TEXTO DE PRUEBA\n SALTO DE PAGINA");
    doc.text(20, 20, "SALTO DE PAGINA");
    doc.save('sample-file.pdf')
}