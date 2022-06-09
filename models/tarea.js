const { v4: uuidv4 } = require('uuid');

class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc) {
        this.id = uuidv4(); // crea identificador unico
        this.desc = desc;
        this.completadoEn = null;
    }
}

module.exports = Tarea;
