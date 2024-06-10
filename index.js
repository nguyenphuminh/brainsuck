const { readFileSync, writeFileSync, existsSync } = require("fs");
const http = require('http');
const config = require("./config.json");

// Load Brainfuck source
const code = readFileSync("./index.bf").toString("utf8");
// Init memory
const memory = existsSync("./memory.json") ? JSON.parse(readFileSync("./memory.json").toString("utf8")) : new Array(config.memSize).fill(0);

const server = http.createServer((req, res) => {
    // User's request body through url
    const body = req.url;
    let bodyPointer = 0;
    // Memory-related init
    let memPointer = 0;
    // Code-related init
    let codePointer = 0;
    // Loop stack
    let loopStack = [];
    // Output
    let output = "";

    while (codePointer < code.length) {
        switch (code[codePointer]) {
            case "+":
                memory[memPointer]++;

                if (memory[memPointer] > 255) {
                    memory[memPointer] = 0;
                }

                break;

            case "-":
                memory[memPointer]--;

                if (memory[memPointer] < 0) {
                    memory[memPointer] = 255;
                }

                break;

            case ">":
                if (memPointer < config.memSize-1) {
                    memPointer++;
                } else {
                    memPointer = 0;
                }

                break;

            case "<":
                if (memPointer > 0) {
                    memPointer--;
                } else {
                    memPointer = config.memSize-1;
                }

                break;

            case ",":
                if (body[bodyPointer]) {
                    memory[memPointer] = body[bodyPointer].charCodeAt(0);
                    bodyPointer++;
                } else {
                    memory[memPointer] = 0;
                }

                break;

            case ".":
                output += String.fromCharCode(memory[memPointer]);

                break;

            case "[":
                loopStack.push(codePointer);

                if (memory[memPointer] === 0) {
                    for (let newPointer = codePointer; newPointer < code.length; newPointer++) {
                        if (code[newPointer] === "]") {
                            codePointer = newPointer-1;
                            break;
                        }
                    }
                }

                break;

            case "]":
                const newPointer = loopStack.pop();

                if (memory[memPointer] !== 0) {
                    codePointer = newPointer-1;
                }

                break;
        }

        codePointer++;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(output);

    writeFileSync("./memory.json", JSON.stringify(memory));
});

server.listen(config.port, config.hostName, () => {
    console.log(`Server listening on http://${config.hostName}:${config.port}/`);
});
