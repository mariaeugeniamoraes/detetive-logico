/* pistas.js — Responsável: Integrante 3 (Cenários e Sistema de Pistas).
   Sorteia o crime e monta um conjunto de pistas verdadeiras
   cuja única solução é o crime sorteado. Cada pista traz a frase em português,
   a fórmula, a legenda das letras e o conectivo principal. */
(function (raiz) {
  const L = raiz.Logica || (typeof require !== 'undefined' ? require('./logica.js') : null);
  const { atomo, nao, e, ou, se, sse } = L;

  function inteiro(n, rnd) { return Math.floor(rnd() * n); }
  function embaralhar(lista, rnd) {
    const a = lista.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = inteiro(i + 1, rnd); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function sem(n, excluir) { return Array.from({ length: n }, (_, i) => i).filter(i => !excluir.includes(i)); }
  const maiuscula = (t) => t.charAt(0).toUpperCase() + t.slice(1);

  /* ---------- frases ---------- */
  function listaComOu(itens) { return itens.length === 1 ? itens[0] : itens.slice(0, -1).join(', ') + ' ou ' + itens[itens.length - 1]; }
  function texto(x, cen) {
    if (x.tipo === 'atomo') return L.textoAtomo(x, cen);
    if (x.tipo === 'nao' && x.a.tipo === 'atomo') return L.textoAtomo(x.a, cen, true);
    if (x.tipo === 'ou' && x.itens.every(y => y.tipo === 'atomo' && y.cat === x.itens[0].cat)) {
      const cat = x.itens[0].cat;
      if (cat === 'L') return 'o crime aconteceu ' + listaComOu(x.itens.map(y => `${cen.locais[y.i].prep} ${cen.locais[y.i].nome}`));
      if (cat === 'A') return 'a arma foi ' + listaComOu(x.itens.map(y => `${cen.armas[y.i].artigo} ${cen.armas[y.i].nome}`));
      return 'quem cometeu o crime foi ' + listaComOu(x.itens.map(y => cen.suspeitos[y.i].nome));
    }
    if (x.tipo === 'e' && x.itens.every(y => y.tipo === 'nao' && y.a.tipo === 'atomo' && y.a.cat === 'S'))
      return 'nem ' + x.itens.map(y => cen.suspeitos[y.a.i].nome).join(' nem ') + ' cometeram o crime';
    if (x.tipo === 'e') return x.itens.map(y => texto(y, cen)).join(' e ');
    if (x.tipo === 'ou') return x.itens.map(y => texto(y, cen)).join(' ou ');
    if (x.tipo === 'se') return `se ${texto(x.a, cen)}, então ${texto(x.b, cen)}`;
    if (x.tipo === 'sse') return `${texto(x.a, cen)} se, e somente se, ${texto(x.b, cen)}`;
    if (x.tipo === 'nao') return 'não é verdade que ' + texto(x.a, cen);
    return '';
  }
  function frase(x, cen) { return maiuscula(texto(x, cen)) + '.'; }

  function montarPista(expr, cen) {
    const rep = L.representar(expr, cen);
    return {
      frase: frase(expr, cen),
      formula: rep.formula,
      legenda: rep.legenda,
      conectivo: L.NOME_CONECTIVO[expr.tipo],
      simbolo: L.SIMBOLO_CONECTIVO[expr.tipo],
      expr
    };
  }

  raiz.Pistas = { frase, texto };
  if (typeof module !== 'undefined') module.exports = raiz.Pistas;
})(typeof window !== 'undefined' ? window : globalThis);
