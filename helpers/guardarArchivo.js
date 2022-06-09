const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
};

const leerDB = () => {
    if (!fs.existsSync(archivo)) {
        return null; // si no existe el archivo, retornar null
    }
    const info = fs.readFileSync(archivo, 'utf-8');
    const data = JSON.parse(info);

    return data;
};

module.exports = {
    guardarDB,
    leerDB,
};
