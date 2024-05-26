import { hash } from "./index.js";
export class Scanner {
    constructor(line, column){
        this.line = line;
        this.column = column;
    }

    tokenScanner(linhaCorrente){
        let state = 0;
        let token = {};
        const letters = "ABCDEFGHIJKLMNOPKRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
        const digits = "0123456789".split("");
        let word = "";
        let isFloat = false;
        for(let i = this.column; i < linhaCorrente.length; i++){
            if(linhaCorrente[i] === "\n" && state === 0){
                this.line++;
                this.column = -1;
            }
            this.column++
            if(state === 0){
                if(linhaCorrente[i] === " " || linhaCorrente[i] === "\t" || linhaCorrente[i] === "\n" || linhaCorrente[i] === "\r"){
                    state = 0;
                } else if(digits.includes(linhaCorrente[i])){
                    state = 1;
                    word = linhaCorrente[i];
                } else if(letters.includes(linhaCorrente[i])){
                    state = 22;
                    word = linhaCorrente[i];
                } else if(linhaCorrente[i] === "{"){
                    state = 25;
                    word = linhaCorrente[i];
                } else if(linhaCorrente[i] === "<"){
                    state = 9;
                    word = linhaCorrente[i];
                } else if(linhaCorrente[i] === "="){
                    state = 13;
                    word = linhaCorrente[i];
                }else if(linhaCorrente[i] === ">"){
                    state = 14;
                    word = linhaCorrente[i];
                } else if (linhaCorrente[i] === "+" || linhaCorrente[i] === "-" || linhaCorrente[i] === "*" || linhaCorrente[i] === "/"){
                    state = 15;
                    word = linhaCorrente[i];
                } else if(linhaCorrente[i] === ";"){
                    state = 18;
                    word = linhaCorrente[i];
                } else if(linhaCorrente[i] === ","){
                    state = 17;
                    word = linhaCorrente[i];
                } else if( linhaCorrente[i] === '"'){
                    state = 19;
                    word = linhaCorrente[i];
                } else if( linhaCorrente[i] === "("){
                    state = 24;
                    word = linhaCorrente[i];
                } else if(linhaCorrente[i] === ")"){
                    state = 23;
                    word = linhaCorrente[i];
                } else {
                    console.log(`ERRO - Caractere inválido linha ${this.line+1} coluna ${this.column}`);
                    token = {Classe: "ERRO", Lexema: word, Tipo: null}
                    state = 0;
                    word = "";
                    return token;
                }
            }else if(state === 1){
                if(digits.includes(linhaCorrente[i])){
                    state = 7;
                    word += linhaCorrente[i];
                }else if(linhaCorrente[i] === "."){
                    state = 2;
                    word += linhaCorrente[i];
                    isFloat = true;
                } else if(linhaCorrente[i] === "E" || linhaCorrente[i] === "e"){
                    state = 4;
                    word += linhaCorrente[i];
                } else{
                    token = {Classe: "NUM", Lexema: word, Tipo: "inteiro"};
                    state = 0;
                    word = "";
                    this.column--;
                    i--;
                    return token;
                }
            }else if(state === 2){
                if(digits.includes(linhaCorrente[i])){
                    state = 3;
                    word += linhaCorrente[i];
                }else{
                    token = {Classe: "ERRO", Lexema: word, Tipo: null};
                    state = 0;
                    word = "";
                    i--;
                    this.column--;
                    return token;
                }
            }else if(state === 3){
                if(digits.includes(linhaCorrente[i])){
                    state = 3;
                    word += linhaCorrente[i];
                } else if(linhaCorrente[i] === "E" || linhaCorrente[i] === "e"){
                    state = 4;
                    word += linhaCorrente[i];
                } else{
                    token = {Classe: "NUM", Lexema: word, Tipo: isFloat?"real":"inteiro"};
                    isFloat = false;
                    state = 0;
                    word = "";
                    i--;
                    this.column--;
                    return token;
                }
            }else if(state === 4){
                if(linhaCorrente[i] === "+" || linhaCorrente[i] === "-"){
                    state = 5;
                    word += linhaCorrente[i];
                } else if (digits.includes(linhaCorrente[i])){
                    state = 6;
                    word += linhaCorrente[i];
                }else{
                    token = {Classe: "Erro", Lexema: word, Tipo: null};
                    state =0;
                    word = "";
                    i--;
                    this.column--;
                    return token;
                }
            } else if(state === 5){
                if(digits.includes(linhaCorrente[i])){
                    state = 6;
                    word += linhaCorrente[i];
                } else{
                    token = {Classe: "Erro", Lexema: word, Tipo: null}
                    state = 0;
                    word = "";
                    i--;
                    this.column--;
                    return token;
                }
            }else if(state === 6){
                if(digits.includes(linhaCorrente[i])){
                    state = 6;
                    word += linhaCorrente[i];
                } else{
                    token = {Classe: "NUM", Lexema: word, Tipo: isFloat?"real":"inteiro"};
                    isFloat=false;
                    state = 0
                    word ="";
                    i--;
                    this.column--;
                    return token;
                }
            }else if(state === 7){
                if(digits.includes(linhaCorrente[i])){
                    state = 7;
                    word += linhaCorrente[i];
                } else if(linhaCorrente[i] === "."){
                    state = 8;
                    word += linhaCorrente[i];
                    isFloat=true;
                }else {
                    token={Classe:"NUM", Lexema: word, Tipo: "inteiro"};
                    state = 0
                    word ="";
                    i--;
                    this.column--;
                    return token;
                }
            } else if(state === 8){
                if(digits.includes(linhaCorrente[i])){
                    state = 6;
                    word += linhaCorrente[i];
                }else{
                    token = {Classe: "ERRO", Lexema: word, Tipo: null};
                    state = 0;
                    word = "";
                    i--;
                    this.column--;
                    return token;
                }
            }else if(state === 9){
                if(linhaCorrente[i] === ">"){
                    state = 10;
                    word += linhaCorrente[i];
                }else if(linhaCorrente[i]==="="){
                    state = 12;
                    word += linhaCorrente[i];
                }else{
                    token = {Classe: "op_relacional", Lexema: word, Tipo: null};
                    state = 0;
                    i--;
                    this.column--;
                    return token;
                }
            }else if(state === 10){
                token = {Classe: "op_relacional", Lexema: word, Tipo: null};
                state = 0;
                word = "";
                i--;
                this.column--;
                return token;
            }else if(state === 11){
                token = {Classe: "Atribuição", Lexema: word, Tipo: null};
                state = 0;
                word = "";
                i--;
                this.column--;
                return token;
            }else if(state === 12){
                token = {Classe: "op_relacional", Lexema: word, Tipo: null};
                state = 0;
                word = "";
                i--;
                this.column--;
                return token;
            }else if(state === 13){
                if(linhaCorrente[i] === "="){
                    state = 12;
                    word += linhaCorrente[i];
                }else{
                    token = {Classe: "op_relacional", Lexema: word, Tipo: null };
                    state = 0;
                    word = "";
                    i--;
                    this.column--;
                    return token;
                }
            }else if(state === 14){
                if(state === "="){
                    state = 13;
                    word += linhaCorrente[i];
                } else{
                    token = {Classe: "op_relacional", Lexema: word, Tipo: null};
                    state = 0;
                    word = "";
                    this.column--;
                    i--;
                    return token;
                }
            }else if(state === 15){
                token = {Classe: "op_aritmetico", Lexema: word, Tipo: null};
                state = 0;
                word = "";
                this.column--;
                i--;
                return token;
            }else if(state === 17){
                token = {Classe: "virgula", Lexema: word, Tipo: null};
                state = 0;
                word = "";
                i--;
                this.column--;
                return token;
            }else if(state === 18){
                token = {Classe: "ponto_e_virg", Lexema: word, Tipo: null};
                state = 0;
                word = "";
                i--;
                this.column--;
                return token;
            }else if(state === 19){
                if(linhaCorrente[i] === '"'){
                    state = 21;
                    word += linhaCorrente[i];
                } else {
                    state = 20;
                    word += linhaCorrente[i];
                }
            }else if(state === 20){
                if(linhaCorrente[i] === '"'){
                    state = 21;
                    word += linhaCorrente[i];
                }else if(linhaCorrente[i+1] === undefined){
                    console.log(`ERRO - O literal não tem um endpoint, ${this.this.line+1}, coluna ${this.column}`);
                    token = {Classe: "literal", Lexema: word, Tipo: null};
                    state = 0;
                    word = "";
                    i--;
                    this.column--;
                    return token;
                }else{
                    state = 20;
                    word += linhaCorrente[i];
                }
            }else if(state === 21){
                token = {Classe: "literal", Lexema: word, Tipo: null};
                state = 0;
                i--;
                this.column--;
                word = "";
                return token;
            }else if(state === 22){
                if(letters.includes(linhaCorrente[i])){
                    state = 22;
                    word += linhaCorrente[i];
                } else{
                    token = {Classe: isKeyword(word) ? word: "ID", Lexema: word, Tipo: isKeyword(word)? word: null};
                    state = 0;
                    word = "";
                    i--;
                    this.column--;
                    return token;
                }
            }else if(state === 23){
                token = {Classe: "fecha_par", Lexema: word, Tipo: null};
                state = 0;
                word = "";
                i--;
                this.column--;
                return token;
            }else if(state === 24){
                token = {Classe: "abre_par", Lexema: word, Tipo: null};
                state = 0;
                word = "";
                i--;
                this.column--;
                return token;
            }else if(state === 25){
                if(linhaCorrente[i] === "}"){
                    state = 27;
                    word += linhaCorrente[i];
                }else{
                    state = 26;
                    word += linhaCorrente[i];
                }
            }else if(state === 26){
                if(linhaCorrente[i] === "}"){
                    state = 27;
                    word += linhaCorrente[i];
                }else if(linhaCorrente[i+1] === undefined){
                    console.log(`ERRO - O Comentário não tem um endpoint, linha ${this.line+1}, coluna ${this.column}`);
                    token = {Classe: "Erro", Lexema: word, Tipo: null};
                    state = 0;
                    word = "";
                    i--;
                    this.column--;
                    return token;
                }else{
                    state = 26;
                    word += linhaCorrente[i];
                }
            }else if(state === 27){
                token = {Classe: "COMENTARIO", Lexema: word, Tipo: null};
                state = 0;
                word = "";
                i--;
                this.column--;
                return token;
            }
        }
        return token;
    }
}

function isKeyword(obj){
    if(hash[obj] !== undefined) return true;
    return false;
}