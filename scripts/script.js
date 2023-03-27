function getElement(id) {
    let element = parseFloat(document.querySelector(`#${id}`).value);
    if (isNaN(element) || element === "") {
        return false;
    } else {
        return element; // retorna o valor do input
    }
}

function validateInputsRoughing() {
    const inputs = ["initial_diameter", "starting_length", "X_axis_finishing_allowance", "Z_axis_finishing_allowance", "increment_per_pass", "advance_in_roughing"];

    for (let i = 0; i < inputs.length; i++) {
        if (!getElement(inputs[i])) {
            return false;
        }
    }

    return true;
}

function validateInputsFacing() {
    const inputs = ["final_diameter_of_facing", "end_position_of_facing", "increment_per_facing_pass", "advance_in_facing"];

    for (let i = 0; i < inputs.length; i++) {
        if (!getElement(inputs[i])) {
            return false;
        }
    }

    return true;
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

    let initial_diameter = getElement("initial_diameter") + 4;
    let starting_length = getElement("starting_length") + 2;
    let xAxisFinishingAllowance = getElement("X_axis_finishing_allowance");
    let zAxisFinishingAllowance = getElement("Z_axis_finishing_allowance");
    let increment_per_pass = getElement("increment_per_pass");
    let subProgram = document.querySelector("#subProgram").value;
    let advance_in_roughing = getElement("advance_in_roughing");

    let preFinishing = document.getElementById("pre_finishing");
    let roughingResult = document.getElementById("roughing_result");

    roughingResult.style.display = "flex"

    if (preFinishing.checked) {
        roughingResult.innerHTML = `G66 X${filterDecimalPlaces(initial_diameter)} Z${filterDecimalPlaces(starting_length)} I${filterDecimalPlaces(xAxisFinishingAllowance)} K${filterDecimalPlaces(zAxisFinishingAllowance)} U1 W${filterDecimalPlaces(increment_per_pass)} ${subProgram} F${filterDecimalPlaces(advance_in_roughing)}#`
    } else {
        roughingResult.innerHTML = `G66 X${filterDecimalPlaces(initial_diameter)} Z${filterDecimalPlaces(starting_length)} I${filterDecimalPlaces(xAxisFinishingAllowance)} K${filterDecimalPlaces(zAxisFinishingAllowance)} W${filterDecimalPlaces(increment_per_pass)} ${subProgram} F${filterDecimalPlaces(advance_in_roughing)}#`
    }

}

function generateFacingCode() {

    let finalDiameterOfFacing = getElement('final_diameter_of_facing');
    let endPositionOfFacing = getElement('end_position_of_facing');
    let incrementPerFacingPass = getElement('increment_per_facing_pass');
    let advanceInFacing = getElement('advance_in_facing');

    let toolAngularIndent = document.getElementById("tool_angular_indent");
    let resultFacing = document.getElementById("result_facing");

    resultFacing.style.display = "flex"

    if (toolAngularIndent.checked) {
        resultFacing.innerHTML = `G75 X${filterDecimalPlaces(finalDiameterOfFacing)} Z${filterDecimalPlaces(endPositionOfFacing)} K${filterDecimalPlaces(incrementPerFacingPass)} U1 F${filterDecimalPlaces(advanceInFacing)}#`
    } else {
        resultFacing.innerHTML = `G75 X${filterDecimalPlaces(finalDiameterOfFacing)} Z${filterDecimalPlaces(endPositionOfFacing)} K${filterDecimalPlaces(incrementPerFacingPass)} F${filterDecimalPlaces(advanceInFacing)}#`
    }

}

function onGenerateRoughingCodeClicked() {
    if (validateInputsRoughing()) {
        generateRoughingCode();
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

function onGenerateFacingCodeClicked() {
    if (validateInputsFacing()) {
        generateFacingCode();
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}
