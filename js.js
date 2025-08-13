// Function to calculate SGPA
function calculateSGPA() {
    console.log("Calculating SGPA...");
    
    // Get all the grade inputs
    const grades = [
        parseInt(parseInt(document.getElementById('grade1').value) / 10) + 1,
        parseInt(parseInt(document.getElementById('grade2').value) / 10) + 1,
        parseInt(parseInt(document.getElementById('grade3').value) / 10) + 1,
        parseInt(parseInt(document.getElementById('grade4').value) / 10) + 1,
        parseInt(parseInt(document.getElementById('grade5').value) / 10) + 1,
        parseInt(parseInt(document.getElementById('grade6').value) / 10) + 1,
        parseInt(parseInt(document.getElementById('grade7').value) / 10) + 1,
       
    ];

    console.log(grades);

    // Replace invalid grades of 11 with 10
    for (let i = 0; i < grades.length; i++) {
        if (grades[i] === 11) {
            grades[i] = 10;
        }
    }

    // Check if all grades are valid numbers
    if (grades.some(isNaN)) {
        document.getElementById('result').innerHTML = 'Please enter valid grades <br> for all subjects.';
        erase_invalid_input();
        return;
    }

    // Calculate the total grade points and number of subjects
    const credits = [4, 4, 3,3,1,1,2];
    const each_sub_credits = [];

    // Iterate through the arrays and multiply respective elements
    for (let i = 0; i < grades.length; i++) {
        each_sub_credits.push(credits[i] * grades[i]);
    }

    console.log(each_sub_credits);

    let totalsum = 0;
    for (let i = 0; i < grades.length; i++) {
        totalsum += each_sub_credits[i];
    }

    const total_credits = credits.reduce((accumulator, current) => accumulator + current, 0);
    let sgpa = totalsum / total_credits;
    sgpa = sgpa.toFixed(2);

    // Display SGPA
    const displaynode = document.getElementById("result");
    const dis1 = document.getElementById("disp");
    dis1.innerText = "YOUR SGPA:";
    displaynode.innerText = sgpa;

    // Call the eraser function to clear inputs
}

// Function to clear input fields
function eraser() {
    const input_box = document.getElementsByClassName('inpt');
    // Clear the value of each input box
    Array.from(input_box).forEach(input => {
        input.value = ""; // Use 'value' to clear input content
    });

    const sgpa_washer=document.getElementsByClassName('display');
    Array.from(sgpa_washer).forEach(input => {
        input.innerText = "";
        });
    
    sgpa_washer.innerText=""; 
}

function erase_invalid_input(){
    const input_box = document.getElementsByClassName('inpt');
    // Clear the value of each input box
    Array.from(input_box).forEach(input => {
        input.value = ""; // Use 'value' to clear input content
    });

}

//write a code to check if the given element is a number or not
function isNumber(num) {
    return !isNaN(num) && isFinite(num) && num !== 0 && num !== null
    }


function saveSGPA() {
    const sgpaValue = document.getElementById('result').innerText;
    if (!sgpaValue || !isNumber(sgpaValue) ) {
        alert("Please calculate SGPA first before saving.");
        return;
    }

    const sgpaContent = `Your SGPA for 5TH sem is : ${sgpaValue}\nGenerated on: ${new Date().toLocaleString()}`;
    const blob = new Blob([sgpaContent], { type: 'text/plain' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'SGPA.pdf';
    link.click();

    URL.revokeObjectURL(link.href);
}


document.getElementById('calculate-btn').addEventListener('click', calculateSGPA);
document.getElementById('eraser-btn').addEventListener('click', eraser);
document.getElementById('save-btn').addEventListener('click', saveSGPA);
