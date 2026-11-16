/* cenarios.js — dados dos cinco cenários (suspeitos, locais, armas e o mistério de cada um).
   Responsável: Integrante 3 (Cenários e Sistema de Pistas). */
(function (raiz) {
  const CENARIOS = [
  {
    "id": "mansao",
    "nome": "A Mansão Clássica",
    "curto": "Mansão Clássica",
    "descricao": "Na noite da leitura do testamento, uma morte silenciosa num casarão de dois andares.",
    "misterio": "O patriarca Augusto Valença reuniu a família e os empregados para ler o novo testamento. Antes da meia-noite, foi encontrado sem vida. Ninguém saiu da propriedade.",
    "imagem": "assets/imagens/cenarios/mansao.svg",
    "larguraImagem": 1440.0,
    "alturaImagem": 824.0,
    "suspeitos": [
      {
        "id": "alfredo",
        "nome": "Alfredo",
        "papel": "O mordomo",
        "imagem": "assets/imagens/personagens/alfredo.svg"
      },
      {
        "id": "isabela",
        "nome": "Isabela",
        "papel": "A sobrinha",
        "imagem": "assets/imagens/personagens/isabela.svg"
      },
      {
        "id": "otavio",
        "nome": "Dr. Otávio",
        "papel": "O advogado",
        "imagem": "assets/imagens/personagens/otavio.svg"
      },
      {
        "id": "lucia",
        "nome": "Dona Lúcia",
        "papel": "A governanta",
        "imagem": "assets/imagens/personagens/lucia.svg"
      },
      {
        "id": "henrique",
        "nome": "Dr. Henrique",
        "papel": "O médico da família",
        "imagem": "assets/imagens/personagens/henrique.svg"
      },
      {
        "id": "jorge",
        "nome": "Jorge",
        "papel": "O motorista",
        "imagem": "assets/imagens/personagens/jorge.svg"
      }
    ],
    "locais": [
      {
        "id": "biblioteca",
        "nome": "Biblioteca",
        "prep": "na",
        "recorte": [
          1082,
          182,
          276,
          228
        ]
      },
      {
        "id": "sala-de-estar",
        "nome": "Sala de Estar",
        "prep": "na",
        "recorte": [
          260,
          182,
          418,
          228
        ]
      },
      {
        "id": "cozinha",
        "nome": "Cozinha",
        "prep": "na",
        "recorte": [
          82,
          460,
          288,
          188
        ]
      },
      {
        "id": "quarto-principal",
        "nome": "Quarto Principal",
        "prep": "no",
        "recorte": [
          762,
          182,
          340,
          228
        ]
      },
      {
        "id": "porao",
        "nome": "Porão",
        "prep": "no",
        "recorte": [
          350,
          460,
          140,
          188
        ]
      },
      {
        "id": "sotao",
        "nome": "Sótão",
        "prep": "no",
        "recorte": [
          762,
          460,
          140,
          188
        ]
      },
      {
        "id": "jardim-de-inverno",
        "nome": "Jardim de Inverno",
        "prep": "no",
        "recorte": [
          200,
          628,
          360,
          150
        ]
      },
      {
        "id": "escritorio",
        "nome": "Escritório",
        "prep": "no",
        "recorte": [
          82,
          182,
          198,
          228
        ]
      }
    ],
    "armas": [
      {
        "id": "castical-pesado",
        "nome": "Castiçal pesado",
        "artigo": "o"
      },
      {
        "id": "abridor-de-cartas",
        "nome": "Abridor de cartas",
        "artigo": "o"
      },
      {
        "id": "veneno",
        "nome": "Veneno",
        "artigo": "o"
      },
      {
        "id": "corda-de-cortina",
        "nome": "Corda de cortina",
        "artigo": "a"
      },
      {
        "id": "trofeu-de-bronze",
        "nome": "Troféu de bronze",
        "artigo": "o"
      },
      {
        "id": "tesoura-de-podar",
        "nome": "Tesoura de podar",
        "artigo": "a"
      },
      {
        "id": "estatua-de-marmore",
        "nome": "Estátua de mármore",
        "artigo": "a"
      },
      {
        "id": "faca-de-caca",
        "nome": "Faca de caça",
        "artigo": "a"
      }
    ]
  },
  {
    "id": "cruzeiro",
    "nome": "O Cruzeiro de Luxo",
    "curto": "Cruzeiro de Luxo",
    "descricao": "Alto-mar, festa de gala e um passageiro que não volta para a cabine.",
    "misterio": "Durante a festa de gala, o joalheiro Armando Lisboa foi encontrado morto a bordo. O navio está em alto-mar: o culpado ainda está entre os passageiros e a tripulação.",
    "imagem": "assets/imagens/cenarios/cruzeiro.svg",
    "larguraImagem": 1000.0,
    "alturaImagem": 824.0,
    "suspeitos": [
      {
        "id": "almeida",
        "nome": "Capitão Almeida",
        "papel": "O capitão",
        "imagem": "assets/imagens/personagens/almeida.svg"
      },
      {
        "id": "beatriz",
        "nome": "Beatriz",
        "papel": "A baronesa",
        "imagem": "assets/imagens/personagens/beatriz.svg"
      },
      {
        "id": "carlos",
        "nome": "Carlos",
        "papel": "O chef",
        "imagem": "assets/imagens/personagens/carlos.svg"
      },
      {
        "id": "sofia",
        "nome": "Sofia",
        "papel": "A croupier",
        "imagem": "assets/imagens/personagens/sofia.svg"
      },
      {
        "id": "roberto",
        "nome": "Dr. Roberto",
        "papel": "O médico de bordo",
        "imagem": "assets/imagens/personagens/roberto.svg"
      },
      {
        "id": "marcos",
        "nome": "Marcos",
        "papel": "O mecânico",
        "imagem": "assets/imagens/personagens/marcos.svg"
      }
    ],
    "locais": [
      {
        "id": "cabine-do-capitao",
        "nome": "Cabine do Capitão",
        "prep": "na",
        "recorte": [
          760,
          375,
          130,
          150
        ]
      },
      {
        "id": "cassino",
        "nome": "Cassino",
        "prep": "no",
        "recorte": [
          540,
          230,
          210,
          230
        ]
      },
      {
        "id": "teatro",
        "nome": "Teatro",
        "prep": "no",
        "recorte": [
          290,
          440,
          270,
          230
        ]
      },
      {
        "id": "bar-da-piscina",
        "nome": "Bar da Piscina",
        "prep": "no",
        "recorte": [
          540,
          440,
          210,
          230
        ]
      },
      {
        "id": "restaurante-principal",
        "nome": "Restaurante Principal",
        "prep": "no",
        "recorte": [
          290,
          230,
          270,
          230
        ]
      },
      {
        "id": "cozinha-do-navio",
        "nome": "Cozinha do Navio",
        "prep": "na",
        "recorte": [
          70,
          440,
          240,
          230
        ]
      },
      {
        "id": "sala-de-maquinas",
        "nome": "Sala de Máquinas",
        "prep": "na",
        "recorte": [
          70,
          230,
          240,
          230
        ]
      },
      {
        "id": "conves-superior",
        "nome": "Convés Superior",
        "prep": "no",
        "recorte": [
          730,
          230,
          215,
          440
        ]
      }
    ],
    "armas": [
      {
        "id": "chave-inglesa",
        "nome": "Chave inglesa",
        "artigo": "a"
      },
      {
        "id": "garrafa-de-champanhe-quebrada",
        "nome": "Garrafa de champanhe quebrada",
        "artigo": "a"
      },
      {
        "id": "remo-de-aluminio",
        "nome": "Remo de alumínio",
        "artigo": "o"
      },
      {
        "id": "cabo-eletrico",
        "nome": "Cabo elétrico",
        "artigo": "o"
      },
      {
        "id": "cinzeiro-de-latao",
        "nome": "Cinzeiro de latão",
        "artigo": "o"
      },
      {
        "id": "faca-de-filetagem",
        "nome": "Faca de filetagem",
        "artigo": "a"
      },
      {
        "id": "ancorote-decorativo",
        "nome": "Ancorote decorativo",
        "artigo": "o"
      },
      {
        "id": "boia-de-salvamento-pesada",
        "nome": "Boia de salvamento pesada",
        "artigo": "a"
      }
    ]
  }
];

  /* No arquivo publicado as imagens vêm embutidas; localmente, usam o caminho da pasta assets. */
  function imagem(caminho) {
    const embutidas = raiz.IMAGENS_EMBUTIDAS || {};
    return embutidas[caminho] || caminho;
  }
  function buscarCenario(id) { return CENARIOS.find(c => c.id === id); }

  raiz.Cenarios = { lista: CENARIOS, buscar: buscarCenario, imagem };
  if (typeof module !== 'undefined') module.exports = raiz.Cenarios;
})(typeof window !== 'undefined' ? window : globalThis);
