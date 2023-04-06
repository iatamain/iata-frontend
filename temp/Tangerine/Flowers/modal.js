const modalHTML = `
    <div class = "modal">
      <div class = "modal-content">
        <span class = "close-button">&times;</span>
        <img class = "modal-image">
      </div>
    </div>
  `;
document.querySelector("body").innerHTML += modalHTML;

const modal = document.querySelector(".modal");
const modalImage = document.querySelector(".modal-image");
const tableImages = document.querySelectorAll("table img");
const closeButton = document.querySelector(".close-button");

tableImages.forEach(function (img) {
	img.addEventListener("click", function () {    
		modalImage.src = this.src;
		modal.style.display = "flex";
	});
});

closeButton.addEventListener("click", function () {
	modal.style.display = "none";
});

window.addEventListener("click", function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
});
