function toggleAddMangaModal() {
  const addManga = document.querySelector("#add-manga");
  const close = document.querySelector(".modal-close");
  const dialog = document.querySelector("#add-manga-modal");
  const cancel = document.querySelector(".modal-footer > .cancel-btn");
  const form = document.querySelector("#modal-form");
  addManga.addEventListener("click", () => {
    dialog.showModal();
  });

  close.addEventListener("click", () => {
    dialog.close();
  });

  cancel.addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("close", () => {
    form.reset();
  });
}

function createMangaCover() {
  const mangaCover = document.createElement("div");
  const image = document.createElement("img");
  image.src = "./assets/images/solo-leveling-cover.webp"; // temp image
  image.alt = "Manga cover";
  image.classList.add("manga-cover-img");
  image.loading = "lazy";

  mangaCover.classList.add("manga-cover");
  mangaCover.appendChild(image);

  return mangaCover;
}

function createCardTitle(title) {
  const cardTitle = document.createElement("h3");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = title;

  return cardTitle;
}

function createCardAuthor(author) {
  const cardAuthor = document.createElement("p");
  cardAuthor.classList.add("author");
  cardAuthor.textContent = author;

  return cardAuthor;
}

function createButton(buttonType, textContent) {
  const button = document.createElement("button");

  if (buttonType === "primary") {
    button.classList.add("primary-btn");
  }

  if (buttonType === "remove") {
    button.classList.add("remove-btn");
  }

  button.type = "button";
  button.textContent = textContent;
  button.classList.add("small-btn");

  return button;
}
function createCardOption() {
  const cardOption = document.createElement("div");
  const readNowBtn = createButton("primary", "Read Now");
  readNowBtn.classList.add("readnow");
  const removeBtn = createButton("remove", "Remove");

  cardOption.classList.add("card-option");
  cardOption.append(readNowBtn, removeBtn);

  return cardOption;
}

function createCardInfo(book) {
  const cardInfo = document.createElement("div");
  const cardTitle = createCardTitle(book.title);
  const cardAuthor = createCardAuthor(book.author);
  const cardOption = createCardOption();

  cardInfo.classList.add("card-info");
  cardInfo.append(cardTitle, cardAuthor, cardOption);

  return cardInfo;
}

function createCardItem(book) {
  const cardItem = document.createElement("div");
  const mangaCover = createMangaCover();
  const cardInfo = createCardInfo(book);

  cardItem.classList.add("card-item");

  cardItem.append(mangaCover, cardInfo);

  return cardItem;
}

const myLibrary = [];

function updateLibrary() {
  const cardContainer = document.querySelector(".card-container");

  myLibrary.forEach((book) => {
    const cardItem = createCardItem(book);
    console.log(book);
    cardContainer.appendChild(cardItem);
  });
}

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
  return new Book(title, author, chapters, readStatus);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function submitFormData() {
  const addMangaModal = document.querySelector("#add-manga-modal");
  const modalForm = document.querySelector("#modal-form");

  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector('input[name="title"]').value;
    const author = document.querySelector('input[name="author"]').value;
    const chapters = document.querySelector('input[name="chapters"]').value;
    const read = document.querySelector('input[name="read"]').checked;

    const book = createBook(title, author, chapters, read);
    addBookToLibrary(book);
    updateLibrary();
    addMangaModal.close();
  });
}

function toggleReadStatus() {
  const readNowBtn = document.querySelectorAll(".readnow");
  readNowBtn.forEach((button) => {
    button.addEventListener("click", () => {
      let readStatus =
        button.textContent === "Read Now" ? "Continue" : "Read Now";
      button.textContent = readStatus;
    });
  });
}

toggleReadStatus();
toggleAddMangaModal();
submitFormData();
