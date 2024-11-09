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

const myLibrary = [];

function Book(title, author, chapters, readStatus) {
  this.title = title;
  this.author = author;
  this.chapters = chapters;
  this.readStatus = readStatus;
  this.info = () => {
    console.log(
      `Title: ${this.title}, Author: ${this.author}, No. of Chapters: ${this.chapters}, Read status: ${this.readStatus}`
    );
  };
}

function createBook(title, author, chapters, readStatus) {
  return (book = new Book(title, author, chapters, readStatus));
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

toggleAddMangaModal();
