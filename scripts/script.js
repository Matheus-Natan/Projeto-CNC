function updateCycle() {
    let select = document.querySelector("#select_cycle");
    let optionValue = select.options[select.selectedIndex];
    let value = optionValue.value;

    if (value == "thinning") {
        let thinningLayer = document.getElementById('thinning');
        thinningLayer.style.display = 'block';
    } else {
        let thinningLayer = document.getElementById('thinning');
        thinningLayer.style.display = 'none';
    }

    if (value == "facing") {
        let facingLayer = document.getElementById('facing');
        facingLayer.style.display = 'block';
    } else {
        let facingLayer = document.getElementById('facing');
        facingLayer.style.display = 'none';
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

    let initial_diameter = parseFloat(document.getElementById('initial_diameter').value) + 4;
    let starting_length = parseFloat(document.getElementById("starting_length").value) + 2;
    let xAxisFinishingAllowance = parseFloat(document.getElementById("X_axis_finishing_allowance").value);
    let zAxisFinishingAllowance = parseFloat(document.getElementById("Z_axis_finishing_allowance").value);
    let increment_per_pass = parseFloat(document.getElementById("increment_per_pass").value);
    let subProgram = document.getElementById("subProgram").value;
    let advance_in_roughing = parseFloat(document.getElementById("advance_in_roughing").value);

    let preFinishing = document.getElementById("pre_finishing");
    let roughingResult = document.getElementById("roughing_result");

    roughingResult.style.display = "flex"

    if (preFinishing.checked) {
        roughingResult.innerHTML = `G66 X${filterDecimalPlaces(initial_diameter)} Z${filterDecimalPlaces(starting_length)} I${filterDecimalPlaces(xAxisFinishingAllowance)} K${filterDecimalPlaces(zAxisFinishingAllowance)} U1 W${filterDecimalPlaces(increment_per_pass)} ${subProgram} F${filterDecimalPlaces(advance_in_roughing)}#`
    } else {
        roughingResult .innerHTML = `G66 X${filterDecimalPlaces(initial_diameter)} Z${filterDecimalPlaces(starting_length)} I${filterDecimalPlaces(xAxisFinishingAllowance)} K${filterDecimalPlaces(zAxisFinishingAllowance)} W${filterDecimalPlaces(increment_per_pass)} ${subProgram} F${filterDecimalPlaces(advance_in_roughing)}#`
    }

}

function generateFacingCode() {

    let finalDiameterOfFacing = parseFloat(document.getElementById('final_diameter_of_facing').value);
    let endPositionOfFacing = parseFloat(document.getElementById('end_position_of_facing').value);
    let incrementPerFacingPass = parseFloat(document.getElementById('increment_per_facing_pass').value);
    let advanceInFacing = parseFloat(document.getElementById('advance_in_facing').value);

    let toolAngularIndent = document.getElementById("tool_angular_indent");
    let resultFacing = document.getElementById("result_facing");

    resultFacing.style.display = "flex"

    if (toolAngularIndent.checked) {
        resultFacing.innerHTML = `G75 X${filterDecimalPlaces(finalDiameterOfFacing)} Z${filterDecimalPlaces(endPositionOfFacing)} K${filterDecimalPlaces(incrementPerFacingPass)} U1 F${filterDecimalPlaces(advanceInFacing)}#`
    } else {
        resultFacing.innerHTML = `G75 X${filterDecimalPlaces(finalDiameterOfFacing)} Z${filterDecimalPlaces(endPositionOfFacing)} K${filterDecimalPlaces(incrementPerFacingPass)} F${filterDecimalPlaces(advanceInFacing)}#`
    }

}