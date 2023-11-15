var input = require("fs").readFileSync("stdin", "utf8");

let line = input.split("\n");

let hash  = {};


function tokenScanner(obj){
    let state = 0;
    let objeto = {};

    if(!isNaN(obj)){
        state = 1;
        
    }





    return ;
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
    const operadores_relacionais = ["=", ">=", "<=", ">", "<"];
    for(let i = 0; i < line.length; i++){
        let words = line[i].split("\"");
        let atribution = false;

        if(words[0] === "escreva "){
            words[0] = words[0].slice(0,-1);
            words[1] = "\""+ words[1] + "\"";
        } else{
            words = line[i].split(" ");
        }


        if(words[0] === "varfim;" || words[words.length-1] !== ";" && (words.length > 1) && !words[1].includes("(")){
            words[words.length-1] = words[words.length-1].slice(0,-1);
            words.push(";");
        }

        if(words[0].indexOf("<-") > 0){
            words = words[0].split("<-");
            words.splice(1,0, "<-");
            words[words.length-1] = words[words.length-1].slice(0,-1);
            words.push(";");
            atribution = true;
        }
        
        if(words[0]==="inteiro" || words[0]==="literal" || words[0]==="real"){
            let variables = words[1].split(",");
            for(let k = 1; k <= variables.length; k++){
                words.splice(k,0, variables[k-1]);
            }
            words.pop();
            words.pop();
            words.push(";");
        }

        if(words[0].includes("(")){
            let variabels = words[0].split("(");
            variabels.splice(1,0,"(");
            variabels[variabels.length-1] = variabels[variabels.length-1].slice(0,-1);
            variabels.push(")");
            words = variabels;
        }

        if(words[0] === "repita"){
            let variabels = words[1].split("(");
            variabels[0] = "(";
            variabels[variabels.length-1] = variabels[variabels.length-1].slice(0,-1);
            variabels.push(")");
            words = words.slice(0,-1);
            for(let p = 0; p < variabels.length; p++){
                words.push(variabels[p]);
            }
        }

        let flag = 0, first_op = 0;

        if(words[0] === "") words.shift();
        for(let j = 0; j < words.length; j++){
            let variabels;

            if(words[j].indexOf("=") >= 0 && flag === 0 && first_op === 0 && words[j][0] !== "\"" && !atribution){
                let num = words[j].indexOf("=");
                if(words[j][num-1] === "<") {
                    variabels = words[j].split("<=");
                    words[j] = variabels[0];
                    words.splice(j+1, 0, "<=");
                    words.splice(j+2, 0, variabels[1]);
                }
                if(words[j][num-1] === ">") {
                    variabels = words[j].split(">=");
                    console.log(variabels);
                    words[j] = variabels[0];
                    words.splice(j+1, 0, ">=");
                    words.splice(j+2, 0, variabels[1]);
                }
                flag = 1;
            }
            if(words[j].indexOf(">") >= 0 && flag===0 && first_op === 0 && first_op === 0&& words[j][0] !== "\"" && !atribution){
                variabels = words[j].split(">");
                words[j] = variabels[0];
                words.splice(j+1, 0, ">");
                words.splice(j+2, 0, variabels[1]);
                first_op = 1;
            }
            if(words[j].indexOf("<") >= 0 && flag===0 && first_op === 0 && first_op === 0&& words[j][0] !== "\"" && !atribution){
                variabels = words[j].split("<");
                words[j] = variabels[0];
                words.splice(j+1, 0, "<");
                words.splice(j+2, 0, variabels[1]);
                first_op = 1;
            }
            console.log(words[j]);
            tokenScanner(words[j]);
        }
    }



    return;
}


main();
