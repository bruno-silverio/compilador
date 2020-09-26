//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/import

//Imports
//import * as lexico from './js/lexico/lexico.js';
let lexico = require('./js/lexico/lexico.js');


//Eventos

document.getElementById('import_file').addEventListener('change', function () {
    readText(this);
});

document.getElementById('compilador').addEventListener('click', main);


//Variaveis globais
let programa = "se contador > 13 /*teste comentario*/\n" +
    "entao escreva,  (contador)\n" +
    "senao + escreva >= (x)";;
let token = [];


function main() {
    document.getElementById("formSaida").innerHTML = ">";
    try {
        readProgramFile();
        clear();
        lexico.lexico(programa);

    } catch (error) {
        //Responsavel por exibir a mensagem de erro para o usuario
    }
}


export function readText(that) {
    if (that.files && that.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let output = e.target.result;
            program = output;
            // readProgramFile();
            writeOnTerminal();
        };
        reader.readAsText(that.files[0]);
    }

}function writeOnTerminal() {
    myCodeMirror.setValue(program.toString());
}

function readProgramFile() {
    programa = myCodeMirror.getValue();
    programa = programa.split("\n");
    return;
}

function writeOnTerminal() {
    myCodeMirror.setValue(program.toString());
}