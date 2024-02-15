import { useState } from "react";
import { Formik, Form, Field } from "formik";
import './Header.css'
import './Content.css'
import './Article.css'

const App = () => {
  const [photos, setPhotos] = useState([])

  const open = (url) => {
    window.open(url)
  }

  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values => {
            // Llamado a la api de unsplash
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=23&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID bgm7JnKW3Y0xTsvJaoNgMOeXbi5W2HBnN0VMawa4CEY'
              }
            })

            const data = await response.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name="search" placeholder="Buscador de imagenes"/>
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo => 
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt={photo.description}/>
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>
          )}
        </div>
      </div>
     </div>
  );
}

export default App