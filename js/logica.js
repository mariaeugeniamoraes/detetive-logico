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

  const SIMBOLO = { e: ' ∧ ', ou: ' ∨ ', se: ' → ', sse: ' ↔ ' };

  function formula(x, letra) {
    // parênteses em toda subfórmula composta, para a leitura ficar sem ambiguidade
    const filho = (y) => {
      const t = formula(y, letra);
      return y.tipo === 'atomo' || y.tipo === 'nao' ? t : `(${t})`;
    };
    switch (x.tipo) {
      case 'atomo': return letra(x);
      case 'nao': return '¬' + filho(x.a);
      case 'e': case 'ou': return x.itens.map(filho).join(SIMBOLO[x.tipo]);
      default: return filho(x.a) + SIMBOLO[x.tipo] + filho(x.b);
    }
  }

  /* Frases de cada átomo. */
  function textoAtomo(a, cen, negado = false) {
    if (a.cat === 'S') {
      const s = cen.suspeitos[a.i];
      return negado ? `${s.nome} não cometeu o crime` : `${s.nome} cometeu o crime`;
    }
    if (a.cat === 'L') {
      const l = cen.locais[a.i];
      return `o crime ${negado ? 'não ' : ''}aconteceu ${l.prep} ${l.nome}`;
    }
    const w = cen.armas[a.i];
    return `a arma ${negado ? 'não ' : ''}foi ${w.artigo} ${w.nome}`;
  }

  const LETRAS = ['P', 'Q', 'R', 'S', 'T', 'U'];
  function representar(x, cen) {
    const lista = atomos(x);
    const letra = (a) => LETRAS[lista.findIndex(b => b.cat === a.cat && b.i === a.i)];
    return {
      formula: formula(x, letra),
      legenda: lista.map(a => ({ letra: letra(a), texto: textoAtomo(a, cen) }))
    };
  }

  const NOME_CONECTIVO = { nao: 'Negação', e: 'Conjunção', ou: 'Disjunção', se: 'Condicional', sse: 'Bicondicional', atomo: 'Proposição simples' };
  const SIMBOLO_CONECTIVO = { nao: '¬', e: '∧', ou: '∨', se: '→', sse: '↔', atomo: '' };

  /* ---------- tabela de eliminação ----------
     Cada item fica sem marcação, possível, eliminado ou confirmado.
     Cada detetive tem a própria tabela, e as marcações nunca mexem na solução. */
  const ESTADOS_MARCA = ['', 'possivel', 'eliminado', 'confirmado'];
  const NOME_MARCA = { '': 'sem marcação', possivel: 'possível', eliminado: 'eliminado', confirmado: 'confirmado' };

  function proximaMarca(atual) {
    return ESTADOS_MARCA[(ESTADOS_MARCA.indexOf(atual || '') + 1) % ESTADOS_MARCA.length];
  }
  function novaTabela() { return { S: {}, L: {}, A: {} }; }
  function completarTabela(t) { t.S = t.S || {}; t.L = t.L || {}; t.A = t.A || {}; return t; }
  /* Uma tabela por jogador: a de um nunca é a mesma do outro. */
  function tabelaDoJogador(tabelas, jogadorId) {
    if (!tabelas[jogadorId]) tabelas[jogadorId] = novaTabela();
    return completarTabela(tabelas[jogadorId]);
  }
  /* Avança a marcação de um item e devolve o novo estado. */
  function marcarItem(tabela, cat, i) {
    const nova = proximaMarca(tabela[cat][i]);
    if (nova) tabela[cat][i] = nova; else delete tabela[cat][i];
    return nova;
  }

  raiz.Logica = {
    atomo, nao, e, ou, se, sse, avaliar, solucoes, atomos, representar, textoAtomo, NOME_CONECTIVO, SIMBOLO_CONECTIVO,
    ESTADOS_MARCA, NOME_MARCA, proximaMarca, novaTabela, completarTabela, tabelaDoJogador, marcarItem
  };
  if (typeof module !== 'undefined') module.exports = raiz.Logica;
})(typeof window !== 'undefined' ? window : globalThis);
