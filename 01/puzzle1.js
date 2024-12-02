const fs = require("node:fs");
const path = require("node:path");

const filePath = path.join(__dirname, "input.txt");

try {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const numbers = data.split(/\s+/).filter(Boolean).map(Number);
    const arr1 = numbers.filter((_, i) => i % 2 === 0).sort();
    const arr2 = numbers.filter((_, i) => i % 2 !== 0).sort();
    const score = arr1.reduce((acc, val, i) => acc + Math.abs(val - arr2[i]), 0);

    console.log("The similarity score is:", score);
} catch(e) {
    console.error("There was an error reading the file:", e);
}

