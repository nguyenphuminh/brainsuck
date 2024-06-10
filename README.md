## Introduction

If Node.js helps bring Javascript from the frontend to the backend, messing with net code and things, then Brainsuck is an attempt to make Brainfuck, a joke, more of a joke, by making it usable for backend web development 🙂.


## How does it work

It still has 8 commands like what you would expect from normal brainfuck:

* `+`: Adds 1 to current memory cell.
* `-`: Substracts 1 from current memory cell.
* `>`: Moves to next memory slot.
* `<`: Moves to previous memory slot.
* `,`: Reads 1 character from input.
* `.`: Outputs 1 character.
* `[`: If current memory slot is 0, jump to `]`.
* `]`: If current memory slot is not 0, jump to `[`.

Each memory slot is not limited to 1 byte, and you can change the amount of memory slots in `config.json`.

### Handling requests

Every time there is a request, the Brainfuck code is run once.

For simplicity, user requests are only the params of the url, for example, if you make a request to `http://127.0.0.1:5000/hello/world`, the input will be: `/hello/world`. And `,` will get each character in this input, continuously.

Though I might change this in the future which makes Brainsuck TCP and you can read the whole request body 🤔.

### Data persistance

But for a backend to be remotely useful, we need a way to store our data. Brainsuck persists the memory, which means after every execution, the memory is still there and not reset. After each request it is also stored into a file, so the next time you turn on the server and it is still there.


## Running the server

1. Write your code in `index.bf`.
2. Change port, hostname, and memory slots amount in `config.json` if you want.
3. Run `node .` in command line, and you are set!
