function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            // Calculate the index in the dataArray based on current row and column
            let index = i * cols + j;
            if (index < dataArray.length) {
                span.innerHTML = dataArray[index];
            }
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {
	// dataArray is a 2D array
	// complete this function based on the showResult function
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < dataArray.length; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < dataArray[i].length; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            // Calculate the index in the dataArray based on current row and column
            span.textContent = dataArray[i][j].toString();
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
}

function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    let m1rows = parseInt(document.getElementById('matrix1' + 'Rows').value, 10);
    let m1cols = parseInt(document.getElementById('matrix1' + 'Cols').value, 10);
    let m2rows = parseInt(document.getElementById('matrix2' + 'Rows').value, 10);
    let m2cols = parseInt(document.getElementById('matrix2' + 'Cols').value, 10);

    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);
    // Just a test result
    let result;
    // Call your matrix calculation functions here
    // For example: if (operation === 'add') { addMatrices(matrix1, matrix2); }
	// prints suitable messages for impossible situation
    switch(operation){
        case 'add': result = addMatrices(matrix1, matrix2);
        break;
        case 'subtract': 
            if(m1rows >= m2rows && m1cols >= m2cols){
                result = subtractMatrices(matrix1, matrix2);
            }
            else{
                console.log("Error the second matrix is too big");
                result = [];
            }
            break;
        case 'multiply': 
            if(m1cols == m2rows){
                result = multiplyMatrices(matrix1, matrix2);
            }
            else{
                console.log("Error Matrix 1 cols number and Matrix 2 rows number don't match !");
                result = [];
            }
            break;
        default: console.log("Error with the operator !!!");
    }
    console.log(result);
    showResult2D('The Result', 'matrix3', result); // use suitable function for printing results
}

const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            // Calculate index in the flat list of inputs
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); // Default value if input is missing
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};


// Add your matrix calculation functions here
// The functions must check the posibility of calculation too.
function addMatrices(matrix1, matrix2){ 
    console.log("Addition");
    let rows = Math.max(matrix1.length, matrix2.length);
    let cols = Math.max(matrix1[0].length, matrix2[0].length);
    let r = [];

    for(let i = 0; i < rows; i++){
        let row = [];
        for(let j = 0; j < cols; j++){
            let val1 = matrix1[i] ? (matrix1[i][j] || 0) : 0;
            let val2 = matrix2[i] ? (matrix2[i][j] || 0) : 0;
            row.push(val1 + val2);
        }
        r.push(row);
    }
    return r;
}
const subtractMatrices = function (matrix1, matrix2) { 
	// provide the code
    console.log("Substraction");
    let rows = Math.max(matrix1.length, matrix2.length);
    let cols = Math.max(matrix1[0].length, matrix2[0].length);
    let r = [];

    for(let i = 0; i < rows; i++){
        let row = [];
        for(let j = 0; j < cols; j++){
            let val1 = matrix1[i] ? (matrix1[i][j] || 0) : 0;
            let val2 = matrix2[i] ? (matrix2[i][j] || 0) : 0;
            row.push(val1 - val2);
        }
        r.push(row);
    }
    return r;
};

const multiplyMatrices = (matrix1, matrix2) => { 
	// provide the code
    console.log("Multiplication");
    let rows = matrix1.length;
    let cols = matrix2[0].length;
    let r = [];

    for(let i = 0; i < rows; i++){
        let row = [];
        
        for(let j = 0; j < cols; j++){
            let sum = 0;
            for(let k = 0; k < matrix2.length; k++){
                sum = sum + (matrix1[i][k] * matrix2[k][j]);
            }
            row.push(sum);
        }
        r.push(row);
    }
    return r;
};
