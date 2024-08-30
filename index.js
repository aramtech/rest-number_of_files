import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import url from "url";
const app_path = path.resolve(path.join(path.dirname(url.fileURLToPath(import.meta.url)), "../../../."));

// const data  = fs.readFileSync('./list_of_files.txt', 'utf-8')
const data = execSync("find " + app_path, {
    maxBuffer: 10e6,
})
    .toString()
    .trim();

const files = data.split("\n").filter((file) => {
    return (
        !file.includes("node_modules") &&
        !file.includes(".git") &&
        !file.includes("/just/") &&
        !file.includes("/js-xlsx-master/") &&
        !file.includes("/dist/") &&
        !file.includes("/public/")
    );
});
fs.writeFileSync("./list_of_files.txt", files.join("\n"));

let number_of_lines = 0;
for (const file of files) {
    try {
        number_of_lines += parseInt(execSync(`wc ${file} -l`).toString().trim().split(" ")[0]);
    } catch (error) {}
}
console.log(number_of_lines);
fs.writeFileSync("./number_of_lines.txt", number_of_lines.toString());
// /**
//  * 220377 lines of code
//  */
