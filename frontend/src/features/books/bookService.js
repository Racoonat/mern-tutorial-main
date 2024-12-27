// src/features/books/bookService.js
import axios from 'axios'

const API_URL = '/api/books/'

// Crear un nuevo libro
const createBook = async (bookData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, bookData, config)
  return response.data
}

// Obtener todos los libros del usuario
const getBooks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

// Eliminar un libro
const deleteBook = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + id, config)
  return response.data
}

const bookService = {
  createBook,
  getBooks,
  deleteBook,
}

export default bookService
