let events = JSON.parse(localStorage.getItem("events")) || [];

document.querySelector("#submit").addEventListener("click", addEvent)

function save() {
    localStorage.setItem("events", JSON.stringify(events));
}

function addEvent() {
    const title = document.querySelector("#title").value;
    const date = document.querySelector("#date").value;
}

function deleteEvent(id) {
    events = events.filter(e => e.id !== id);
    save();
    render();
}

function clearEvents() {
    if (confirm("Delete all events?")) {
        events = [];
        save();
        render();
    }
}

function render() {
    const container = document.getElementById("events");
    container.innerHTML = "";

    if (events.length === 0) {
        container.innerHTML = "<p class='small'>No events added yet.</p>";
        return;
    }

    events.forEach(e => {
        const div = document.createElement("div");
        div.className = "event-card";
        div.innerHTML = `
            <button class="delete-btn" onclick="deleteEvent(${e.id})">X</button>
            <h3>${e.title}</h3>
            <div class="small">${e.date} | ${e.category}</div>
            <p>${e.desc || ""}</p>
        `;
        container.appendChild(div);
    });
}

render();