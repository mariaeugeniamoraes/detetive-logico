/* logica.js — proposições, conectivos, verificação das pistas e tabela de eliminação.
   Responsável: Integrante 2 (Lógica Proposicional e Tabela de Eliminação).
   Uma proposição é uma árvore: átomos (S = culpado, L = local, A = arma)
   ligados por ¬, ∧, ∨, → e ↔. Um "mundo" é uma combinação {S, L, A}. */
(function (raiz) {
  const atomo = (cat, i) => ({ tipo: 'atomo', cat, i });
  const nao = (a) => ({ tipo: 'nao', a });
  const e = (...itens) => ({ tipo: 'e', itens });
  const ou = (...itens) => ({ tipo: 'ou', itens });
  const se = (a, b) => ({ tipo: 'se', a, b });
  const sse = (a, b) => ({ tipo: 'sse', a, b });

  function avaliar(x, mundo) {
    switch (x.tipo) {
      case 'atomo': return mundo[x.cat] === x.i;
      case 'nao': return !avaliar(x.a, mundo);
      case 'e': return x.itens.every(y => avaliar(y, mundo));
      case 'ou': return x.itens.some(y => avaliar(y, mundo));
      case 'se': return !avaliar(x.a, mundo) || avaliar(x.b, mundo);
      case 'sse': return avaliar(x.a, mundo) === avaliar(x.b, mundo);
    }
    throw new Error('Proposição inválida');
  }

  /* Verificação por força bruta: testa as 6 × 8 × 8 combinações possíveis. */
  function solucoes(proposicoes, cenario) {
    const achadas = [];
    for (let S = 0; S < cenario.suspeitos.length; S++)
      for (let L = 0; L < cenario.locais.length; L++)
        for (let A = 0; A < cenario.armas.length; A++) {
          const mundo = { S, L, A };
          if (proposicoes.every(p => avaliar(p, mundo))) achadas.push(mundo);
        }
    return achadas;
  }

  function atomos(x, lista = []) {
    if (x.tipo === 'atomo') {
      if (!lista.some(a => a.cat === x.cat && a.i === x.i)) lista.push(x);
    } else if (x.tipo === 'nao') atomos(x.a, lista);
    else if (x.tipo === 'e' || x.tipo === 'ou') x.itens.forEach(y => atomos(y, lista));
    else { atomos(x.a, lista); atomos(x.b, lista); }
    return lista;
  }


  raiz.Logica = { atomo, nao, e, ou, se, sse, avaliar, solucoes, atomos };
  if (typeof module !== 'undefined') module.exports = raiz.Logica;
})(typeof window !== 'undefined' ? window : globalThis);
