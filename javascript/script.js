
const accessKey = "7ef2OfGDv4yM5Red5w4Pmiaf-hHPkmc5eU52nFVxx1Q";
const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const details = document.getElementById("details");
const close = document.getElementById("close");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let images = [];
let currentIndex = 0;

async function fetchImages() {
    const response = await fetch(`https://api.unsplash.com/photos?client_id=${accessKey}`);
    const data = await response.json();
    images = data;
    displayImages(data);
}

function displayImages(images) {
    images.forEach((image, index) => {
        const img = document.createElement("img");
        img.src = image.urls.small;
        img.alt = image.alt_description || "Unsplash Image";
        img.classList.add("masonry-item");
        img.dataset.index = index;
        gallery.appendChild(img);
    });
}

function showModal(index) {
    currentIndex = index;
    const image = images[index];
    modalImage.src = image.urls.regular;
    details.innerHTML = `
            <p><strong>Description:</strong> ${image.alt_description || "N/A"}</p>
            <p><strong>Author:</strong> ${image.user.name}</p>
            <p><strong>Downloads:</strong> ${image.downloads || "N/A"}</p>
        `;
    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
}

function navigate(direction) {
    if (direction === "prev") {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    } else if (direction === "next") {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    }
    showModal(currentIndex);
}

gallery.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        const index = parseInt(e.target.dataset.index);
        showModal(index);
    }
});

close.addEventListener("click", closeModal);
prevButton.addEventListener("click", () => navigate("prev"));
nextButton.addEventListener("click", () => navigate("next"));

window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

fetchImages();
