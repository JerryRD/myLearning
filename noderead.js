var read = require('readline')

var rl = read.createInterface({
    input: process.stdin,
    output: process.stdout
})

var lineNum = -1
var clockNum = 0
var readData = []

rl.on('line', (line) => {
    if (lineNum < 0) {
        return lineNum = parseInt(line.trim()) + 2, clockNum = parseInt(line.trim())
    }
    
    readData.push(line.trim().split(' '))
    if (--lineNum === 0) {
      
        rl.close()
    }
})

rl.on('close', () => {
    process.exit(0);
})
