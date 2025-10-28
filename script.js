// Cantidad de Pokémon que se mostrarán por carga
const limit = 10;

// Desde qué posición empezar a cargar (0 = desde el primero)
let offset = 0;

// Referencias a los elementos HTML donde se mostrarán los Pokémon y el botón
const contenedor = document.getElementById("contenedor-pokemon");
const boton = document.getElementById("btn-cargar");

// Función asíncrona para obtener datos desde la PokéAPI
async function obtenerDatos() {
  try {
    // Solicita la lista de Pokémon desde la API con los parámetros offset y limit
    const respuesta = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );

    // Convierte la respuesta a formato JSON (objeto JavaScript)
    const datos = await respuesta.json();

    // Muestra en la consola la estructura general
    console.log(datos);

    // Llama a la función que mostrará los Pokémon en la pantalla
    mostrarEnPantalla(datos.results);

    // Aumenta el offset para la próxima carga
    offset += limit;
  } catch (error) {
    // Si ocurre un error durante la solicitud, se muestra en la consola
    console.error("Error al obtener datos:", error);
  }
}

// Función que recibe la lista de Pokémon y los muestra en el DOM
async function mostrarEnPantalla(pokemones) {
  // Recorre cada Pokémon básico (solo tiene nombre y URL)
  for (const pokemon of pokemones) {
    // Hace una segunda petición para obtener los datos detallados de cada Pokémon
    const respuesta = await fetch(pokemon.url);
    const datosPokemon = await respuesta.json();

    // Crea un contenedor (tarjeta) para mostrar la información del Pokémon
    const card = document.createElement("div");
    card.classList.add("card");

    // Inserta en el HTML el nombre, imagen, altura y peso
    card.innerHTML = `
      <h3>${datosPokemon.name}</h3>
      <img src="${datosPokemon.sprites.front_default}" alt="${datosPokemon.name}">
      <p>Altura: ${datosPokemon.height}</p>
      <p>Peso: ${datosPokemon.weight}</p>
    `;

    // Agrega la tarjeta dentro del contenedor principal
    contenedor.appendChild(card);
  }
}

// Asigna la función obtenerDatos al botón para cargar más Pokémon
boton.addEventListener("click", obtenerDatos);

// Carga inicial automática (los primeros Pokémon)
obtenerDatos();
