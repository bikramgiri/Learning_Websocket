require("dotenv").config();
// const express = require('express');
// const app = express();
// Or
const app = require("express")();
const { Server } = require("socket.io");
const DBConnect = require("./database");
const Book = require("./model/bookModel");

// *Database Connection
DBConnect();

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user is connected");
});

// *CRUD Operations of Book Model
io.on("connection", (socket) => {
  console.log("A user is connected"); // when a user is connected

  // *Add New Book
  socket.on("addBook", async (data) => {
    // event name: addBook
    try {
      if (data) {
        const { bookName, bookPrice } = data;
        const newBook = await Book.create({
          bookName,
          bookPrice,
        });
        socket.emit("response", {
          // event name: response
          status: 200,
          message: "Book added successfully",
          data: newBook,
        });
      }
    } catch (error) {
      socket.emit("response", {
        // event name: response
        status: 500,
        message: "Something went wrong",
      });
    }
  });

  // *Get All Books
  socket.on("getBooks", async () => {
    // event name: getBooks
    try {
      const books = await Book.find(); // Fetch all books from the database
      socket.emit("response", {
        // event name: response
        status: 200,
        message: "Books fetched successfully",
        data: books,
      });
    } catch (error) {
      socket.emit("response", {
        // event name: response
        status: 500,
        message: "Something went wrong",
      });
    }
  });

  // *Get a Single Book
  socket.on("getBook", async (data) => {
    // event name: getBook
      try {
      if (data) {
        const { bookId } = data;
        const book = await Book.findById(bookId);
        socket.emit("response", {
          // event name: response
              status: 200,
              message: "Book fetched successfully",
                  data: book,
            });
      }
      } catch (error) {
      socket.emit("response", {
            // event name: response
            status: 500,
            message: "Something went wrong",
              });
      }
      });
      

  // *Update a Book
  socket.on("updateBook", async (data) => {
    // event name: updateBook
    try {
      if (data) {
        const { bookId, bookName, bookPrice } = data;
        const updatedBook = await Book.findByIdAndUpdate(
          bookId,
          { bookName, bookPrice },
          { new: true }
        );
        socket.emit("response", {
          // event name: response
          status: 200,
          message: "Book updated successfully",
          data: updatedBook,
        });
      }
    } catch (error) {
      socket.emit("response", {
        // event name: response
        status: 500,
        message: "Something went wrong",
      });
    }
  });

  // *Delete a Book
  socket.on("deleteBook", async (data) => {
    // event name: deleteBook
    try {
      if (data) {
        const { bookId } = data;
        await Book.findByIdAndDelete(bookId);
        socket.emit("response", {
          // event name: response
          status: 200,
          message: "Book deleted successfully",
        });
      }
    } catch (error) {
      socket.emit("response", {
        // event name: response
        status: 500,
        message: "Something went wrong",
      });
    }
  });
});
