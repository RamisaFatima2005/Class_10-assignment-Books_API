import { NextResponse } from 'next/server';

const books = [
  { id: 1, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling" },
  { id: 2, title: "You Are a Badass", author: "Jen Sincero" },
  { id: 3, title: "The Four Agreements", author: "Don Miguel Ruiz" },
  { id: 4, title: "Dare to Lead", author: "Brené Brown" },
];

// Retrieve list of books

export async function GET(){
  try{
      return NextResponse.json(books,  {status:200})
  }catch(error){
      return NextResponse.json(
      {message:"Error Fetching Books"},
      {status:500}
  )
  }
}

// Add a new book

export async function POST(request: Request) {
  try {
      const { id, title, author } = await request.json();
      const newBook = { id, title, author };

      books.push(newBook);

      return NextResponse.json(
          { message: "Book added successfully", book: newBook },
          { status: 201 }
      );
  } catch (error) {
      return NextResponse.json(
          { message: "Error adding the book" },
          { status: 500 }
      );
  }
}


// Update a book by id

export async function PUT(request: Request) {
  try {
      const { id, title, author } = await request.json();
      const bookIndex = books.findIndex((book) => book.id === id);

      if (bookIndex === -1) {
          return NextResponse.json(
              { message: "Book not found" },
              { status: 404 }
          );
      }

      books[bookIndex] = { id, title, author };

      return NextResponse.json(
          { message: "Book updated successfully", book: books[bookIndex] },
          { status: 200 }
      );
  } catch (error) {
      return NextResponse.json(
          { message: "Error updating the book" },
          { status: 500 }
      );
  }
}

// Delete a book by id

export async function DELETE(request: Request) {
  try {
      const { id } = await request.json();
      const bookIndex = books.findIndex((book) => book.id === id);

      if (bookIndex === -1) {
          return NextResponse.json(
              { message: "Book not found" },
              { status: 404 }
          );
      }

      books.splice(bookIndex, 1);

      return NextResponse.json(
          { message: "Book deleted successfully" },
          { status: 200 }
      );
  } catch (error) {
      return NextResponse.json(
          { message: "Error deleting the book" },
          { status: 500 }
      );
  }
}
