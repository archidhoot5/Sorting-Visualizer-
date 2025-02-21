// async function partition(p, r) {
//     await sleep(delay);

//     var i = p - 1;
//     setColor(r, SELECTED);

//     for(var j = p; j < r; j++) {
//         await sleep(delay);

//         if(arr[j] <= arr[r]) {
//             i++;
//             swap(i, j);
//             setColor(j, RIGHT);
//             setColor(i, LEFT);
//         }
//         else
//             setColor(j, RIGHT);
//     }

//     if(i + 1 < r) {
//         await sleep(delay);

//         swap(i + 1, r);
//         setColor(r, RIGHT);
//         setColor(i + 1, SELECTED);
//     }

//     await sleep(delay);

//     setColorRange(p, r, UNSORTED);

//     return i + 1;
// }

// async function quicksort(p, r) {
//     if(p < r) {
//         var q = await partition(p, r);

//         await quicksort(p, q - 1);

//         setColorRange(p, q, SORTED);
//         await quicksort(q + 1, r);

//         setColorRange(q + 1, r, SORTED);
//     }

//     if(p == 0 && r == size - 1)
//         await sleep(delay);
// }

async function quicksort(start, end) {
    if (start >= end) return;

    const pivot = arr[end];
    let partitionIndex = start;

    for (let i = start; i < end; i++) {
        if (arr[i] < pivot) {
            [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
            partitionIndex++;
            updateLineGraph();
            await delay(delay);
        }
    }

    [arr[partitionIndex], arr[end]] = [arr[end], arr[partitionIndex]];
    updateLineGraph();
    await sleep(delay);

    await quicksort(start, partitionIndex - 1);
    await quicksort(partitionIndex + 1, end);
}
