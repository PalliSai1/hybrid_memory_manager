const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const ramSize = 10;
const diskSize = 10;
let memory = Array(ramSize).fill(null);
let disk = Array(diskSize).fill(null);
let counter = 0;

// Simulate memory allocation
app.post('/simulate', (req, res) => {
    let process = `P${counter++}`;

    let freeRamIndex = memory.indexOf(null);
    if (freeRamIndex !== -1) {
        memory[freeRamIndex] = process;
    } else {
        let removed = memory.shift();
        memory.push(process);
        let freeDiskIndex = disk.indexOf(null);
        if (freeDiskIndex !== -1) {
            disk[freeDiskIndex] = removed;
        }
    }
    res.json({ memory, disk });
});

// Get current memory state
app.get('/status', (req, res) => {
    res.json({ memory, disk });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
