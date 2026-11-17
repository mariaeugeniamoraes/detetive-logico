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

  /* ---------- geração do crime e das pistas ---------- */
  function gerarInvestigacao(cen, rnd = Math.random) {
    const nS = cen.suspeitos.length, nL = cen.locais.length, nA = cen.armas.length;
    for (let tentativa = 0; tentativa < 200; tentativa++) {
      const S = inteiro(nS, rnd), Lc = inteiro(nL, rnd), A = inteiro(nA, rnd);
      const oL = embaralhar(sem(nL, [Lc]), rnd);
      const oA = embaralhar(sem(nA, [A]), rnd);
      const oS = embaralhar(sem(nS, [S]), rnd);
      const [d1, d2, lf, lx, lg] = oL;
      const [w, u, y, y2] = oA;
      const [q, m, e1, a1, b1] = oS;
      const sL = (i) => atomo('L', i), sA = (i) => atomo('A', i), sS = (i) => atomo('S', i);

      const papel = {};
      papel.disjLocal = ou(...embaralhar([sL(Lc), sL(d1), sL(d2)], rnd));
      papel.negLocal = nao(sL(d1));
      papel.condLocalArma = se(sL(d2), sA(w));
      papel.condArmaSuspeito = se(sA(w), sS(q));
      papel.negSuspeito = rnd() < .5 ? nao(sS(q)) : e(nao(sS(q)), nao(sS(m)));
      papel.condLocalArmas = se(sL(Lc), ou(...embaralhar([sA(A), sA(u)], rnd)));
      papel.negArma = rnd() < .5 ? nao(sA(u)) : e(nao(sA(u)), nao(sL(lx)));
      papel.bicond = rnd() < .5 ? sse(sS(S), sA(A)) : sse(sA(A), sS(S));

      const extras = embaralhar([
        sse(sS(e1), sL(lf)),                 // bicondicional com os dois lados falsos
        e(nao(sS(a1)), nao(sS(b1))),         // conjunção de negações
        nao(sA(y)),                          // negação simples
        ou(...embaralhar([sS(S), sS(q)], rnd)), // disjunção resolvida por silogismo disjuntivo
        se(sA(y2), sL(lg))                   // condicional eliminada por modus tollens
      ], rnd).slice(0, 3);

      const exprs = [...Object.values(papel), ...extras];
      const verdadeiro = { S, L: Lc, A };
      if (!exprs.every(x => L.avaliar(x, verdadeiro))) continue;
      const sols = L.solucoes(exprs, cen);
      if (sols.length !== 1) continue;
      // nenhuma pista sozinha pode entregar uma resposta inteira
      const entrega = exprs.some(x => {
        const s1 = L.solucoes([x], cen);
        return ['S', 'L', 'A'].some(k => s1.every(w2 => w2[k] === s1[0][k]));
      });
      if (entrega) continue;

      const pistas = embaralhar(exprs.map(x => montarPista(x, cen)), rnd).map((p, i) => ({ ...p, id: i }));
      const passos = [];
      // as proposições ficam separadas (servem para os testes); a partida salva só os textos
      const proposicoes = pistas.map(p => p.expr);
      pistas.forEach(p => { delete p.expr; });
      return { solucao: verdadeiro, pistas, passos, proposicoes };
    }
    throw new Error('Não foi possível montar as pistas');
  }

  raiz.Pistas = { gerarInvestigacao, frase, texto };
  if (typeof module !== 'undefined') module.exports = raiz.Pistas;
})(typeof window !== 'undefined' ? window : globalThis);
