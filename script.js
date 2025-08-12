// const API_URL = "http://localhost:5000";

// async function saveEntry() {
//   const content = document.getElementById("entry").value;
//   await fetch(`${API_URL}/entry`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ content }),
//   });
//   document.getElementById("entry").value = "";
//   loadEntries();
// }

// async function loadEntries() {
//   const res = await fetch(`${API_URL}/entries`);
//   const data = await res.json();
//   const entriesDiv = document.getElementById("entries");
//   entriesDiv.innerHTML = data
//     .map(
//       (e) =>
//         `<div class="entry"><p>${e.content}</p><small>${new Date(
//           e.date
//         ).toLocaleString()}</small></div>`
//     )
//     .join("");
// }

// loadEntries();

const API_URL = "https://journal-app-1ctd.onrender.com/api/entries"; // change if deployed

// Save new entry
async function saveEntry() {
  const content = document.getElementById("entry").value.trim();
  if (!content) {
    alert("Please write something before saving!");
    return;
  }

  // We assume your backend model expects { title, content }
  // For now, send content as title too or leave title blank if optional
  const data = { title: content.substring(0, 20) || "Untitled", content };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to save entry");

    document.getElementById("entry").value = ""; // clear textarea
    loadEntries(); // refresh entries list
  } catch (err) {
    alert(err.message);
  }
}

// Load and display all entries
async function loadEntries() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to load entries");
    const entries = await res.json();

    const container = document.getElementById("entries");
    if (entries.length === 0) {
      container.innerHTML = "<p>No entries yet.</p>";
      return;
    }

    container.innerHTML = entries
      .map(
        (e) => `
      <div class="entry">
        <h3>${escapeHtml(e.title || "")}</h3>
        <p>${escapeHtml(e.content || "")}</p>
        <small>${new Date(e.createdAt).toLocaleString()}</small>
      </div>`
      )
      .join("");
  } catch (err) {
    document.getElementById("entries").innerHTML = `<p>${err.message}</p>`;
  }
}

// Simple function to escape HTML special chars to prevent XSS
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Load entries when page loads
loadEntries();
