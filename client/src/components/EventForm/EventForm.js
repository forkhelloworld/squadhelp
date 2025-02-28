import { useFormik } from 'formik'
import moment from 'moment'
import validationSchema from "../../validators/validationSchems"


const EventForm = ({ addTimer }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      date: '',
      time: ''
    },
    validationSchema: validationSchema.EventSchema,
    onSubmit: (values, { resetForm }) => {
      const eventTime = moment(
        `${values.date} ${values.time}`,
        'YYYY-MM-DD HH:mm'
      ).valueOf()
      addTimer(values.name, eventTime)
      resetForm()
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className='input-container'>
      <input
        type='text'
        name='name'
        placeholder='Назва події'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        className={formik.touched.name && formik.errors.name ? 'error' : ''}
      />
      {formik.touched.name && formik.errors.name && (
        <div className='error-message'>{formik.errors.name}</div>
      )}

      <input
        type='date'
        name='date'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.date}
        className={formik.touched.date && formik.errors.date ? 'error' : ''}
      />
      {formik.touched.date && formik.errors.date && (
        <div className='error-message'>{formik.errors.date}</div>
      )}

      <input
        type='time'
        name='time'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.time}
        className={formik.touched.time && formik.errors.time ? 'error' : ''}
      />
      {formik.touched.time && formik.errors.time && (
        <div className='error-message'>{formik.errors.time}</div>
      )}

      <button type='submit' className='add-button'>
        Додати таймер
      </button>
    </form>
  )
}

export default EventForm
