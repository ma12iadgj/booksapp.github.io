const judulBukuInput = document.getElementById('judul-buku');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const rakBukuSelect = document.getElementById('rak-buku');
const btnTambah = document.getElementById('btn-tambah');
const belumSelesaiDiv = document.getElementById('belum-selesai');
const sudahDibacaDiv = document.getElementById('sudah-dibaca');

let dataBuku = [];

function loadBukuFromStorage() {
  const storedData = localStorage.getItem('dataBuku');
  if (storedData) {
    dataBuku = JSON.parse(storedData);
    renderDaftarBuku();
  }
}

function saveBukuToStorage() {
  localStorage.setItem('dataBuku', JSON.stringify(dataBuku));
}

function addBook() {
  const judulBuku = judulBukuInput.value.trim();
  const author = authorInput.value.trim();
  const year = parseInt(yearInput.value.trim());
  const rakBuku = rakBukuSelect.value;

  if (judulBuku && author && year && rakBuku) {
    const newBook = {
      id: Date.now(),
      title: judulBuku,
      author: author,
      year: year,
      isComplete: rakBuku === 'sudah-dibaca' ? true : false
    };

    dataBuku.push(newBook);
    saveBukuToStorage();
    renderDaftarBuku();
    judulBukuInput.value = '';
    authorInput.value = '';
    yearInput.value = '';
  } else {
    alert('Judul buku, penulis, tahun, dan rak harus diisi.');
  }
}

function renderDaftarBuku() {
  belumSelesaiDiv.innerHTML = '<h2>Belum Selesai Dibaca</h2>';
  sudahDibacaDiv.innerHTML = '<h2>Sudah Selesai Dibaca</h2>';
  
  dataBuku.forEach(book => {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');
    bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>Penulis: ${book.author}</p>
      <p>Tahun Terbit: ${book.year}</p>
      <p>Rak: ${book.isComplete ? 'Sudah Selesai Dibaca' : 'Belum Selesai Dibaca'}</p>
      <button onclick="moveBook(${book.id}, '${book.isComplete ? 'belum-selesai' : 'sudah-dibaca'}')">Pindah</button>
      <button onclick="deleteBook(${book.id})">Hapus</button>
    `;

    if (book.isComplete) {
      sudahDibacaDiv.appendChild(bookItem);
    } else {
      belumSelesaiDiv.appendChild(bookItem);
    }
  });
}

function deleteBook(bookId) {
  dataBuku = dataBuku.filter(book => book.id !== bookId);
  saveBukuToStorage();
  renderDaftarBuku();
}

function moveBook(bookId, newRak) {
  dataBuku = dataBuku.map(book => {
    if (book.id === bookId) {
      book.isComplete = newRak === 'sudah-dibaca' ? true : false;
    }
    return book;
  });
  saveBukuToStorage();
  renderDaftarBuku();
}

// Load existing data from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  loadBukuFromStorage();
});

// Event listener for tambah button
btnTambah.addEventListener('click', addBook);
