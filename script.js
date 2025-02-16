let data = null;
let isRatingFilterDesc = false;
document.addEventListener("DOMContentLoaded", () => {
  const filterInput = document.getElementById("filterInput");

  fetch("finalData.json")
    .then((response) => response.json())
    .then((jsonData) => {
      data = jsonData;
      renderTable(data);
    })
    .catch((err) => console.error("Error loading data:", err));

  filterInput.addEventListener("input", () => {
    const filterValue = filterInput.value.toLowerCase();
    const filteredData = data.filter(
      (item) =>
        item.title.toLowerCase().includes(filterValue) ||
        item.contestId.toLowerCase().includes(filterValue)
    );
    renderTable(filteredData);
  });
});

function renderTable(filteredData) {
  const tableBody = document.getElementById("tableBody");
  const filterInput = document.getElementById("filterInput");
  tableBody.innerHTML = "";
  filteredData.forEach((item) => {
    const row = document.createElement("div");
    row.classList.add("table-row");

    // ID cell
    const idCell = document.createElement("div");
    idCell.classList.add("cell");
    idCell.classList.add("id");
    idCell.textContent = item.id;
    row.appendChild(idCell);

    // Q-index cell
    const idxCell = document.createElement("div");
    idxCell.classList.add("cell");
    idxCell.classList.add("idx");
    idxCell.textContent = item.problemIndex;
    row.appendChild(idxCell);

    // Title cell
    const titleCell = document.createElement("a");
    titleCell.href = "https://leetcode.com/problems/" + item.titleSlug;
    titleCell.classList.add("cell");
    titleCell.textContent = item.title;
    row.appendChild(titleCell);

    // Rating cell
    const ratingCell = document.createElement("div");
    ratingCell.classList.add("cell");
    ratingCell.classList.add("rating");
    ratingCell.textContent = item.rating.toFixed(2);
    row.appendChild(ratingCell);

    // Contest cell
    const contestCell = document.createElement("div");
    contestCell.classList.add("cell");
    contestCell.classList.add("contest");
    contestCell.textContent = item.contestId;
    row.appendChild(contestCell);

    tableBody.appendChild(row);
  });
}

function handleSort() {
  if (!data) return;
  renderTable(
    data.sort((a, b) => (isRatingFilterDesc ? -1 : 1) * (a.rating - b.rating))
  );
  isRatingFilterDesc = !isRatingFilterDesc;
}
