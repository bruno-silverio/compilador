// Compilador, copyright (c) by Bruno Camilo Silverio & Daniel de Arruda Fraga

/*  •Principal função: analisar a sequência de apresentação dos tokens, efetuando a síntese da análise sintática, com base na gramática da linguagem fonte.
    •Principais funções:
    –Identificação de sentenças
    –Detecção de erros de sintaxe
    –Recuperação de erros
    –Montagem de árvore abstrata da sentença
    –Ativação do analisador léxico
    –Ativação de rotinas da análise semântica
    –Ativação de rotinas da síntese do código objeto */

//Inicio da analise sintatico
function sintatico() {
    console.log("***** start SINTATICO *****");


    //tokenslexico = JSON.stringify(tokenslexico);  //Para transformar em String


    //Inicio do Sintatico
    getToken();
    console.log("inicio");

    if (token.simbolo == "Sprograma") {
        getToken();
        console.log("entrou programa: ");

        if (token.simbolo == "Sidentificador") {
            getToken();
            console.log("entrou identificador: ");

            if (token.simbolo == "Sponto_virgula") {
                //Analisa_Bloco();
                console.log("entrou ponto virgula");

                if (token.simbolo == "Sponto") {
                    getToken();
                    console.log("entrou ponto: ");

                    if (token.simbolo == undefined) {
                        console.log("Sintatico finalizado");
                        //tratar se o codigo de fato acabou (depois do ponto)
                    } else {
                        geraErroSintatico();
                    }
                } else {
                    geraErroSintatico();
                }
            } else {
                geraErroSintatico();
            }
        } else {
            geraErroSintatico();
        }
    } else {
        geraErroSintatico();
    }

    console.log(tokensintatico);
    console.log("***** end SINTATICO *****");
}

// --- FUNCOES ---

function getToken() {
    token = lexico();

}

function geraToken() {
    tokensintatico.push({
        lexema: token.lexema,
        simbolo: token.simbolo,
        linha: token.linha
    });
}


function geraErroSintatico() {
    tokensintatico.push({
        lexema: token.lexema,
        simbolo: "ERRO SINTATICO",
        linha: token.linha
    });
}

function geraErroLexico() {
    tokensintatico.push({
        lexema: token.lexema,
        simbolo: "ERRO LEXICO",
        linha: token.linha
    });
}

function Analisa_Bloco(bloco) {
    /*
        início
            Léxico(token)
            Analisa_et_variáveis
            Analisa_subrotinas
            Analisa_comandos
        fim
    */

    let countVar = 0;

    geraToken();
    countVar = Analisa_et_variaveis(countVar);
    Analisa_Subrotinas();
    Analisa_comandos();
}

function Analisa_et_variaveis(countVar) {
    /* 
        início
            se token.simbolo = svar
            então início
                Léxico(token)
                se token.símbolo = sidentificador
                então enquanto(token.símbolo = sidentificador)
                    faça início
                        Analisa_Variáveis
                        se token.símbolo = spontvirg
                        então Léxico (token)
                        senão ERRO
                    fim
                senão ERRO
        fim
    */

    if (token.simbolo == "Svar") {
        geraToken();
        getToken(tokensintatico);
        if (token.simbolo == "Sidentificador") {
            while (token.simbolo == "Sidentificador") {
                countVar = Analisa_Variaveis(countVar);
                if (token.simbolo == "Sponto_virgula") {
                    geraToken();
                    getToken(tokensintatico);
                } else {
                    geraErroSintatico();
                }
            }
        } else {
            geraErroSintatico();
        }
    } else {
        return countVar;
    }
    return countVar;
}

function Analisa_Variaveis(declaração_de_variaveis) {
    /*
        início
            repita
                se token.símbolo = sidentificador
                então início
                    //Pesquisa_duplicvar_ tabela(token.lexema)
                    //se não encontrou duplicidade
                    //então início
                        //insere_tabela(token.lexema, “variável”)
                        Léxico(token)
                        se (token.símbolo = Svírgula) ou (token.símbolo = Sdoispontos)
                        então início
                            se token.símbolo = Svírgula
                            então início
                                léxico(token)
                                se token.simbolo = Sdoispontos
                                então ERRO
                            fim
                        fim
                        senão ERRO
                    //fim
                    //senão ERRO
                senão ERRO
            até que (token.símbolo = sdoispontos)
            Léxico(token)
            Analisa_Tipo
        fim
    */

    do {
        if (token.simbolo == "Sidentificador") {
            //Pesquisa_duplicvar_ tabela(token.lexema)
            //se não encontrou duplicidade
            //então início
            //insere_tabela(token.lexema, “variável”)
            geraToken();
            getToken(tokensintatico);
            if (token.simbolo == "Svirgula" || token.simbolo == "Sdoispontos") {
                if (token.simbolo == "Svirgula") {
                    geraToken();
                    getToken(tokensintatico);
                    if (token.simbolo == "Sdoispontos") {
                        geraErroSintatico();
                    }
                }
            } else {
                geraErroSintatico();
            }
        } else {
            geraErroSintatico();
        }
    } while (token.simbolo != "Sdoispontos");
    geraToken();
    getToken(tokensintatico);
    Analisa_Tipo();

    return countVar;
}

function Analisa_Tipo(tipo) {
    /*
        início
            se (token.símbolo != sinteiro e token.símbolo != sbooleano))
            então ERRO
            //senão coloca_tipo_tabela(token.lexema)
            Léxico(token)
        fim
    */

    if (token.simbolo != "Sinteiro" && token.simbolo != "Sbooleano") {
        geraErroSintatico();
    } /* else {
        getToken(tokensintatico);
    } */
}

function Analisa_comandos(comandos) {
    /*
        início
            se token.simbolo = sinicio
            então início
                Léxico(token)
                Analisa_comando_simples
                enquanto (token.simbolo != sfim)
                faça início
                    se token.simbolo = spontovirgula
                    então início
                        Léxico(token)
                        se token.simbolo != sfim
                        então Analisa_comando_simples
                        fim
                        senão ERRO
                    fim
                    Léxico(token)
                fim
            senão ERRO
        fim
    */

    if (token.simbolo == "Sinicio") {
        geraToken();
        getToken(tokensintatico);
        Analisa_comando_simples();
        while (token.sintatico != "Sfim") {
            if (token.simbolo == "Sponto_virgula") {
                geraToken();
                getToken(tokensintatico);
                if (token.simbolo != "Sfim") {
                    Analisa_comando_simples();
                } else {
                    geraErroSintatico();
                }
            }
            geraToken();
            getToken(tokensintatico);
        }
    } else {
        geraErroSintatico();
    }
}

function Analisa_comando_simples(comando) {
    /*
    início
        se token.simbolo = sidentificador
        então Analisa_atrib_chprocedimento
        senão
            se token.simbolo = sse
            então Analisa_se
            senão
                se token.simbolo = senquanto
                então Analisa_enquanto
                senão
                    se token.simbolo = sleia
                    então Analisa_leia
                    senão
                        se token.simbolo = sescreva
                        então Analisa_ escreva
                        senão
                            Analisa_comandos
    fim
    */

    if (token.simbolo == "Sidentificador") {
        Analisa_atrib_chprocedimento();
    } else {
        if (token.simbolo == "Sse") {
            Analisa_se();
        } else {
            if (token.simbolo == "Senquanto") {
                Analisa_enquanto();
            } else {
                if (token.simbolo == "Sleia") {
                    Analisa_leia();
                } else {
                    if (token.simbolo == "Sescreva") {
                        Analisa_escreva();
                    } else {
                        Analisa_comandos();
                    }
                }
            }
        }
    }
}

function Analisa_atrib_chprocedimento(atribuição_chprocedimento) {
    /* 
    início
        Léxico(token)
        se token.simbolo = satribuição
        então Analisa_atribuicao 
        senão Chamada_procedimento
    fim
    */

    getToken();
    geraToken(tokensintatico);
    if (token.simbolo == "Satribuicao") {
        Analisa_atrib_chprocedimento();
    } else {
        Chamada_procedimento();
    }
}

function Analisa_leia(comando_leitura) {
    /*
        início
            Léxico(token)
            se token.simbolo = sabre_parenteses
            então início
                Léxico(token)
                se token.simbolo = sidentificador
                //então se pesquisa_declvar_tabela(token.lexema)
                    //então início (pesquisa em toda a tabela)
                        Léxico(token)
                        se token.simbolo = sfecha_parenteses
                        então Léxico(token)
                        senão ERRO
                    fim
                //senão ERRO
                senão ERRO
                fim
            senão ERRO
        fim
    */

    getToken();
    geraToken(tokensintatico);
    if (token.simbolo == "Sabre_parenteses") {
        getToken();
        geraToken(tokensintatico);
        if (token.simbolo == "Sidentificador") {
            //então se pesquisa_declvar_tabela(token.lexema)
            //então início (pesquisa em toda a tabela)
            getToken();
            geraToken(tokensintatico);
            if (token.simbolo == "Sfecha_parenteses") {
                getToken();
                geraToken(tokensintatico);
            } else {
                geraErroSintatico();
            }
            //fim
            //senao ERRO
        } else {
            geraErroSintatico();
        }
    } else {
        geraErroSintatico();
    }
}

function Analisa_escreva(comando_escrita) {
    /*
    início
        Léxico(token)
        se token.simbolo = sabre_parenteses
        então início
            Léxico(token)
            se token.simbolo = sidentificador
            //então se pesquisa_declvarfunc_tabela(token.lexema)
                //então início
                    Léxico(token)
                    se token.simbolo = sfecha_parenteses
                    então Léxico(token)
                    senão ERRO
                fim
            //senão ERRO
            senão ERRO
        fim
        senão ERRO
    fim
    */

    getToken();
    geraToken(tokensintatico);
    if (token.simbolo == "Sabre_parenteses") {
        getToken();
        geraToken(tokensintatico);
        if (token.simbolo == "Sidentificador") {
            //então se pesquisa_ declvarfunc_tabela(token.lexema)
            //então início
            getToken();
            geraToken(tokensintatico);
            if (token.simbolo == "Sfecha_parenteses") {
                getToken();
                geraToken(tokensintatico);
            } else {
                geraErroSintatico();
            }
            //fim
            //senão ERRO
        } else {
            geraErroSintatico();
        }
    } else {
        geraErroSintatico();
    }
}

function Analisa_enquanto(comando_repeticao) {
    /*
        //Def auxrot1,auxrot2 inteiro
        início
            //auxrot1:= rotulo
            //Gera(rotulo,NULL,´ ´,´ ´) {início do while}
            //rotulo:= rotulo+1
            Léxico(token)
            Analisa_expressão
            se token.simbolo = sfaça
            então início
                //auxrot2:= rotulo
                //Gera(´ ´,JMPF,rotulo,´ ´) {salta se falso}
                //rotulo:= rotulo+1
                Léxico(token)
                Analisa_comando_simples
                //Gera(´ ´,JMP,auxrot1,´ ´) {retorna início loop}
                //Gera(auxrot2,NULL,´ ´,´ ´) {fim do while}
            fim
            senão ERRO
        fim
    */

    getToken();
    geraToken();
    Analisa_expressao();
    if (token.simbolo == "Sfaca") {
        getToken();
        geraToken(tokensintatico);
        Analisa_comando_simples();
    } else {
        geraErroSintatico();
    }
}

function Analisa_se(comando_condicional) {
    /*
        início
            Léxico(token)
            Analisa_expressão
            se token.símbolo = sentão
            então início
                Léxico(token)
                Analisa_comando_simples
                se token.símbolo = Ssenão
                então início
                    Léxico(token)
                    Analisa_comando_simples
                fim
            fim
            senão ERRO
        fim
    */

    getToken();
    geraToken(tokensintatico);
    Analisa_expressao();
    if (token.simbolo == "Sentao") {
        getToken();
        geraToken(tokensintatico);
        Analisa_comando_simples();
        if (token.simbolo == "Ssenao") {
            getToken();
            geraToken(tokensintatico);
            Analisa_comando_simples();
        }
    } else {
        geraErroSintatico();
    }
}

function Analisa_Subrotinas(etapa_de_declaracao_de_sub_rotinas) {
    /*
        //Def. auxrot, flag inteiro
        Início
            flag = 0
            if (token.simbolo = sprocedimento) ou (token.simbolo = sfunção)
            então início
                //auxrot:= rotulo
                //GERA(´ ´,JMP,rotulo,´ ´) {Salta sub-rotinas}
                //rotulo:= rotulo + 1
                //flag = 1
            fim
            enquanto (token.simbolo = sprocedimento) ou (token.simbolo = sfunção)
            faça início
                    se (token.simbolo = sprocedimento)
                    então analisa_declaração_procedimento
                    senão analisa_ declaração_função
                    se token.símbolo = sponto-vírgula
                    então Léxico(token)
                    senão ERRO
            fim
            if flag = 1
            //então Gera(auxrot,NULL,´ ´,´ ´) {início do principal}
        fim
    */

    //let flag = 0;
    //let auxrot = 0;
    if ((token.simbolo == "Sprocedimento") || (token.simbolo == "Sfuncao")) {
        //auxrot:= rotulo
        //GERA(´ ´,JMP,rotulo,´ ´) {Salta sub-rotinas}
        //rotulo:= rotulo + 1
        //flag = 1
    }
    while ((token.simbolo == "Sprocedimento") || (tokne.simbolo == "Sfuncao")) {
        if (token.simbolo == "Sprocedimento") {
            Analisa_declaracao_procedimento();
        } else {
            Analisa_declaracao_funcao();
        }
        if (token.simbolo == "Sponto_virgula") {
            getToken();
            geraToken(tokensintatico);
        } else {
            geraErroSintatico();
        }
    }
    /*
    if (flag == 1) {
        //então Gera(auxrot,NULL,´ ´,´ ´) {início do principal}
    }
    */
}

function Analisa_declaracao_procedimento(declaracao_de_procedimento) {
    /*
        início
            Léxico(token)
            //nível := “L” (marca ou novo galho)
            se token.símbolo = sidentificador
            então início
                //pesquisa_declproc_tabela(token.lexema)
                //se não encontrou
                //então início
                    //Insere_tabela(token.lexema,”procedimento”,nível, rótulo)
                    //{guarda na TabSimb}
                    //Gera(rotulo,NULL,´ ´,´ ´)
                    //{CALL irá buscar este rótulo na TabSimb}
                    //rotulo:= rotulo+1
                    Léxico(token)
                    se token.simbolo = sponto_vírgula
                    então Analisa_bloco
                    senão ERRO
                //fim
                //senão ERRO
                fim
            senão ERRO
            //DESEMPILHA OU VOLTA NÍVEL
        fim
    */

    getToken();
    geraToken(tokensintatico);
    //nível := “L” (marca ou novo galho)
    if (token.simbolo == "Sidentificador") {
        //pesquisa_declproc_tabela(token.lexema)
        //se não encontrou
        //então início
        //Insere_tabela(token.lexema,”procedimento”,nível, rótulo)
        //{guarda na TabSimb}
        //Gera(rotulo,NULL,´ ´,´ ´)
        //{CALL irá buscar este rótulo na TabSimb}
        //rotulo:= rotulo+1
        getToken();
        geraToken(tokensintatico);
        if (token.simbolo == "Sponto_virgula") {
            Analisa_Bloco();
        } else {
            geraErroSintatico();
        }
    } else {
        geraErroSintatico();
    }
}

function Analisa_declaracao_funcao(declaracao_de_funcao) {
    /*
        início
            Léxico(token)
            //nível := “L” (marca ou novo galho)
            se token.símbolo = sidentificador
            então início
                //pesquisa_declfunc_tabela(token.lexema)
                //se não encontrou
                //então início
                    //Insere_tabela(token.lexema,””,nível,rótulo)
                    Léxico(token)
                    se token.símbolo = sdoispontos
                    então início
                        Léxico(token)
                        se (token.símbolo = Sinteiro) ou (token.símbolo = Sbooleano)
                        então início
                            //se (token.símbolo = Sinteger)
                            //então TABSIMB[pc].tipo:= “função inteiro”
                            //senão TABSIMB[pc].tipo:= “função boolean”
                            Léxico(token)
                            se token.símbolo = sponto_vírgula
                            então Analisa_bloco
                        fim
                        senão ERRO
                    fim
                    senão ERRO
                fim
                //senão ERRO
            fim
            senão ERRO
            //DESEMPILHA OU VOLTA NÍVEL
        fim
    */

    getToken();
    geraToken(tokensintatico);
    //nível := “L” (marca ou novo galho)
    if (token.simbolo == "Sidentificador") {
        //pesquisa_declfunc_tabela(token.lexema)
        //se não encontrou
        //então início
        //Insere_tabela(token.lexema,””,nível,rótulo)
        getToken();
        geraToken(tokensintatico);
        if (token.simbolo == "Sdoispontos") {
            getToken();
            geraToken(tokensintatico);
            if ((token.simbolo == "Sinteiro") || (token.simbolo == "Sbooleano")) {
                //se (token.símbolo = Sinteger)
                //então TABSIMB[pc].tipo:= “função inteiro”
                //senão TABSIMB[pc].tipo:= “função boolean”
                getToken();
                geraToken(tokensintatico);
                if (token.simbolo == "Sponto_virgula") {
                    Analisa_Bloco();
                }
            } else {
                geraErroSintatico();
            }
        } else {
            geraErroSintatico();
        }
    } else {
        geraErroSintatico();
    }
}

function Analisa_expressao(xpressao) {
    /*
        início
            Analisa_expressão_simples
            se (token.simbolo = (smaior ou smaiorig ou sig ou smenor ou smenorig ou sdif))
            então inicio
                Léxico(token)
                Analisa_expressão_simples
            fim
        fim
    */

    Analisa_expressao_simples();
    if (token.simbolo == "Smaior" || "Smaiorig" || "Sig" || "Smenor" || "Smenorig" || "Sdif") {
        getToken();
        geraToken(tokensintatico);
        Analisa_expressao_simples();
    }
}

function Analisa_expressao_simples(expressao_simples) {
    /*
        início
            se (token.simbolo = smais) ou (token.simbolo = smenos)
            então Léxico(token)
            Analisa_termo
            enquanto ((token.simbolo = smais) ou (token.simbolo = smenos) ou (token.simbolo = sou))
            faça inicio
                Léxico(token)
                Analisa_termo
            fim
        fim
    */

    if ((token.simbolo == "Smais") || (token.simbolo == "Smenos")) {
        getToken();
        geraToken(tokensintatico);
        Analisa_termo();
        while ((token.simbolo == "Smais") || (token.simbolo == "Smenos") || (token.simbolo == "Sou")) {
            getToken();
            geraToken(tokensintatico);
            Analisa_termo();
        }
    }
}

function Analisa_termo(termo) {
    /*
        início
            Analisa_fator
            enquanto ((token.simbolo = smult) ou (token.simbolo = sdiv) ou (token.simbolo = se))
            então início
                Léxico(token)
                Analisa_fator
            fim
        fim
    */

    Analisa_fator();
    while ((token.simbolo == "Smult") || (token.simbolo == "Sdiv") || (token.simbolo == "Se")) {
        getToken();
        geraToken(tokensintatico);
        Analisa_fator();
    }
}

function Analisa_fator(fator) {
    /*
        Início
        Se token.simbolo = sidentificador (* Variável ou Função*)
        Então inicio
            //Se pesquisa_tabela(token.lexema,nível,ind)
            //Então Se (TabSimb[ind].tipo = “função inteiro”) ou (TabSimb[ind].tipo = “função booleano”)
            //Então Analisa_chamada_função
            //Senão Léxico(token)
            //Senão ERRO
        Fim
        Senão Se (token.simbolo = snumero) (*Número*)
            Então Léxico(token)
        Senão Se token.símbolo = snao (*NAO*)
            Então início
                Léxico(token)
                Analisa_fator
            Fim
        Senão Se token.simbolo = sabre_parenteses(* expressão entre parenteses *)
            Então início
                Léxico(token)
                Analisa_expressão(token)
                Se token.simbolo = sfecha_parenteses
                Então Léxico(token)
                Senão ERRO
            Fim
        Senão Se (token.lexema = verdadeiro) ou (token.lexema = falso)
            Então Léxico(token)
        Senão ERRO
        Fim
    */

    if (token.simbolo == "Sidentificador") {
        //Se pesquisa_tabela(token.lexema,nível,ind)
        //Então Se (TabSimb[ind].tipo = “função inteiro”) ou (TabSimb[ind].tipo = “função booleano”)
        //Então Analisa_chamada_função
        //Senão Léxico(token)
        //Senão ERRO
    } else if (token.simbolo == "Snumero") {
        getToken();
        geraToken(tokensintatico);
    } else if (token.simbolo == "Snao") {
        getToken();
        geraToken(tokensintatico);
        Analisa_fator();
    } else if (token.simbolo == "Sabre_parenteses") {
        getToken();
        geraToken(tokensintatico);
        Analisa_expressao();
        if (token.simbolo == "Sfecha_parenteses") {
            getToken();
            geraToken(tokensintatico);
        } else {
            geraErroSintatico();
        }
    } else if ((token.simbolo == "verdadeiro") || (token.simbolo == "falso")) {
        getToken();
        geraToken(tokensintatico);
    } else {
        geraErroSintatico();
    }
}




