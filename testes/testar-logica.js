/* testar-logica.js — testes da lógica proposicional e da tabela de eliminação.
   Responsável: Integrante 2 (Lógica Proposicional e Tabela de Eliminação).
   Como rodar (precisa do Node.js): node testes/testar-logica.js */
const assert = require('assert');
const Logica = require('../js/logica.js');
globalThis.Logica = Logica;
const Cenarios = require('../js/cenarios.js');
const Pistas = require('../js/pistas.js');
const { atomo, nao, e, ou, se, sse, avaliar } = Logica;

let ok = 0;
function teste(nome, fn) { fn(); ok++; console.log('  ok  ' + nome); }

/* P = "o suspeito 0 cometeu o crime", Q = "foi no local 0", R = "foi com a arma 0".
   Cada mundo liga ou desliga P, Q e R: são as 8 linhas da tabela-verdade. */
const P = atomo('S', 0), Q = atomo('L', 0), R = atomo('A', 0);
const mundos = [];
for (const p of [true, false]) for (const q of [true, false]) for (const r of [true, false])
  mundos.push({ p, q, r, mundo: { S: p ? 0 : 1, L: q ? 0 : 1, A: r ? 0 : 1 } });

/* Uma regra de inferência é válida quando a conclusão é verdadeira em todas as
   linhas em que todas as premissas são verdadeiras. Isto é só uma tabela-verdade,
   não um provador de teoremas. */
function valida(premissas, conclusao) {
  return mundos.every(({ mundo }) => !premissas.every(x => avaliar(x, mundo)) || avaliar(conclusao, mundo));
}

console.log('Tabelas-verdade dos conectivos');
teste('negação (¬)', () => mundos.forEach(({ p, mundo }) => assert.equal(avaliar(nao(P), mundo), !p)));
teste('conjunção (∧)', () => mundos.forEach(({ p, q, mundo }) => assert.equal(avaliar(e(P, Q), mundo), p && q)));
teste('disjunção (∨)', () => mundos.forEach(({ p, q, mundo }) => assert.equal(avaliar(ou(P, Q), mundo), p || q)));
teste('condicional (→)', () => mundos.forEach(({ p, q, mundo }) => assert.equal(avaliar(se(P, Q), mundo), !p || q)));
teste('bicondicional (↔)', () => mundos.forEach(({ p, q, mundo }) => assert.equal(avaliar(sse(P, Q), mundo), p === q)));

console.log('Regras de dedução');
teste('modus ponens: P → Q, P ⊢ Q', () => assert(valida([se(P, Q), P], Q)));
teste('modus tollens: P → Q, ¬Q ⊢ ¬P', () => assert(valida([se(P, Q), nao(Q)], nao(P))));
teste('silogismo disjuntivo: P ∨ Q, ¬P ⊢ Q', () => assert(valida([ou(P, Q), nao(P)], Q)));
teste('silogismo hipotético: P → Q, Q → R ⊢ P → R', () => assert(valida([se(P, Q), se(Q, R)], se(P, R))));
teste('bicondicional: P ↔ Q, P ⊢ Q', () => assert(valida([sse(P, Q), P], Q)));
teste('afirmar o consequente NÃO vale: P → Q, Q ⊬ P', () => assert(!valida([se(P, Q), Q], P)));

console.log('Representação das pistas');
teste('fórmula e legenda usam as letras P, Q, R', () => {
  const cen = Cenarios.lista[0];
  const rep = Logica.representar(se(atomo('L', 0), ou(atomo('A', 1), atomo('A', 2))), cen);
  assert.equal(rep.formula, 'P → (Q ∨ R)');
  assert.deepEqual(rep.legenda.map(l => l.letra), ['P', 'Q', 'R']);
});

console.log('Tabela de eliminação');
teste('ciclo: sem marcação → possível → eliminado → confirmado → sem marcação', () => {
  assert.deepEqual(['', 'possivel', 'eliminado', 'confirmado'].map(Logica.proximaMarca), ['possivel', 'eliminado', 'confirmado', '']);
});
teste('cada jogador tem a própria tabela', () => {
  const tabelas = {};
  const ana = Logica.tabelaDoJogador(tabelas, 'ana'), bia = Logica.tabelaDoJogador(tabelas, 'bia');
  Logica.marcarItem(ana, 'S', 2); Logica.marcarItem(ana, 'S', 2);
  assert.equal(ana.S[2], 'eliminado');
  assert.equal(bia.S[2], undefined);
  assert.strictEqual(Logica.tabelaDoJogador(tabelas, 'ana'), ana);
});
teste('voltar para sem marcação apaga o item', () => {
  const t = Logica.novaTabela();
  for (let k = 0; k < 4; k++) Logica.marcarItem(t, 'A', 5);
  assert.equal('5' in t.A, false);
});

console.log('Investigações dos cinco cenários');
teste('cada investigação sorteada tem uma única solução', () => {
  for (const cen of Cenarios.lista) {
    for (let k = 0; k < 100; k++) {
      const inv = Pistas.gerarInvestigacao(cen);
      assert.equal(inv.pistas.length >= 10, true);
      const sols = Logica.solucoes(inv.proposicoes, cen);
      assert.equal(sols.length, 1);
      assert.deepEqual(sols[0], inv.solucao);
    }
  }
});

console.log(`\n${ok} testes passaram.`);
