const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => button.addEventListener("click", onButtonClick));

function onButtonClick(e) {
    let input = e.target.textContent;
    console.log(input);
    if (input.match(/[0-9.]/g)) {
        parseNumber(input);
    } else if (input == "+/-" || input == "%") {
        parseUnaryOp(input);
    } else {
        parseBinaryOp(input);
    }
}

const methods = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "+/-": (a) => -a,
    "%": (a) => a / 100,
}


let numBuffer = [];
let opBuffer = "";
let fresh = true;
let screen = "0";

function parseNumber(input) {
    if (input == "." && screen.includes(input)) return;
    updateScreen(fresh ? input : screen + input);
    fresh = false;
}

function parseUnaryOp(input) {
    updateScreen(methods[input](+screen));
    fresh = false;
}

function parseBinaryOp(input) {
    saveBuffer();
    switch (input) {
        case "AC":
            clearAll();
            break;
        case "=":
            flushBuffer();
            break;
        default:
            flushBuffer();
            updateOp(input);
            break;
    }
}

function saveBuffer() {
    if (fresh) return;
    numBuffer.push(+screen);
    fresh = true;
}

function flushBuffer() {
    if (numBuffer.length < 2 || op == "") return;

    let result = methods[op](...numBuffer.splice(0, numBuffer.length));
    numBuffer.push(result);
    updateScreen(result);
    updateOp("");
}

function clearAll() {
    numBuffer = [];
    opBuffer = "";
    fresh = true;
    updateScreen("0");
}

function updateOp(newVal) {
    op = newVal;
}

function updateScreen(newVal) {
    screen = newVal.toString();
    display.textContent = Math.floor(+screen * 10e9) / 10e9;
}
