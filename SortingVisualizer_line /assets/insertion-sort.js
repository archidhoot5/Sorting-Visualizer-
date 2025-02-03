// async function insertionSort() {
//     var i, j, key;
//     await sleep(delay);

//     setColor(0, SELECTED);
//     await sleep(delay);

//     setColor(0, SORTED);

//     for(i = 1; i < size; i++) {
//         await sleep(delay);

//         setColor(i, SELECTED);
//         await sleep(delay);

//         j = i - 1;
//         key = arr[i];

//         while(j >= 0 && arr[j] > key) {
//             setColor(j, COMPARE);
//             await sleep(delay);

//             swap(j, j + 1);
//             setColor(j, SELECTED);
//             setColor(j + 1, COMPARE);
//             await sleep(delay);

//             setColor(j + 1, SORTED);
//             await sleep(delay);

//             j--;
//         }
//         setColor(j + 1, SORTED);
//     }
// }

async function insertionSort() {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
            updateLineGraph();
            // await delay(delay);
        }

        arr[j + 1] = key;
        updateLineGraph();
        // await delay(delay);
    }
}
