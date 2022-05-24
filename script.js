function calculateNetSalary(grossSalary) {
    return parseInt(grossSalary * 0.45);
}

function sumSalaries(salaries) {
    let sum = 0;
    for (let i = 0; i <= 4; i++) {
        sum += salaries[i];
    }
    return sum;
}

function inputToNumber(elementID) {
    let inp = document.getElementById(elementID);
    let val = parseInt(inp.value);

    if(isNaN(val)) {
        return 0;
    }
    return val;
}

function capitalizeFirstLastName(text1, text2) {
    let name1 = text1.charAt(0).toUpperCase() + text1.slice(1);
    let name2 = text2.charAt(0).toUpperCase() + text2.slice(1);
    return name1 + " " + name2;
}

function sumSubsetSalaries(allSalaries, start, end) {
    let sum = 0;
    for (let i = start - 1; i < end; i++) {
        sum += allSalaries[i];
    }
    return sum;
}

function getHighestSalary(list) {
    // let highest = 0;
    // for (let i = 0; i < list.length; i++) {
    //     if (highest < list[i]) {
    //         highest = list[i];
    //     }
    // }
    // return highest;

    let max = -10000;

    for(let i = 0; i < list.length; i++) {
        if(list[i] >= max) {
            max = list[i];
        }
    }
    return max;
}

function getMatchingPersons(employees, find) {
    let match = [];
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].indexOf(find) > -1) {
            match.push(employees[i]);
        }
    }
    return match;
}

function isValideNumber(input) {
    if (input.indexOf('.') === input.length-1) {
        return false
    }

    if (input.indexOf('+') > 0) {
        return false
    }
    
    if(input.indexOf('-') > 0) {
        return false
    }

    const numbers = "0123456789+-.";
    for(let i = 0; i < input.length; i++) {
        if(numbers.indexOf(input[i]) < 0) {
            return false
        }
    }
    return true
}

function isValideEmail(text) {
    let result = true;
    let foundat = 0;
    let founddot = 0;

    for(let i = 0; i < text.length; i++) {
        if(text[i] === "@") {
            foundat += 1;
            if(i === 0) {
                result = false;
            }
            if (i === text.length - 1){
                result = false;
            }
        }

        if (text[i] === ".") {
            founddot += 1;
            if (i === 0) {
                result = false;
            }
            if (i === text.length - 1) {
                result = false;
            } 
            if (text[i-1] === "@") {
                result = false;
            }
        }
    }

    if (foundat !== 1) {
        return false;
    }
    if (founddot !== 1) {
        return false;
    }
    return result;

}



document.getElementById("compute-gross-salary").addEventListener("click", (e) => {
        e.preventDefault();
        let salary = inputToNumber("gross-salary");
        const rez = document.getElementById("result-gross-salary");
        rez.innerText = calculateNetSalary(salary);
    });

document.getElementById("compute-number-sum").addEventListener("click", (e) => {
        e.preventDefault();
        let input = [];
        for (let i = 1; i <= 5; i++) {
            input.push(inputToNumber("number-" + i));
        }
        document.getElementById("number-sum").innerText = sumSalaries(input);
    });

document.getElementById("compute-salary-index").addEventListener("click", (e) => {
        e.preventDefault();
        let from = inputToNumber("index-1");
        let until = inputToNumber("index-2");

        let salaries = [];
        for (let i = 1; i < 11; i++) {
            let row = document.getElementsByTagName("tr")[i];
            let value = row.getElementsByTagName("td")[1];
            value = value.innerText;
            salaries.push(parseInt(value));
        }

        document.getElementById("result-salary-index").innerText = sumSubsetSalaries(salaries, Math.min(from, until), Math.max(from, until));
    });

document.getElementById("capitalize").addEventListener("click", (e) => {
    e.preventDefault();

    let text1 = document.getElementById("to-capitalize-1").value;
    let text2 = document.getElementById("to-capitalize-2").value;

    document.getElementById("result-to-capitalize").innerText = capitalizeFirstLastName(
        text1,
        text2
    );
});

document.getElementById("compute-is-a-number")
    .addEventListener("click", (e) => {
        e.preventDefault();
        let text = document.getElementById("is-a-number").value;
        let rez = document.getElementById("result-is-a-number");

        if (isValideNumber(text)) {
            rez.innerText = "Valid number";
        } else {
            rez.innerText = "Not a number";
        }
    });

document.getElementById("compute-is-email").addEventListener("click", (e) => {
    e.preventDefault();
    let text = document.getElementById("is-email").value;
    let rez = document.getElementById("result-is-email");

    rez.innerText = isValideEmail(text);
});

document.getElementById("compute-find-max").addEventListener("click", (e) => {
    e.preventDefault();
    let list = [];

    for (let i = 1; i < 6; i++) {
        list.push(inputToNumber("find-max-" + i));
    }

    document.getElementById("result-find-max").innerText = getHighestSalary(list);
});

document.getElementById("compute-contains-filter")
    .addEventListener("click", (e) => {
        e.preventDefault();

        let list = [];
        let max = document.getElementsByClassName('list-group')[0].children.length
        for (let i = 0; i < max; i++) {
            list.push(document.getElementsByClassName('list-group')[0].children[i].innerText)
        }
        let filtered = getMatchingPersons(
            list,
            document.getElementById("contains-filter").value
        );

        let out = "";
        for (let i = 0; i < filtered.length; i++) {
            out += '<li class="list-group-item">' + filtered[i] + "</li>";
        }

        document.getElementById("contains-output").innerHTML = out;
    });

