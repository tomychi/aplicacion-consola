require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
    inquirerMenu,
    pause,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist,
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();

    const tareaDB = leerDB();

    if (tareaDB) {
        // cargar tareas
        tareas.cargarTareasFromArray(tareaDB);
    }

    do {
        // imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Ingrese descripcion de la tarea');
                tareas.crearTarea(desc);
                break;
            case '2':
                // listar opcion
                tareas.listadoCompletado();
                break;
            case '3':
                // listar completasdas
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                // listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                // completado || pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                // borrar tarea
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar(
                        'Estas seguro de borrar la tarea?'
                    );
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('tarea borrada'.red);
                    }
                }

                break;
        }

        guardarDB(tareas.listadoArr);

        await pause();
    } while (opt !== '0');
};

main();
