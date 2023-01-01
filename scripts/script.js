function updateCycle() {
    let select = document.querySelector("#select_ciclo");
    let optionValue = select.options[select.selectedIndex];
    let value = optionValue.value;

    if (value == "desbaste") {
        let desbasteLayer = document.getElementById('desbaste');
        desbasteLayer.style.display = 'block';
    } else {
        let desbasteLayer = document.getElementById('desbaste');
        desbasteLayer.style.display = 'none';
    }

    if (value == "faceamento") {
        let faceamentoLayer = document.getElementById('faceamento');
        faceamentoLayer.style.display = 'block';
    } else {
        let faceamentoLayer = document.getElementById('faceamento');
        faceamentoLayer.style.display = 'none';
    }
}

function filterDecimalPlaces(number) {

    if (number < 1 && number > 0) {
        let newNumber = number * 10
        return `.${newNumber}`
    }

    if (number >= 1 && number % 1 !== 0) {
        return `${number}`
    }

    if (number == 0 || number >= 1 && number % 1 === 0) {
        return `${number}.`
    }
}

function generateRoughingCode() {

    let diametroInicial = parseFloat(document.getElementById('diametroInicial').value) + 4;
    let comprimentoInicial = parseFloat(document.getElementById("comprimentoInicial").value) + 2;
    let sobremetalAcabamentoX = parseFloat(document.getElementById("sobremetalAcabamentoX").value);
    let sobremetalAcabamentoZ = parseFloat(document.getElementById("sobremetalAcabamentoZ").value);
    let incrementoPorPassada = parseFloat(document.getElementById("incrementoPorPassada").value);
    let subPrograma = document.getElementById("subPrograma").value;
    let avanço = parseFloat(document.getElementById("avanço").value);

    let preAcabamento = document.getElementById("preAcabamento");
    let resultadoDesbaste = document.getElementById("resultadoDesbaste");

    resultadoDesbaste.style.display = "flex"

    if (preAcabamento.checked) {
        resultadoDesbaste.innerHTML = `G66 X${filterDecimalPlaces(diametroInicial)} Z${filterDecimalPlaces(comprimentoInicial)} I${filterDecimalPlaces(sobremetalAcabamentoX)} K${filterDecimalPlaces(sobremetalAcabamentoZ)} U1 W${filterDecimalPlaces(incrementoPorPassada)} ${subPrograma} F${filterDecimalPlaces(avanço)}#`
    } else {
        resultadoDesbaste.innerHTML = `G66 X${filterDecimalPlaces(diametroInicial)} Z${filterDecimalPlaces(comprimentoInicial)} I${filterDecimalPlaces(sobremetalAcabamentoX)} K${filterDecimalPlaces(sobremetalAcabamentoZ)} W${filterDecimalPlaces(incrementoPorPassada)} ${subPrograma} F${filterDecimalPlaces(avanço)}#`
    }

}

function generateFacingCode() {

    let diametroFinalFaceamento = parseFloat(document.getElementById('diametroFinalFaceamento').value);
    let posiçãoFinalFaceamento = parseFloat(document.getElementById('posiçãoFinalFaceamento').value);
    let incrementoPorPassadaFaceamento = parseFloat(document.getElementById('incrementoPorPassadaFaceamento').value);
    let avancoFaceamento = parseFloat(document.getElementById('avancoFaceamento').value);

    let recuoAngularFerramenta = document.getElementById("recuoAngularFerramenta");
    let resultadoFaceamento = document.getElementById("resultadoFaceamento");

    resultadoFaceamento.style.display = "flex"

    if (recuoAngularFerramenta.checked) {
        resultadoFaceamento.innerHTML = `G75 X${filterDecimalPlaces(diametroFinalFaceamento)} Z${filterDecimalPlaces(posiçãoFinalFaceamento)} K${filterDecimalPlaces(incrementoPorPassadaFaceamento)} U1 F${filterDecimalPlaces(avancoFaceamento)}#`
    } else {
        resultadoFaceamento.innerHTML = `G75 X${filterDecimalPlaces(diametroFinalFaceamento)} Z${filterDecimalPlaces(posiçãoFinalFaceamento)} K${filterDecimalPlaces(incrementoPorPassadaFaceamento)} F${filterDecimalPlaces(avancoFaceamento)}#`
    }

}