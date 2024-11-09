const addManga = document.querySelector("#add-manga");
const close = document.querySelector(".modal-close");
const dialog = document.querySelector("#add-manga-modal");

addManga.addEventListener("click", () => {
  dialog.showModal();
});

close.addEventListener("click", () => {
  dialog.close();
});
