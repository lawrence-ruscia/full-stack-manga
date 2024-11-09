function toggleAddMangaModal() {
  const addManga = document.querySelector("#add-manga");
  const close = document.querySelector(".modal-close");
  const dialog = document.querySelector("#add-manga-modal");
  const cancel = document.querySelector(".modal-footer > .cancel-btn");

  addManga.addEventListener("click", () => {
    dialog.showModal();
  });

  close.addEventListener("click", () => {
    dialog.close();
  });

  cancel.addEventListener("click", () => {
    dialog.close();
  });
}

toggleAddMangaModal();
