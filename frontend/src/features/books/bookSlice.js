// src/features/books/bookSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bookService from './bookService'  // Asegúrate de crear un servicio para manejar las peticiones a la API

const initialState = {
  books: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Crear un nuevo libro
export const createBook = createAsyncThunk(
  'books/create',
  async (bookData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await bookService.createBook(bookData, token)  // Llamada al servicio para crear el libro
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Obtener los libros del usuario
export const getBooks = createAsyncThunk(
  'books/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await bookService.getBooks(token)  // Llamada al servicio para obtener los libros
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Eliminar un libro del usuario
export const deleteBook = createAsyncThunk(
  'books/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await bookService.deleteBook(id, token)  // Llamada al servicio para eliminar el libro
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    reset: (state) => initialState,  // Acción para resetear el estado
  },
  extraReducers: (builder) => {
    builder
      // Crear libro
      .addCase(createBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.books.push(action.payload)  // Añadir el libro al estado
      })
      .addCase(createBook.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Obtener libros
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.books = action.payload  // Actualizar el estado con los libros obtenidos
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Eliminar libro
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.books = state.books.filter(
          (book) => book._id !== action.payload.id  // Eliminar el libro del estado
        )
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = bookSlice.actions
export default bookSlice.reducer
