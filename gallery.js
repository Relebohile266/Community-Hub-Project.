let currentIndex = 0;
let galleryImages = [];

function openModal(src, index) {
  galleryImages = Array.from(document.querySelectorAll('.gallery-item img')).map(img => img.src);
  currentIndex = index;
  document.getElementById('modalImage').src = src;
  document.getElementById('imageModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('imageModal').style.display = 'none';
}

function changeImage(step) {
  currentIndex += step;
  if (currentIndex < 0) currentIndex = galleryImages.length - 1;
  if (currentIndex >= galleryImages.length) currentIndex = 0;
  document.getElementById('modalImage').src = galleryImages[currentIndex];
}


document.getElementById('modalImage').addEventListener('wheel', function(event) {
  event.preventDefault();
  let scale = event.deltaY < 0 ? 1.1 : 0.9;
  this.style.transform = `scale(${scale})`;
});