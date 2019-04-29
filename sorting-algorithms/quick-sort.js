"use strict";
const canvas = document.querySelector('canvas');
if (!canvas)
    throw new Error('Canvas not found');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext('2d');
if (!ctx)
    throw new Error('getContext returned null');
ctx.fillStyle = '#2790dd';
const ctxHeight = innerHeight / 2;
const drawData = (ctx, arr) => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    arr.forEach((num, i) => {
        const width = innerWidth * 0.8 / arr.length;
        const x = innerWidth * 0.1 + i * width;
        const height = ctxHeight * num / 100;
        const y = ctxHeight - height + innerHeight * 0.25;
        ctx.fillRect(x, y, width, height);
    });
};
const generateData = (length) => {
    let arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(Math.round(Math.random() * 100));
    }
    drawData(ctx, arr);
    return arr;
};
const quickSort = async (array, start, end) => {
    if (start >= end)
        return;
    const index = await partition(array, start, end);
    await Promise.all([
        quickSort(array, start, index - 1),
        quickSort(array, index + 1, end)
    ]);
};
const partition = async (array, start, end) => {
    const pivotValue = array[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        if (array[i] < pivotValue) {
            await swap(array, i, pivotIndex);
            pivotIndex++;
        }
    }
    await swap(array, pivotIndex, end);
    return pivotIndex;
};
const swap = (arr, a, b) => {
    return new Promise((resolve) => {
        const aCopy = arr[a];
        arr[a] = arr[b];
        arr[b] = aCopy;
        setTimeout(() => {
            resolve();
            drawData(ctx, arr);
        }, 1);
    });
};
window.onload = () => quickSort(generateData(1000), 0, 1000 - 1);
