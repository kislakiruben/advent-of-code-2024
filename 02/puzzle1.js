const fs = require("node:fs");
const path = require("node:path");

const filePath = path.join(__dirname, "input.txt");

try {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const lines = data.split(/\r?\n/).filter(Boolean);
    const reports = lines.map(line => line.split(" ").map(Number));
    const safe = reports
        .filter(report => report.every((level, i, arr) => {
            const next = arr.at(i + 1);
            const increasing = arr.at(0) < arr.at(1);

            return !next || (increasing ? level < next : level > next);
        }))
        .filter(report => report.every((level, i, arr) => {
            const next = arr.at(i + 1);
            const diff = Math.abs(next - level);

            return !next || diff > 0 && diff < 4;
        }));

    console.log("The total number of safe reports is", safe.length);
} catch(e) {
    console.error("There was an error:", e);
}

