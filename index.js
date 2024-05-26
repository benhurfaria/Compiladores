import fs from 'fs';
import { Scanner } from './scanner.js';
var input = fs.readFileSync("stdin", "utf8");

let fileLine = input.split("\n");

for(let i = 0; i < fileLine.length; i++){
    fileLine[i] += "\n";
}

let hash  = {};
let wordLine = "";


function main(){
    hash["inicioprog"] = {Classe: "inicioprog", Lexema: "inicioprog", Tipo:"inicioprog"};
    hash["iniciovars"] = {Classe: "iniciovars", Lexema: "iniciovars", Tipo:"iniciovars"};
    hash["fimvars"] = {Classe: "fimvars", Lexema: "fimvars", Tipo:"fimvars"};
    hash["inicioargs"] = {Classe: "inicioargs", Lexema: "inicioargs", Tipo: "inicioargs"};
    hash["fimargs"] = {Classe: "fimargs", Lexema: "fimargs", Tipo: "fimargs"};
    hash["escreva"] = {Classe: "escreva", Lexema: "escreva", Tipo: "escreva"};
    hash["se"] = {Classe: "se", Lexema: "se", Tipo: "se"};
    hash["entao"] = {Classe: "entao", Lexema: "entao", Tipo: "entao"};
    hash["fimse"] = {Classe: "fimse", Lexema: "fimse", Tipo: "fimse"};
    hash["fimenquanto"] = {Classe: "fimenquanto", Lexema: "fimenquanto", Tipo: "fimenquanto"};
    hash["enquanto"] = {Classe: "enquanto", Lexema: "enquanto", Tipo: "enquanto"};
    hash["fimprog"] = {Classe: "fimprog", Lexema: "fimprog", Tipo: "fimprog"};
    hash["inteiro"] = {Classe: "inteiro", Lexema: "inteiro", Tipo: "inteiro"};
    hash["literal"] = {Classe: "literal", Lexema: "literal", Tipo: "literal"};
    hash["real"] = {Classe: "real", Lexema: "real", Tipo: "real"};
    hash["EOF"] = {Classe: "fim_de_arq", Lexema: "EOF", Tipo: null};
    let vectorToSaveInstances = []
    let scanner = new Scanner(0,0);
    while(scanner.line < fileLine.length){
        wordLine = fileLine[scanner.line];
        let obj = scanner.tokenScanner(wordLine);
        if(Object.values(obj).length !==0){
            console.log(`Classe: ${obj.Classe}, Lexema: ${obj.Lexema}, Tipo:${obj.Tipo}`);
            vectorToSaveInstances.push({Classe: obj.Classe, Lexema: obj.Lexema, Tipo:obj.Tipo});
        }
    }

    for(let i = 0; i < vectorToSaveInstances.length; i++){
        if(vectorToSaveInstances[i].Classe === "ID") hash[vectorToSaveInstances[i].Lexema] = {Classe: vectorToSaveInstances[i].Classe, Lexema: vectorToSaveInstances[i].Lexema, Tipo:vectorToSaveInstances[i].Tipo};
    }

    console.log(`Classe: ${hash["EOF"].Classe}, Lexema: ${hash["EOF"].Lexema}, Tipo:${hash["EOF"].Tipo}`)
    console.log(hash);
    return;
}


export { hash }
main();
