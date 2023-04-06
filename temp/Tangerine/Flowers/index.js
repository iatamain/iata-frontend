const searchInput = document.querySelector("#search");
const flowersTableBody = document.querySelector("#flowers-tbody");

searchInput.addEventListener("input", (e) => {
  console.log(e);
	const filter = e.target.value.toLowerCase();
	const rows = flowersTableBody.querySelectorAll("tr");
	rows.forEach(function (row) {
		const flowerName = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
		if (flowerName.includes(filter)) {
			row.style.display = "table-row";
		} else {
			row.style.display = "none";
		}
	});
});
