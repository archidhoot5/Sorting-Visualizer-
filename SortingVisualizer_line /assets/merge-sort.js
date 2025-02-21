// async function merge(p, q, r) {
//     await sleep(delay);

//     var i, j;
//     var n1 = q - p + 1;
//     var n2 = r - q;
//     var L = [];
//     var R = [];

//     for(i = 0; i < n1; i++) {
//         L.push(arr[p + i]);
//         setColor(p + i, LEFT);
//     }
//     for(j = 0; j < n2; j++) {
//         R.push(arr[q + j + 1]);
//         setColor(q + j + 1, RIGHT);
//     }

//     L.push(Infinity);
//     R.push(Infinity);

//     i = 0;
//     j = 0;

//     for(var k = p; k <= r; k++) {
//         await sleep(delay);

//         if(L[i] <= R[j]) {
//             arr[k] = L[i];
//             i++;
//         }
//         else {
//             arr[k] = R[j];
//             j++;
//         }

//         setHeight(k, arr[k]);
//         setColor(k, SELECTED);
//     }

//     await sleep(delay);

//     if(p == 0 && r == size - 1)
//         setColorRange(p, r, SORTED);
//     else
//         setColorRange(p, r, UNSORTED);
// }

// async function mergeSort(p, r) {
//     if(p < r) {
//         var q = Math.floor( (p + r) / 2 );

//         await mergeSort(p, q);

//         await mergeSort(q + 1, r);

//         await merge(p, q, r);
//     }
// }

async function mergeSort(start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);

    const merged = [];
    let left = start, right = mid + 1;

    while (left <= mid && right <= end) {
        if (arr[left] <= arr[right]) {
            merged.push(arr[left++]);
        } else {
            merged.push(arr[right++]);
        }
    }

    while (left <= mid) merged.push(arr[left++]);
    while (right <= end) merged.push(arr[right++]);

    for (let i = start; i <= end; i++) {
        arr[i] = merged[i - start];
        updateLineGraph();
        await sleep(delay);
    }
}
