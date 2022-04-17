var selectRow = null;//variable global para ocupar en varios lados
var alumnos = []

actualizarPagina()//ver si hay algo en el local Storage

function onSubmitForm() {
   if(validate()){//si manda true hace lo de adentro

        var formData = readForm(); //lo que retorna formData se guarda aqui
        if(selectRow == null){//si la fila esta vacioa incerta new
        insertNewRecord(formData);  
        }else{
        updateRecord(formData);
        }  
        resetForm(); //despues de insertarlos valores resetea el formulario
   }
}

function readForm() { //Leer datos de cada variable en un objeto
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["matricula"] = document.getElementById("matricula").value;
    formData["semestre"] = document.getElementById("semestre").value;
    formData["carrera"] = document.getElementById("carrera").value;
    return formData; //retorna formData
}

function insertNewRecord(formData) {//insertarun nuevo registro
    var table = document.getElementById("pantalla").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = formData.fullName;

    cell2 = newRow.insertCell(1);
    cell2.innerHTML = formData.matricula;
    
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = formData.semestre;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = formData.carrera;

    cell5 = newRow.insertCell(4); //celda para los botones edit y eliminar
    cell5.innerHTML = `<a onClick="editForm(this)">Edit</a> <a onClick="deleteRecord(this)">Delete</a>`;
    alumnos.push(formData)
    localStorage.setItem('alumnos',JSON.stringify(alumnos))
  
}

function resetForm(){ //resetea el valor de los imput
    document.getElementById('fullName').value = ""
    document.getElementById('matricula').value = ""
    document.getElementById('semestre').value = ""
    document.getElementById('carrera').value = ""
    selectRow = null; //cada que resetee lo vuelve nulo
}

function deleteRecord(a){ //boton eliminar
    var row = a.parentElement.parentElement
    if(confirm('Desea eliminar la informacion?')){ //desea eliminar? en caso que si
        document.getElementById('pantalla').deleteRow(row.rowIndex) //lo elimina
        console.log(row)
        alumnos.splice(row.Index-1,1)//elimina o edita elementos de un array(indice-1, )
        localStorage.setItem('alumnos',JSON.stringify(alumnos))
    }
    
}

function editForm(a){ //boton editar
    selectRow = a.parentElement.parentElement //dara el padre del padre del elemento a
    document.getElementById('fullName').value = selectRow.cells[0].innerHTML //celda seleccionada me da lo que tiene
    document.getElementById('matricula').value = selectRow.cells[1].innerHTML
    document.getElementById('semestre').value = selectRow.cells[2].innerHTML
    document.getElementById('carrera').value = selectRow.cells[3].innerHTML
}
function updateRecord(formData){ //editar en el boton submit
    selectRow.cells[0].innerHTML = formData.fullName
    selectRow.cells[1].innerHTML = formData.matricula
    selectRow.cells[2].innerHTML = formData.semestre
    selectRow.cells[3].innerHTML = formData.carrera
    alumnos.splice(selectRow.index-1,1,{fullName:formData.fullName, matricula: formData.matricula, semestre: formData.semestre, carrera: formData.carrera })
    localStorage.setItem('alumnos',JSON.stringify(alumnos))
}

//VALIDAR DATOS EN LA TABLA
function validate(){
    isValid = true;
    if(document.getElementById('fullName').value == ''){
        isValid = false;
        document.getElementById('fullNameValidationError').classList.remove('hide')
    }else{
        isValid = true
        if(!document.getElementById('fullNameValidationError').classList.contains('hide')){
            document.getElementById('fullNameValidationError').classList.add('hide')
        }
    }
    return isValid
}


function actualizarPagina(){
    if(localStorage.getItem('alumnos') == null){
        console.log('no hay nada en el Local Storage')
    }else{
        alumnos = JSON.parse(localStorage.getItem('alumnos'))
        console.log('hay datos en el Local Storage')
        for(let i = 0; i < alumnos.length ; i++){
            let nom = alumnos[i].fullName
            let mat = alumnos[i].matricula
            let sem = alumnos[i].semestre
            let carr = alumnos[i].carrera

            document.getElementById('tbody').innerHTML+=
            `
         <tr>            
            <td>${nom}</td>
            <td>${mat}</td>
            <td>${sem}</td>
            <td>${carr}</td>
            <td><a onClick="editForm(this)">Edit</a> <a onClick="deleteRecord(this)">Delete</a></td>
         </tr> 
            `
        }
    }
}


