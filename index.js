var input = require("fs").readFileSync("stdin", "utf8");

let fileLine = input.split("\n");

for(let i = 0; i < fileLine.length; i++){
    fileLine[i] += "\n";
}

let line = 0, column = 0;
let liga = false;
let hash  = {};
let wordLine = "";

function tokenScanner(linhaCorrente){
    let state = 0;
    let token = {};
    const letters = "ABCDEFGHIJKLMNOPKRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    const digits = "0123456789".split("");
    let word = "";
    let isFloat = false;
    for(let i = column; i < linhaCorrente.length; i++){
        if(linhaCorrente[i] === "\n" && state === 0){
            line++;
            column = -1;
        }
        column++
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
                console.log(`ERRO - Caractere inválido linha ${line+1} coluna ${column}`);
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
                column--;
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
                column--;
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
                column--;
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
                column--;
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
                column--;
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
                column--;
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
                column--;
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
                column--;
                return token;
            }
        }else if(state === 9){
            if(linhaCorrente[i] === ">"){
                state = 10;
                word += linhaCorrente[i];
            }else if(linhaCorrente[i]==="="){
                state = 12;
                word += linhaCorrente[i];
            }else if(linhaCorrente[i] === "-"){
                state = 11;
                word += linhaCorrente[i];
            }else{
                token = {Classe: "OPR", Lexema: word, Tipo: null};
                state = 0;
                i--;
                column--;
                return token;
            }
        }else if(state === 10){
            token = {Classe: "OPR", Lexema: word, Tipo: null};
            state = 0;
            word = "";
            i--;
            column--;
            return token;
        }else if(state === 11){
            token = {Classe: "RCB", Lexema: word, Tipo: null};
            state = 0;
            word = "";
            i--;
            column--;
            return token;
        }else if(state === 12){
            token = {Classe: "OPR", Lexema: word, Tipo: null};
            state = 0;
            word = "";
            i--;
            column--;
            return token;
        }else if(state === 13){
            token = {Classe: "OPR", Lexema: word, Tipo: null };
            state = 0;
            word = "";
            i--;
            column--;
            return token;
        }else if(state === 14){
            if(state === "="){
                state = 13;
                word += linhaCorrente[i];
            } else{
                token = {Classe: "OPR", Lexema: word, Tipo: null};
                state = 0;
                word = "";
                column--;
                i--;
                return token;
            }
        }else if(state === 15){
            token = {Classe: "OPM", Lexema: word, Tipo: null};
            state = 0;
            word = "";
            column--;
            i--;
            return token;
        }else if(state === 17){
            token = {Classe: "VIR", Lexema: word, Tipo: null};
            state = 0;
            word = "";
            i--;
            column--;
            return token;
        }else if(state === 18){
            token = {Classe: "PT_V", Lexema: word, Tipo: null};
            state = 0;
            word = "";
            i--;
            column--;
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
                console.log(`ERRO - O literal não tem um endpoint, ${line+1}, coluna ${column}`);
                token = {Classe: "LIT", Lexema: word, Tipo: null};
                state = 0;
                word = "";
                i--;
                column--;
                return token;
            }else{
                state = 20;
                word += linhaCorrente[i];
            }
        }else if(state === 21){
            token = {Classe: "LIT", Lexema: word, Tipo: null};
            state = 0;
            i--;
            column--;
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
                column--;
                return token;
            }
        }else if(state === 23){
            token = {Classe: "FC_P", Lexema: word, Tipo: null};
            state = 0;
            word = "";
            i--;
            column--;
            return token;
        }else if(state === 24){
            token = {Classe: "AB_P", Lexema: word, Tipo: null};
            state = 0;
            word = "";
            i--;
            column--;
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
                console.log(`ERRO - O Comentário não tem um endpoint, linha ${line+1}, coluna ${column}`);
                token = {Classe: "Erro", Lexema: word, Tipo: null};
                state = 0;
                word = "";
                i--;
                column--;
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
            column--;
            return token;
        }
    }
    return token;
}

function main(){
    hash["inicio"] = {Classe: "inicio", Lexema: "inicio", Tipo:"inicio"};
    hash["varinicio"] = {Classe: "varinicio", Lexema: "varinicio", Tipo:"varinicio"};
    hash["varfim"] = {Classe: "varfim", Lexema: "varfim", Tipo:"varfim"};
    hash["escreva"] = {Classe: "escreva", Lexema: "escreva", Tipo: "escreva"};
    hash["leia"] = {Classe: "leia", Lexema: "leia", Tipo: "leia"};
    hash["se"] = {Classe: "se", Lexema: "se", Tipo: "se"};
    hash["entao"] = {Classe: "entao", Lexema: "entao", Tipo: "entao"};
    hash["fimse"] = {Classe: "fimse", Lexema: "fimse", Tipo: "fimse"};
    hash["repita"] = {Classe: "repita", Lexema: "repita", Tipo: "repita"};
    hash["fimrepita"] = {Classe: "fimrepita", Lexema: "fimrepita", Tipo: "fimrepita"};
    hash["fim"] = {Classe: "fim", Lexema: "fim", Tipo: "fim"};
    hash["inteiro"] = {Classe: "inteiro", Lexema: "inteiro", Tipo: "inteiro"};
    hash["literal"] = {Classe: "literal", Lexema: "literal", Tipo: "literal"};
    hash["real"] = {Classe: "real", Lexema: "real", Tipo: "real"};
    hash["EOF"] = {Classe: "EOF", Lexema: "EOF", Tipo: null};
    let vectorToSaveInstances = []
    while(line < fileLine.length){
        wordLine = fileLine[line];
        let obj = tokenScanner(wordLine);
        if(Object.values(obj).length !==0){
            console.log(`Classe: ${obj.Classe}, Lexema: ${obj.Lexema}, Tipo:${obj.Tipo}`);
            vectorToSaveInstances.push({Classe: obj.Classe, Lexema: obj.Lexema, Tipo:obj.Tipo});
        }
    }

    for(let i = 0; i < vectorToSaveInstances.length; i++){
        hash[vectorToSaveInstances[i].Lexema] = {Classe: vectorToSaveInstances[i].Classe, Lexema: vectorToSaveInstances[i].Lexema, Tipo:vectorToSaveInstances[i].Tipo};
    }

    console.log(`Classe: ${hash["EOF"].Classe}, Lexema: ${hash["EOF"].Lexema}, Tipo:${hash["EOF"].Tipo}`)
    return;
}

function isKeyword(obj){
    if(hash[obj] !== undefined) return true;
    return false;
}

main();
