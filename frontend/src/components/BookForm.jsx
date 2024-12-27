import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBook } from '../features/books/bookSlice'  // Asegúrate de importar la acción para crear un libro

function BookForm() {
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState('')
  const [status, setStatus] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    // Asegúrate de pasar un objeto con todas las propiedades del libro
    dispatch(createBook({ title, rating, status }))
    
    // Limpiar los campos del formulario después de añadir el libro
    setTitle('')
    setRating('')
    setStatus('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Book Title</label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className='form-group'>
          <label htmlFor='rating'>Rating (1-5)</label>
          <input
            type='number'
            name='rating'
            id='rating'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />
        </div>

        <div className='form-group'>
          <label htmlFor='status'>Status</label>
          <select
            name='status'
            id='status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Book
          </button>
        </div>
      </form>
    </section>
  )
}

export default BookForm
