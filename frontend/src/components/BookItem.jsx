import { useDispatch } from 'react-redux'
import { deleteBook } from '../features/books/bookSlice'  // Asegúrate de tener la acción `deleteBook` en tu slice de libros

function BookItem({ book }) {
  const dispatch = useDispatch()

  return (
    <div className='book'>
      <div>{new Date(book.createdAt).toLocaleString('en-US')}</div>  {/* Fecha de creación del libro */}
      <h2>{book.title}</h2>  {/* Título del libro */}
      <p>Rating: {book.rating}</p>  {/* Rating del libro */}
      <p>Status: {book.status}</p>  {/* Estado del libro (unread, read, pending) */}
      <button onClick={() => dispatch(deleteBook(book._id))} className='close'>
        X  {/* Botón para eliminar el libro */}
      </button>
    </div>
  )
}

export default BookItem