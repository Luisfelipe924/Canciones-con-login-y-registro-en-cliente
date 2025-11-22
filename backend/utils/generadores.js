import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

const generarCancion = () => ({
    id: uuidv4(),
    titulo: faker.music.songName(),
    artista: faker.person.fullName(),
    album: faker.music.album(),
    duracion: `${faker.number.int({ min: 2, max: 5 })}:${String(faker.number.int({ min: 0, max: 59 })).padStart(2, '0')}`,
    genero: faker.music.genre(),
    fechaLanzamiento: faker.date.past({ years: 20 }).toISOString().split('T')[0]

});

const generarCanciones = (cantidad) =>
    Array.from({ length: cantidad}, () => generarCancion ());

const generarPlaylist = () => {
    const cantidad = faker.number.int({ min: 3, max: 10 });
    return {
        idPlaylist: uuidv4(),
        nombre: faker.lorem.words(2),
        descripcion: faker.lorem.sentence(),
        canciones: generarCanciones(cantidad),
        creador: faker.person.fullName(),
        fechaCreacion: new Date().toISOString().split('T')[0]
        };
    };

export { generarCancion, generarPlaylist};