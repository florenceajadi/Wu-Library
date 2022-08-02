let books;

async function renderBooks(filter) {
  const booksWrapper = document.querySelector(".books");

  booksWrapper.classList += ' books__loading'

  if (!books) {
    books = await getBooks();
  }
  
  booksWrapper.classList.remove('books__loading')

  if (filter === "LOW_TO_HIGH") {
    books.sort(
      (a, b) =>
        (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
    );
  } else if (filter === "HIGH_TO_LOW") {
    books.sort(
      (a, b) =>
        (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
    );
  } else if (filter === "RATING") {
    books.sort((a, b) => b.rating - a.rating);
  }

  const booksHtml = books
    .map((book) => {
      return `<div class="book">
    <figure class="book__img--wrapper">
      <img class="book__img" src="${book.url}" alt="">
    </figure>
    <div class="book__title">
      ${book.title}
    </div>
    <div class="book__ratings">
      ${ratingsHTML(book.rating)}
    </div>
    <div class="book__price">
      ${priceHTML(book.originalPrice, book.salePrice)}
    </div>
  </div>`;
    })
    .join("");

  booksWrapper.innerHTML = booksHtml;
}

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `$${originalPrice.toFixed(2)}`;
  }
  return `<span class="book__price--normal">$${originalPrice.toFixed(
    2
  )}</span>$${salePrice.toFixed(2)}`;
}

function ratingsHTML(rating) {
  let ratingHTML = "";
  for (let i = 0; i < Math.floor(rating); ++i) {
    ratingHTML += '<i class="fas fa-star"></i>\n';
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fas fa-star-half-alt"></i>\n';
  }
  return ratingHTML;
}

function filterBooks(event) {
  renderBooks(event.target.value);
}

setTimeout(() => {
  renderBooks();
});

// FAKE DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
            id: 1,
            title: "The RZA - The Tao of Wu",
            url: "./imgs/tao.jpg",
            originalPrice:17.00,
            salePrice: 12.99,
            rating: 5,
        },

        {
            id: 2,
            title: "Raekwon - From Staircase To Stage",
            url: "./imgs/raekwon.jpg",
            originalPrice: 10.00,
            salePrice: null,
            rating: 4.5,
        },

        {
            id: 3,
            title: "The RZA - The Wu-Tang Manual",
            url: "./imgs/rza.jpg",
            originalPrice: 40.00,
            salePrice: 18.39,
            rating: 4.5,
        },

        {
            id: 4,
            title: "U-God - RAW: My Journey Into The Wu-Tang",
            url: "./imgs/ugod.jpg",
            originalPrice: 14.94,
            salePrice: 8.94,
            rating: 4.5,
        },

        {
            id: 5,
            title: "Sun Tzu - The Art of War",
            url: "./imgs/sunzu.jpg",
            originalPrice: 14.99,
            salePrice: 11.91,
            rating: 3.5,
        },

        {
            id: 6,
            title: "Curtis '50-Cent' Jackson - Hustle Harder",
            url: "./imgs/curtis.jpg",
            originalPrice: 17.99,
            salePrice: 13.96,
            rating: 4.5,
        },

        {
            id: 7,
            title: "Robert Greene - The 48 Laws of Power",
            url: "./imgs/law.jpg",
            originalPrice: 26.00,
            salePrice: 11.50,
            rating: 4.5,
        },

        {
            id: 8,
            title: "James Clear - Atomic Habits",
            url: "./imgs/atomic.jpg",
            originalPrice: 27.00,
            salePrice:11.98,
            rating: 5,
        },

        {
            id: 8,
            title: "Paulo Coelho - The Alchemists",
            url: "./imgs/alchemist.jpg",
            originalPrice: 22.30,
            salePrice:11.49,
            rating: 4.5,
        },

        {
            id: 8,
            title: "Joseph Murphy - The Power of Your Subconscious Mind",
            url: "./imgs/murphy.jpg",
            originalPrice: 10.99,
            salePrice: 5.75,
            rating: 4.5,
        },

        {
            id: 9,
            title: "Rakim - Sweat The Technique",
            url: "./imgs/rakim.jpg",
            originalPrice: 20.00,
            salePrice: 18.36,
            rating: 5,
        },

        {
            id: 10,
            title: "Viktor E. Frankl - Man's Search For Meaning",
            url: "./imgs/frankl.jpg",
            originalPrice: 20.00,
            salePrice: 17.45,
            rating: 4.5,
        },
    ]);
  }, 1000);
});
}
