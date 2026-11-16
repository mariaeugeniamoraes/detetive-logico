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
  },
  {
    "id": "shopping",
    "nome": "O Shopping Center",
    "curto": "Shopping Center",
    "descricao": "Portas fechadas, câmeras desligadas e um corpo encontrado na ronda da madrugada.",
    "misterio": "Depois do fechamento, o vigia Sérgio Moura foi encontrado sem vida durante a ronda. As câmeras ficaram desligadas por vinte minutos. Seis pessoas ainda estavam no prédio.",
    "imagem": "assets/imagens/cenarios/shopping.svg",
    "larguraImagem": 1300.0,
    "alturaImagem": 944.0,
    "suspeitos": [
      {
        "id": "alberto",
        "nome": "Sr. Alberto",
        "papel": "O gerente geral",
        "imagem": "assets/imagens/personagens/alberto.svg"
      },
      {
        "id": "patricia",
        "nome": "Patrícia",
        "papel": "A segurança noturna",
        "imagem": "assets/imagens/personagens/patricia.svg"
      },
      {
        "id": "diego",
        "nome": "Diego",
        "papel": "O técnico de TI",
        "imagem": "assets/imagens/personagens/diego.svg"
      },
      {
        "id": "vanessa",
        "nome": "Vanessa",
        "papel": "A funcionária da limpeza",
        "imagem": "assets/imagens/personagens/vanessa.svg"
      },
      {
        "id": "renato",
        "nome": "Renato",
        "papel": "O lojista de eletrônicos",
        "imagem": "assets/imagens/personagens/renato.svg"
      },
      {
        "id": "luana",
        "nome": "Luana",
        "papel": "A arquiteta",
        "imagem": "assets/imagens/personagens/luana.svg"
      }
    ],
    "locais": [
      {
        "id": "praca-de-alimentacao",
        "nome": "Praça de Alimentação",
        "prep": "na",
        "recorte": [
          40,
          410,
          400,
          220
        ]
      },
      {
        "id": "cinema",
        "nome": "Cinema",
        "prep": "no",
        "recorte": [
          40,
          140,
          300,
          210
        ]
      },
      {
        "id": "loja-de-eletronicos",
        "nome": "Loja de Eletrônicos",
        "prep": "na",
        "recorte": [
          460,
          140,
          280,
          210
        ]
      },
      {
        "id": "loja-de-roupas",
        "nome": "Loja de Roupas",
        "prep": "na",
        "recorte": [
          720,
          140,
          310,
          210
        ]
      },
      {
        "id": "estacionamento-subterraneo",
        "nome": "Estacionamento Subterrâneo",
        "prep": "no",
        "recorte": [
          40,
          640,
          1220,
          240
        ]
      },
      {
        "id": "sala-de-seguranca",
        "nome": "Sala de Segurança",
        "prep": "na",
        "recorte": [
          560,
          410,
          200,
          220
        ]
      },
      {
        "id": "area-de-servico-docas",
        "nome": "Área de Serviço/Docas",
        "prep": "na",
        "recorte": [
          890,
          410,
          370,
          220
        ]
      },
      {
        "id": "corredor-principal",
        "nome": "Corredor Principal",
        "prep": "no",
        "recorte": [
          40,
          330,
          1220,
          100
        ]
      }
    ],
    "armas": [
      {
        "id": "extintor-de-incendio",
        "nome": "Extintor de incêndio",
        "artigo": "o"
      },
      {
        "id": "bastao-de-seguranca",
        "nome": "Bastão de segurança",
        "artigo": "o"
      },
      {
        "id": "trena-de-aco",
        "nome": "Trena de aço",
        "artigo": "a"
      },
      {
        "id": "tesoura-industrial",
        "nome": "Tesoura industrial",
        "artigo": "a"
      },
      {
        "id": "pe-de-cabra",
        "nome": "Pé de cabra",
        "artigo": "o"
      },
      {
        "id": "fio-de-nylon",
        "nome": "Fio de nylon",
        "artigo": "o"
      },
      {
        "id": "pedestal-de-fila-de-metal",
        "nome": "Pedestal de fila de metal",
        "artigo": "o"
      },
      {
        "id": "barra-de-ferro-de-vitrine",
        "nome": "Barra de ferro de vitrine",
        "artigo": "a"
      }
    ]
  },
  {
    "id": "trem",
    "nome": "O Trem de Luxo Expresso",
    "curto": "Trem de Luxo Expresso",
    "descricao": "Uma viagem noturna, depoimentos que não batem e nenhuma parada até o amanhecer.",
    "misterio": "No meio da viagem noturna, o magnata Vítor Prado foi encontrado morto. O trem não parou em nenhuma estação desde então. Todos os suspeitos estão a bordo.",
    "imagem": "assets/imagens/cenarios/trem.svg",
    "larguraImagem": 1000.0,
    "alturaImagem": 824.0,
    "suspeitos": [
      {
        "id": "joao",
        "nome": "João",
        "papel": "O maquinista",
        "imagem": "assets/imagens/personagens/joao.svg"
      },
      {
        "id": "helena",
        "nome": "Duquesa Helena",
        "papel": "A duquesa",
        "imagem": "assets/imagens/personagens/helena.svg"
      },
      {
        "id": "louis",
        "nome": "Louis",
        "papel": "O cantor de jazz",
        "imagem": "assets/imagens/personagens/louis.svg"
      },
      {
        "id": "clara",
        "nome": "Clara",
        "papel": "A jornalista",
        "imagem": "assets/imagens/personagens/clara.svg"
      },
      {
        "id": "paulo",
        "nome": "Paulo",
        "papel": "O comerciante",
        "imagem": "assets/imagens/personagens/paulo.svg"
      },
      {
        "id": "marta",
        "nome": "Marta",
        "papel": "A condutora",
        "imagem": "assets/imagens/personagens/marta.svg"
      }
    ],
    "locais": [
      {
        "id": "locomotiva",
        "nome": "Locomotiva",
        "prep": "na",
        "recorte": [
          30,
          215,
          228,
          110
        ]
      },
      {
        "id": "cabine-do-maquinista",
        "nome": "Cabine do Maquinista",
        "prep": "na",
        "recorte": [
          240,
          215,
          110,
          110
        ]
      },
      {
        "id": "vagao-leito-a",
        "nome": "Vagão-Leito A",
        "prep": "no",
        "recorte": [
          350,
          515,
          220,
          110
        ]
      },
      {
        "id": "vagao-leito-b",
        "nome": "Vagão-Leito B",
        "prep": "no",
        "recorte": [
          130,
          515,
          220,
          110
        ]
      },
      {
        "id": "vagao-restaurante",
        "nome": "Vagão-Restaurante",
        "prep": "no",
        "recorte": [
          570,
          215,
          240,
          110
        ]
      },
      {
        "id": "vagao-fumace",
        "nome": "Vagão-Fumacê",
        "prep": "no",
        "recorte": [
          570,
          515,
          240,
          110
        ]
      },
      {
        "id": "vagao-de-bagagens",
        "nome": "Vagão de Bagagens",
        "prep": "no",
        "recorte": [
          350,
          215,
          220,
          110
        ]
      },
      {
        "id": "plataforma-de-conexao",
        "nome": "Plataforma de Conexão",
        "prep": "na",
        "recorte": [
          832,
          340,
          148,
          160
        ]
      }
    ],
    "armas": [
      {
        "id": "chave-de-fenda",
        "nome": "Chave de fenda",
        "artigo": "a"
      },
      {
        "id": "garrafa-de-vidro-pesada",
        "nome": "Garrafa de vidro pesada",
        "artigo": "a"
      },
      {
        "id": "cinzeiro-de-metal",
        "nome": "Cinzeiro de metal",
        "artigo": "o"
      },
      {
        "id": "bengala-de-metal",
        "nome": "Bengala de metal",
        "artigo": "a"
      },
      {
        "id": "saca-rolhas-afiado",
        "nome": "Saca-rolhas afiado",
        "artigo": "o"
      },
      {
        "id": "fita-adesiva-industrial",
        "nome": "Fita adesiva industrial",
        "artigo": "a"
      },
      {
        "id": "extintor-compacto",
        "nome": "Extintor compacto",
        "artigo": "o"
      },
      {
        "id": "alca-de-couro-de-mala",
        "nome": "Alça de couro de mala",
        "artigo": "a"
      }
    ]
  },
  {
    "id": "acampamento",
    "nome": "O Acampamento na Floresta",
    "curto": "Acampamento na Floresta",
    "descricao": "Isolados ao redor do lago, sem sinal de celular e com um segredo entre as barracas.",
    "misterio": "Na manhã seguinte à fogueira, a coordenadora Cecília Ramos foi encontrada sem vida. A trilha estava bloqueada pela chuva: ninguém entrou nem saiu do acampamento.",
    "imagem": "assets/imagens/cenarios/acampamento.svg",
    "larguraImagem": 1000.0,
    "alturaImagem": 824.0,
    "suspeitos": [
      {
        "id": "lucas",
        "nome": "Lucas",
        "papel": "O guia",
        "imagem": "assets/imagens/personagens/lucas.svg"
      },
      {
        "id": "julia",
        "nome": "Júlia",
        "papel": "A campista",
        "imagem": "assets/imagens/personagens/julia.svg"
      },
      {
        "id": "bruno",
        "nome": "Bruno",
        "papel": "O fotógrafo",
        "imagem": "assets/imagens/personagens/bruno.svg"
      },
      {
        "id": "marina",
        "nome": "Marina",
        "papel": "A bióloga",
        "imagem": "assets/imagens/personagens/marina.svg"
      },
      {
        "id": "bernardo",
        "nome": "Bernardo",
        "papel": "O turista",
        "imagem": "assets/imagens/personagens/bernardo.svg"
      },
      {
        "id": "rosa",
        "nome": "Rosa",
        "papel": "A cozinheira",
        "imagem": "assets/imagens/personagens/rosa.svg"
      }
    ],
    "locais": [
      {
        "id": "refeitorio-central",
        "nome": "Refeitório Central",
        "prep": "no",
        "recorte": [
          590,
          650,
          280,
          130
        ]
      },
      {
        "id": "cabana-1",
        "nome": "Cabana 1",
        "prep": "na",
        "recorte": [
          145,
          145,
          170,
          120
        ]
      },
      {
        "id": "cabana-2",
        "nome": "Cabana 2",
        "prep": "na",
        "recorte": [
          420,
          128,
          170,
          120
        ]
      },
      {
        "id": "lagoa",
        "nome": "Lagoa",
        "prep": "na",
        "recorte": [
          310,
          345,
          392,
          235
        ]
      },
      {
        "id": "trilha-na-mata",
        "nome": "Trilha na Mata",
        "prep": "na",
        "recorte": [
          -320,
          280,
          1640,
          370
        ]
      },
      {
        "id": "gerador-de-energia",
        "nome": "Gerador de Energia",
        "prep": "no",
        "recorte": [
          720,
          140,
          145,
          115
        ]
      },
      {
        "id": "torre-de-observacao",
        "nome": "Torre de Observação",
        "prep": "na",
        "recorte": [
          35,
          390,
          140,
          135
        ]
      },
      {
        "id": "deposito-de-equipamentos",
        "nome": "Depósito de Equipamentos",
        "prep": "no",
        "recorte": [
          810,
          380,
          170,
          160
        ]
      }
    ],
    "armas": [
      {
        "id": "machado-de-lenha",
        "nome": "Machado de lenha",
        "artigo": "o"
      },
      {
        "id": "faca-de-caca",
        "nome": "Faca de caça",
        "artigo": "a"
      },
      {
        "id": "lanterna-pesada",
        "nome": "Lanterna pesada",
        "artigo": "a"
      },
      {
        "id": "corda-de-nailon",
        "nome": "Corda de náilon",
        "artigo": "a"
      },
      {
        "id": "frasco-de-repelente-inflamavel",
        "nome": "Frasco de repelente inflamável",
        "artigo": "o"
      },
      {
        "id": "espeto-de-ferro",
        "nome": "Espeto de ferro",
        "artigo": "o"
      },
      {
        "id": "galho-espinhoso",
        "nome": "Galho espinhoso",
        "artigo": "o"
      },
      {
        "id": "pa-de-jardinagem",
        "nome": "Pá de jardinagem",
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
