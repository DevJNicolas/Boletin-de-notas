const student = {};
const saveStudent = () => {
    const studentInput = document.getElementById('estudiante').value;
    student[studentInput] = {
        materias: [],
        notas: [],
    }
    document.getElementById('estudiante').value = '';
    document.getElementById('addNotes').classList.remove('d-none');

}
const viewStudent = () => {
    const arrayStudents = Object.entries(student);
    arrayStudents.forEach(student => {
        const html = `
            <div id="student">
                <div class="nameCalification">
                    ${student[0]}
                </div>
                <div class="numberCalification">    
                          
                </div>
            </div>
        `;
        document.querySelector('#container_students').innerHTML += html;
    })
}

const addNotesStudents = () => {
    const agregar = (data) => {
        const option = document.createElement('option');
        option.value = data;
        option.text = data;
        return option
    };
    let claves = Object.keys(student);
    for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];
        document.getElementById("selectStudent").appendChild(agregar(clave));
    }
    document.getElementById('containerSaveNotesStudents').classList.remove('d-none');
    document.getElementById('containerSaveStudents').classList.add('d-none');
}

//Agrego notas
const califications = [];
const school = [];
const saveCalification = () => {
    const estudiante = document.getElementById('selectStudent').value;
    if (estudiante === '') {
        alert('Debe completar el campo estudiante');
        return;
    }
    const materia = document.getElementById('materia').value;
    if (materia === '') {
        alert('Debe completar el campo materia');
        return;
    }
    const nota = document.getElementById('nota').value;
    if (nota === '') {
        alert('Debe completar el campo nota');
        return;
    }
    student[estudiante]['materias'].push(materia);
    student[estudiante]['notas'].push(nota);
    document.getElementById('materia').value = '';
    document.getElementById('nota').value = '';
}

//Calificaciones
function viewCalification() {
    document.querySelector('#container_calification').innerHTML = "";
    let claves = Object.keys(student);
    for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];
        let { materias, notas } = student[clave];

        materias.forEach((materia, index) => {
            viewData(clave, materia, notas[index]);
        });
        document.getElementById(`student${clave}`).innerHTML = clave;
    }

}
//Promedio
function average() {
    document.querySelector('#container_calification').innerHTML = "";
    let claves = Object.keys(student);
    for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];
        let { notas } = student[clave];
        const cant = notas.length;
        let sum = 0;
        notas.forEach((nota, index) => {
            sum += parseInt(nota);
        });
        const average = sum / cant;
        viewData(clave, average, 'Promedio');
        document.getElementById(`student${clave}`).innerHTML = clave;
    }
}
//Notas mas altas
function noteHigh() {
    document.querySelector('#container_calification').innerHTML = "";
    let claves = Object.keys(student);
    for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];
        let { notas, materias } = student[clave];
        let notes = 0, position = 0;
        notas.forEach((nota, index) => {
            if (nota > notes) {
                notes = nota;
                position = index;
            }
        })
        viewData(clave, notes, 'Nota mas alta: ' + materias[position]);
        document.getElementById(`student${clave}`).innerHTML = clave;
    } 
}


//Muestra aplazamiento
function postponement() {

    
    document.querySelector('#container_calification').innerHTML = "";
    let claves = Object.keys(student);
    for (let i = 0; i < claves.length; i++) {
        let noPostponement = false;
        let clave = claves[i];

        let { notas, materias } = student[clave];

        notas.forEach((nota, index) => {
            if (nota < 30) {
                viewData(clave, nota, materias[index]);
                noPostponement = true;
            }
        })
        if (!noPostponement) {
            viewData(clave, '😀', "No hay aplazo");
        }
        document.getElementById(`student${clave}`).innerHTML = clave;
    }
    
}


//Muestra información en pantalla
function viewData(name, dato1, dato2) {
    const html = `
        <div id="calification">
            <h1 id='student${name}'></h1>
            <div class="nameCalification">
                ${dato1}
            </div>
            <div class="numberCalification">    
                ${dato2}         
            </div>
        </div>
        `;
    document.querySelector('#container_calification').innerHTML += html;
}

