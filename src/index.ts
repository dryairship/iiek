import fs from 'fs';
import Program from "./controllers/Program";

let codeFile = process.argv[2];
let inputFile = process.argv[3];
if(codeFile === undefined) {
    console.log("Usage: node index.js code.iiek [input.txt]");
}else{
    let code = fs.readFileSync(codeFile, "utf8");
    let input = "";

    if(inputFile != undefined){
        input = fs.readFileSync(inputFile, "utf-8");
    }

    let program = new Program(code, input);
    program.run();
}
