const fs = require("node:fs");
const path = require("node:path");

const fileName = path.join(__dirname, "input.txt");

try {
    const data = fs.readFileSync(fileName, { encoding: "utf-8" });
    const numbers = data.split(/\s+/).filter(Boolean).map(Number);
    const arr1 = numbers.filter((_, i) => i % 2 === 0);
    const arr2 = numbers.filter((_, i) => i % 2 !== 0);
    const score = arr1.reduce((acc, val, i) => {
        const similarVals = arr2.filter(similarVal => val === similarVal);

        return acc + (val * similarVals.length);
    }, 0);

    console.log("The similarity score is:", score);
} catch(e) {
    console.error("There was an error reading the file:", e);
}
