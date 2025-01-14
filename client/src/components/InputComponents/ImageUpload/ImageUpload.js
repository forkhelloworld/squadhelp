import { useState } from 'react'
import classNames from 'classnames'
import { Field } from 'formik'

const ImageUpload = props => {
  const [preview, setPreview] = useState(null)
  const { uploadContainer, inputContainer, imgStyle } = props.classes
  const { name } = props
  return (
    <Field>
      {props => {
        const onChange = e => {
          const file = e.target.files[0]
          const imageType = /image.*/
          if (!file.type.match(imageType)) {
            e.target.value = ''
          } else {
            props.form.setValues({ ...props.form.values, [name]: file })
            const reader = new FileReader()
            reader.onload = () => {
              setPreview(reader.result)
            }
            reader.readAsDataURL(file)
          }
        }
        return (
          <div className={uploadContainer}>
            <div className={inputContainer}>
              <span>Support only images (*.png, *.gif, *.jpeg)</span>
              <input
                id='fileInput'
                type='file'
                accept='.jpg, .png, .jpeg'
                onChange={onChange}
              />
              <label htmlFor='fileInput'>Chose file</label>
            </div>
            <img
              src={preview}
              id='imagePreview'
              className={classNames(imgStyle)}
              alt='user'
            />
          </div>
        )
      }}
    </Field>
  )
}

export default ImageUpload
