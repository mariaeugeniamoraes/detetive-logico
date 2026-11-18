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


  raiz.Logica = { atomo, nao, e, ou, se, sse, avaliar };
  if (typeof module !== 'undefined') module.exports = raiz.Logica;
})(typeof window !== 'undefined' ? window : globalThis);
