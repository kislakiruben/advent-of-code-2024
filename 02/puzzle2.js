const fs = require("node:fs");
const path = require("node:path");

const filePath = path.join(__dirname, "input.txt");

try {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const lines = data.split(/\r?\n/).filter(Boolean);
    const reports = lines.map(line => line.split(" ").map(Number));
    const levelsAreSafe = (level, i, arr) => {
        const next = arr.at(i + 1);
        const increasing = arr.at(0) < arr.at(1);
        const diff = Math.abs(next - level);

        return !next || ((increasing ? level < next : level > next) && diff > 0 && diff < 4);
    };
    const safe = reports
        .filter(report => {
            const omitLevels = (_, i, arr) => arr.filter((_, j) => i !== j);
            const potentiallySafeReports = report
                .map(omitLevels)
                .filter(report => report.every(levelsAreSafe));

            return report.every(levelsAreSafe) || potentiallySafeReports.length > 0;
        });

    console.log("The total number of safe reports is now", safe.length);
} catch(e) {
    console.error("There was an error:", e);
}

