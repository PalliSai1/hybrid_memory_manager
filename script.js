const backendUrl = "http://localhost:5000";

async function fetchMemoryStatus() {
    try {
        const response = await fetch(`${backendUrl}/status`);
        const data = await response.json();
        updateDisplay(data.memory, data.disk);
    } catch (error) {
        console.error("Error fetching memory status:", error);
    }
}

async function simulateMemory() {
    try {
        const response = await fetch(`${backendUrl}/simulate`, { method: "POST" });
        const data = await response.json();
        updateDisplay(data.memory, data.disk);
    } catch (error) {
        console.error("Error simulating memory:", error);
    }
}

function updateDisplay(memory, disk) {
    const container = document.getElementById("memory-container");
    container.innerHTML = "";

    memory.forEach((item) => {
        const block = document.createElement("div");
        block.className = `block ram ${item !== null ? "active" : ""}`;
        block.textContent = item !== null ? item : "";
        container.appendChild(block);
    });

    disk.forEach((item) => {
        const block = document.createElement("div");
        block.className = `block disk ${item !== null ? "active" : ""}`;
        block.textContent = item !== null ? item : "";
        container.appendChild(block);
    });
}

// Fetch initial memory state on page load
fetchMemoryStatus();
