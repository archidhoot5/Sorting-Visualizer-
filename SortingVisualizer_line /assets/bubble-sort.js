// async function bubbleSort() {
//     var i, j;
//     await sleep(delay);

//     for(i = 0; i < size - 1; i++) {
//         for(j = 0; j < size - i - 1; j++) {
//             await sleep(delay);

//             setColor(j, COMPARE);
//             setColor(j + 1, COMPARE);
//             await sleep(delay);

//             if(arr[j] > arr[j + 1]) {
//                 swap(j, j + 1);
//                 await sleep(delay);
//             }

//             setColor(j, UNSORTED);
//             setColor(j + 1, UNSORTED);
//         }

//         await sleep(delay);

//         setColor(j, SORTED);
//     }

//     setColor(0, SORTED);
// }
async function bubbleSort() {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap values
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                // Update the graph
                updateLineGraph();
                // Add delay for visualization
                await sleep(delay);
                console.log("Sorting iteration: ", i, j);
            }
        }
    }
}
