const puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#btnSolve')
const solutionDisplay = document.querySelector('#solution')
const squares = 81
const submisson = []
for (let i = 0; i < squares; i++) {
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', 1)
    inputElement.setAttribute('max', 9)
    puzzleBoard.appendChild(inputElement)
    if (
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
    ) {
        inputElement.classList.add('odd-section')
    }
}

const joinValues = () => {

    const inputs = document.querySelectorAll('input')

    inputs.forEach(input => {
        if (input.value) {
            submisson.push(input.value)
        } else {
            submisson.push('.')
        }
    })
    console.log(submisson);
}

const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input')
    if (isSolvable && solution) {
        inputs.forEach((input, index) => {
            input.value = solution[index]
        })
        solutionDisplay.innerHTML = 'Answer'
    } else {
        solutionDisplay.innerHTML = 'Not solvable'
    }
}


const solve = () => {

    joinValues()
    const data = { numbers: submisson.join('') }
    console.log(data);

    fetch('http://localhost:3007/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            populateValues(data.solvable, data.solution)
            submisson = []
        }).catch(err => console.log(err))
}

solveButton.addEventListener('click', solve)