
const MIN_SIZE = 4;
const MAX_SIZE = 64;
const DEFAULT_SIZE = 32;

const MIN_SPEED = 1;
const MAX_SPEED = 4;
const DEFAULT_SPEED = 3;

const MIN = 20;
const MAX = 300;

const WAITING_TIME = 100;

const UNSORTED = 'Red';

// const UNSORTED = 'deepskyblue';
const SORTED = 'mediumspringgreen';
const COMPARE = 'crimson';
const SELECTED = 'blueviolet';
const LEFT = 'gold';
const RIGHT = 'orangered';
var size;
var delay;
var arr = [];

var canvas = document.getElementById("array-canvas");
var ctx = canvas.getContext("2d");

// Adjust canvas dimensions dynamically
function updateCanvasSize() {
    canvas.width = document.getElementById("array-container").clientWidth;
    canvas.height = 400; // Set a fixed height for the canvas
}

// Create random array
function createArray() {
    arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * (MAX - MIN + 1)) + MIN);
    }
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


// Draw the line graph
function drawLineGraph() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Begin drawing the graph line
        ctx.beginPath();
        for (let i = 0; i < arr.length; i++) {
            let x = (i * canvas.width) / (size - 1); // X-coordinate
            let y = canvas.height - ((arr[i] - MIN) * canvas.height) / (MAX - MIN); // Y-coordinate
    
            if (i === 0) {
                ctx.moveTo(x, y); // Move to the first point
            } else {
                ctx.lineTo(x, y); // Draw line to the next point
            }
    
            // Add array size label at each point
            ctx.fillStyle = "Red"; // Label color
            ctx.font = "12px Arial"; // Label font
            ctx.textAlign = "center"; // Center the text
            ctx.fillText(arr[i], x, y - 10); // Display array value slightly above the point
        }
    
        // Stroke the line graph
        ctx.strokeStyle = UNSORTED; // Line color
        ctx.lineWidth = 2; // Line width
        ctx.stroke();
    }

// Update the graph after changes
function updateLineGraph() {
    drawLineGraph(); // Redraw the graph with the updated array
}

// Initialization
$(document).ready(function () {
    size = DEFAULT_SIZE;
    delay = WAITING_TIME * Math.pow(2, MAX_SPEED - DEFAULT_SPEED);
    
    updateCanvasSize();
    createArray();
    drawLineGraph();

    // Redraw on window resize
    $(window).resize(function () {
        updateCanvasSize();
        drawLineGraph();
    });

    // Randomize button functionality
    $("#randomize").click(function () {
        console.log("Randomize button clicked!");
        createArray();
        drawLineGraph();
    });

    // Update size slider
    $("#size-slider").on("input", function () {
        console.log("Size slider changed:", $(this).val());
        size = $(this).val();
        createArray();
        drawLineGraph();
    });
    // Update speed slider
    $("#speed-slider").on("input", function () {
        console.log("Speed slider changed:", $(this).val());
        let speed = $(this).val();
        delay = WAITING_TIME * Math.pow(2, MAX_SPEED - speed);
    });
});
    let algo_selected = ""; // To store the selected sorting algorithm

// Event listener for algorithm selection buttons
document.querySelectorAll(".algo-btn").forEach((button) => {
    button.addEventListener("click", function () {
        // Set the selected algorithm based on the button's text
        algo_selected = this.textContent;
        console.log("Selected Algorithm:", algo_selected);

        // Highlight the selected button
        document.querySelectorAll(".algo-btn").forEach((btn) => btn.classList.remove("selected"));
        this.classList.add("selected");
    });
});

// Event listener for the sort button
document.getElementById("sort").addEventListener("click", async function () {
    if (!algo_selected) {
        alert("Please select a sorting algorithm first!");
        return;
    }

    console.log("Sorting using:", algo_selected);

    disableButtons();

    switch (algo_selected) {
        case "Bubble Sort":
            await bubbleSort();
            break;
        case "Selection Sort":
            await selectionSort();
            break;
        case "Insertion Sort":
            await insertionSort();
            break;
        case "Merge Sort":
            await mergeSort(0, arr.length - 1);
            break;
        case "Quicksort":
            await quicksort(0, arr.length - 1);
            break;
        case "Heapsort":
            await heapsort();
            break;
        default:
            console.error("Invalid algorithm selected.");
            break;
    }

    enableButtons();
});

// Function to disable buttons during sorting
function disableButtons() {
    document.getElementById("sort").disabled = true;
    document.querySelectorAll(".algo-btn").forEach((btn) => (btn.disabled = true));
}

// Function to enable buttons after sorting
function enableButtons() {
    document.getElementById("sort").disabled = false;
    document.querySelectorAll(".algo-btn").forEach((btn) => (btn.disabled = false));
}
