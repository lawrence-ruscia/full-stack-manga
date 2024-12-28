class Library {
  #myLibrary = [];

  addBook(book) {
    this.#myLibrary.push(book);
  }

  removeBook(bookIndex) {
    if (bookIndex > -1) {
      this.#myLibrary.splice(bookIndex, 1);
    }
  }

  size() {
    return this.#myLibrary.length;
  }
}

class Book {
  #title;
  #author;
  #chapters;
  #readStatus;

  constructor(title, author, chapters, readStatus) {
    this.#title = title;
    this.#author = author;
    this.#chapters = chapters;
    this.#readStatus = readStatus;
  }

  get title() {
    return this.#title;
  }

  get author() {
    return this.#author;
  }

  get chapters() {
    return this.#chapters;
  }

  get readStatus() {
    return this.#readStatus;
  }
}

class CardHandler {
  #book;

  constructor(book) {
    this.#book = book;
  }

  #createMangaCover() {
    const mangaCover = document.createElement("div");
    const image = document.createElement("img");
    image.src = "./assets/images/placeholder.png"; // temp image
    image.alt = "Manga cover";
    image.classList.add("manga-cover-img");
    image.loading = "lazy";

    mangaCover.classList.add("manga-cover");
    mangaCover.appendChild(image);

    return mangaCover;
  }

  #createCardTitle(title) {
    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = title;

    return cardTitle;
  }

  #createCardAuthor(author) {
    const cardAuthor = document.createElement("p");
    cardAuthor.classList.add("author");
    cardAuthor.textContent = author;

    return cardAuthor;
  }

  #createButton(buttonType, textContent) {
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

  #createCardOption(readStatus) {
    const cardOption = document.createElement("div");
    const readStatusText = readStatus ? "Continue" : "Read Now";
    const readNowBtn = this.#createButton("primary", readStatusText);
    readNowBtn.classList.add("readnow");
    const removeBtn = this.#createButton("remove", "Remove");

    cardOption.classList.add("card-option");
    cardOption.append(readNowBtn, removeBtn);

    return cardOption;
  }

  #createCardInfo() {
    const cardInfo = document.createElement("div");
    const cardTitle = this.#createCardTitle(this.#book.title);
    const cardAuthor = this.#createCardAuthor(this.#book.author);
    const cardOption = this.#createCardOption(this.#book.readStatus);

    cardInfo.classList.add("card-info");
    cardInfo.append(cardTitle, cardAuthor, cardOption);

    return cardInfo;
  }

  createCardItem() {
    const cardItem = document.createElement("div");
    const mangaCover = this.#createMangaCover();
    const cardInfo = this.#createCardInfo();

    cardItem.classList.add("card-item");

    cardItem.append(mangaCover, cardInfo);

    return cardItem;
  }
}

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

function renderBook(book, index) {
  console.log(book);
  const cardContainer = document.querySelector(".card-container");

  const cardItem = new CardHandler(book).createCardItem();
  cardItem.dataset.index = index;

  cardContainer.appendChild(cardItem);
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

    const book = new Book(title, author, chapters, read);
    const library = new Library();
    library.addBook(book);

    renderBook(book, library.size() - 1);
    addMangaModal.close();
  });
}

function toggleReadStatus() {
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("readnow")) {
      target.textContent =
        target.textContent.trim() === "Read Now" ? "Continue" : "Read Now";
    }
  });
}

function removeBookCard() {
  const cardContainer = document.querySelector(".card-container");

  cardContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const card = e.target.closest(".card-item");
      const bookIndex = card.dataset.index;

      if (card) {
        const library = new Library();
        library.removeBook(bookIndex);
        card.remove();
      }
    }
  });
}

toggleReadStatus();
toggleAddMangaModal();
removeBookCard();
submitFormData();
