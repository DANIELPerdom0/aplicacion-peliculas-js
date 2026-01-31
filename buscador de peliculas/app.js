const API_KEY = 'd411d5d80a992fcc8d0e3d3acf150706'
const urlBase = 'https://api.themoviedb.org/3/search/movie'

const form = document.getElementById('form')
const input = document.getElementById('searchInput')
const results = document.getElementById('results')
const message = document.getElementById('message')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  buscarPeliculas()
})

async function buscarPeliculas() {
  const query = input.value.trim()
  results.innerHTML = ''
  message.textContent = ''

  if (query === '') {
    message.textContent = '⚠️ Tienes que escribir algo'
    return
  }

  try {
    const response = await fetch(
      `${urlBase}?api_key=${API_KEY}&query=${query}&language=es-ES`
    )
    const data = await response.json()

    if (data.results.length === 0) {
      message.textContent = '❌ No se encontraron resultados'
      return
    }

    data.results.forEach(movie => {
      if (!movie.poster_path) return

      const div = document.createElement('div')
      div.className = 'movie'

      div.innerHTML = `
        <div class="movie-img">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        </div>
        <div class="movie-info">
          <h2>${movie.title}</h2>
          <p>${movie.overview || 'Sin descripción disponible'}</p>
        </div>
      `

      results.appendChild(div)
    })

  } catch (error) {
    message.textContent = '❌ Error al buscar películas'
    console.error(error)
  }
}
