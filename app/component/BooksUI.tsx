"use client";
import { useEffect, useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
}

export default function BooksUI() {
  const [books, setBooks] = useState<Book[]>([]);
  const [id, setId] = useState<number | ''>('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await fetch('/api/books');
    const data = await res.json();
    setBooks(data);
  };

  const findNextId = () => {
    const ids = books.map((book) => book.id);
    let nextId = 1;
    while (ids.includes(nextId)) {
      nextId++;
    }
    return nextId;
  };

  const validateAndAddBook = () => {
    if (id === '' || !title || !author) {
      alert('All fields are required');
      return;
    }

    if (books.some((book) => book.id === id)) {
      const nextId = findNextId();
      alert(`ID ${id} already exists. Please use ID ${nextId}`);
      setId(nextId); // Suggest the next available ID
      return;
    }

    addBook();
  };

  const addBook = async () => {
    await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Number(id), title, author }),
    });
    setId('');
    setTitle('');
    setAuthor('');
    fetchBooks();
  };

  const updateBook = async (id: number) => {
    await fetch('/api/books', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title, author }),
    });
    setId('');
    setTitle('');
    setAuthor('');
    setEditId(null);
    fetchBooks();
  };

  const deleteBook = async (id: number) => {
    await fetch('/api/books', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchBooks();
  };

  const handleEdit = (book: Book) => {
    setEditId(book.id);
    setId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-[url('/bg1.jpeg')] h-auto rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Books List</h1>
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="number"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(Number(e.target.value))}
          className="p-2 border border-black rounded-md focus:outline-none focus:ring focus:border-black"
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border border-black rounded-md focus:outline-none focus:ring focus:border-black"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="p-2 border border-black rounded-md focus:outline-none focus:ring focus:border-black"
        />
        <button
          onClick={() => (editId ? updateBook(editId) : validateAndAddBook())}
          className={`px-4 py-2 rounded-md text-white ${
            editId ? 'bg-amber-900 text-white rounded hover:bg-amber-700 border border-4 border-rose-950' : 'bg-black hover:bg-zinc-800 border border-4 border-black'
          }`}
        >
          {editId ? 'Update Book' : 'Add Book'}
        </button>
      </div>
      <ul className="space-y-4">
        {books.map((book) => (
          <li
            key={book.id}
            className="flex justify-between items-center p-4 border border-orange-950 rounded-md shadow-sm"
          >
            <div>
              <p className="font-medium">{book.title}</p>
              <p className="text-gray-600">by {book.author}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(book)}
                className="px-3 py-1 text-sm font-semibold bg-amber-900 text-white rounded hover:bg-amber-700 border border-4 border-rose-950"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBook(book.id)}
                className="px-3 py-1 text-sm font-semibold bg-red-900 text-white rounded hover:bg-red-700 border border-4 border-red-950"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
