let numbers = [];

function insertNumber() {
    let input = document.getElementById("numberInput");
    let value = Number(input.value);

    if (value <= 0 || input.value === "") {
        alert("Please enter a positive number.");
        return;
    }

    numbers.push(value);

    displayNumbers();
    input.value = "";
}

function displayNumbers() {
    let list = document.getElementById("numberList");
    list.innerHTML = "";

    numbers.forEach(function(number, index) {

        let row = document.createElement("div");
        row.className = "number-row";

        let numberText = document.createElement("span");
        numberText.className = "number";
        numberText.textContent = number;

        let typeText = document.createElement("span");

        if (number % 2 === 0) {
            typeText.className = "even";
            typeText.textContent = "EVEN";
        } else {
            typeText.className = "odd";
            typeText.textContent = "ODD";
        }

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function() {
            removeNumber(index);
        };

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function() {
            editNumber(index);
        };

        row.appendChild(numberText);
        row.appendChild(typeText);
        row.appendChild(removeButton);
        row.appendChild(editButton);

        list.appendChild(row);
    });

    updateTotal();
    identifyHighestLowest();
}

function removeNumber(index) {
    numbers.splice(index, 1);
    displayNumbers();
}

function editNumber(index) {
    let newNumber = prompt("Enter new positive number:", numbers[index]);

    if (newNumber === null) {
        return;
    }

    newNumber = Number(newNumber);

    if (newNumber <= 0 || isNaN(newNumber)) {
        alert("Please enter a positive number.");
        return;
    }

    numbers[index] = newNumber;
    displayNumbers();
}

function clearEntry() {
    document.getElementById("numberInput").value = "";
}

function clearItems() {
    numbers = [];

    document.getElementById("numberList").innerHTML = "";
    document.getElementById("total").textContent = "0";
    document.getElementById("highest").textContent = "-";
    document.getElementById("lowest").textContent = "-";
}

function getTotal() {
    updateTotal();
}

function updateTotal() {
    let total = 0;

    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }

    document.getElementById("total").textContent = total;
}

function identifyHighestLowest() {

    if (numbers.length === 0) {
        document.getElementById("highest").textContent = "-";
        document.getElementById("lowest").textContent = "-";
        return;
    }

    let highest = Math.max(...numbers);
    let lowest = Math.min(...numbers);

    document.getElementById("highest").textContent = highest;
    document.getElementById("lowest").textContent = lowest;
}

function sortNumbers() {
    let order = document.getElementById("sortOrder").value;

    if (order === "ascending") {
        numbers.sort(function(a, b) {
            return a - b;
        });
    } else {
        numbers.sort(function(a, b) {
            return b - a;
        });
    }

    displayNumbers();
}