
(function (raiz) {
  const Pistas = raiz.Pistas || (typeof require !== 'undefined' ? require('./pistas.js') : null);
  const Cenarios = raiz.Cenarios || (typeof require !== 'undefined' ? require('./cenarios.js') : null);

  const TEMPOS = [60, 120, 180, 300];   // opções de tempo por vez, em segundos
  const TEMPO_PADRAO = 180;             // 3 minutos

  function embaralhar(lista, rnd) {
    const a = lista.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const copiar = (x) => JSON.parse(JSON.stringify(x));

  /* jogadores: [{id, nome}] — a ordem dos turnos é sorteada aqui. */
  function criarPartida(cenarioId, jogadores, rnd = Math.random, tempoVez = TEMPO_PADRAO) {
    if (jogadores.length < 3 || jogadores.length > 6) throw new Error('A partida precisa de 3 a 6 jogadores.');
    const cen = Cenarios.buscar(cenarioId);
    const inv = Pistas.gerarInvestigacao(cen, rnd);
    return {
      cenario: cenarioId,
      jogadores: embaralhar(jogadores, rnd).map(j => ({ id: j.id, nome: j.nome, acusou: false, eliminado: false })),
      vez: 0,
      turno: 1,
      tempoVez: TEMPOS.includes(tempoVez) ? tempoVez : TEMPO_PADRAO,
      revelouNaVez: false,    // cada detetive revela no máximo uma pista por vez
      pistas: inv.pistas,
      reveladas: [],          // ids das pistas, na ordem em que foram reveladas
      reveladaPor: {},        // id da pista -> nome de quem revelou
      solucao: inv.solucao,
      passos: inv.passos,
      acusacoes: [],
      vencedor: null,
      fim: false,
      ultimoEvento: null
    };
  }

  const jogadorDaVez = (est) => est.jogadores[est.vez];
  const ativos = (est) => est.jogadores.filter(j => !j.eliminado);

  raiz.Partida = { TEMPOS, TEMPO_PADRAO, criarPartida, jogadorDaVez, ativos };
  if (typeof module !== 'undefined') module.exports = raiz.Partida;
})(typeof window !== 'undefined' ? window : globalThis);


(function (raiz) {
  const Pistas = raiz.Pistas || (typeof require !== 'undefined' ? require('./pistas.js') : null);
  const Cenarios = raiz.Cenarios || (typeof require !== 'undefined' ? require('./cenarios.js') : null);

  const TEMPOS = [60, 120, 180, 300];   // opções de tempo por vez, em segundos
  const TEMPO_PADRAO = 180;             // 3 minutos

  function embaralhar(lista, rnd) {
    const a = lista.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const copiar = (x) => JSON.parse(JSON.stringify(x));

  /* jogadores: [{id, nome}] — a ordem dos turnos é sorteada aqui. */
  function criarPartida(cenarioId, jogadores, rnd = Math.random, tempoVez = TEMPO_PADRAO) {
    if (jogadores.length < 3 || jogadores.length > 6) throw new Error('A partida precisa de 3 a 6 jogadores.');
    const cen = Cenarios.buscar(cenarioId);
    const inv = Pistas.gerarInvestigacao(cen, rnd);
    return {
      cenario: cenarioId,
      jogadores: embaralhar(jogadores, rnd).map(j => ({ id: j.id, nome: j.nome, acusou: false, eliminado: false })),
      vez: 0,
      turno: 1,
      tempoVez: TEMPOS.includes(tempoVez) ? tempoVez : TEMPO_PADRAO,
      revelouNaVez: false,    // cada detetive revela no máximo uma pista por vez
      pistas: inv.pistas,
      reveladas: [],          // ids das pistas, na ordem em que foram reveladas
      reveladaPor: {},        // id da pista -> nome de quem revelou
      solucao: inv.solucao,
      passos: inv.passos,
      acusacoes: [],
      vencedor: null,
      fim: false,
      ultimoEvento: null
    };
  }

  const jogadorDaVez = (est) => est.jogadores[est.vez];
  const ativos = (est) => est.jogadores.filter(j => !j.eliminado);
  const pistasRestantes = (est) => est.pistas.length - est.reveladas.length;

  function proximaVez(est) {
    if (ativos(est).length === 0) return est.vez;
    let i = est.vez;
    do { i = (i + 1) % est.jogadores.length; } while (est.jogadores[i].eliminado);
    return i;
  }
  function avancar(est) {
    est.vez = proximaVez(est);
    est.turno += 1;
    est.revelouNaVez = false;
    return est;
  }

  /* Revela uma pista nova. A vez NÃO passa: o detetive continua com o tempo que sobrou para analisar. */
  function revelarPista(estAtual, jogadorId) {
    const est = copiar(estAtual);
    if (est.fim || est.revelouNaVez || jogadorDaVez(est).id !== jogadorId) return estAtual;
    const proxima = est.pistas.find(p => !est.reveladas.includes(p.id));
    if (!proxima) return estAtual;
    est.reveladas.push(proxima.id);
    est.reveladaPor[proxima.id] = jogadorDaVez(est).nome;
    est.revelouNaVez = true;
    est.ultimoEvento = { tipo: 'pista', jogador: jogadorDaVez(est).nome, pista: proxima.id, n: est.reveladas.length, turno: est.turno };
    return est;
  }

  /* O detetive encerra a própria vez antes do tempo acabar. */
  function passarVez(estAtual, jogadorId) {
    const est = copiar(estAtual);
    if (est.fim || jogadorDaVez(est).id !== jogadorId) return estAtual;
    est.ultimoEvento = { tipo: 'passou', jogador: jogadorDaVez(est).nome };
    return avancar(est);
  }

  raiz.Partida = { TEMPOS, TEMPO_PADRAO, criarPartida, jogadorDaVez, ativos, pistasRestantes, revelarPista, passarVez, proximaVez };
  if (typeof module !== 'undefined') module.exports = raiz.Partida;
})(typeof window !== 'undefined' ? window : globalThis);


(function (raiz) {
  const Pistas = raiz.Pistas || (typeof require !== 'undefined' ? require('./pistas.js') : null);
  const Cenarios = raiz.Cenarios || (typeof require !== 'undefined' ? require('./cenarios.js') : null);

  const TEMPOS = [60, 120, 180, 300];   // opções de tempo por vez, em segundos
  const TEMPO_PADRAO = 180;             // 3 minutos

  function embaralhar(lista, rnd) {
    const a = lista.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const copiar = (x) => JSON.parse(JSON.stringify(x));

  /* jogadores: [{id, nome}] — a ordem dos turnos é sorteada aqui. */
  function criarPartida(cenarioId, jogadores, rnd = Math.random, tempoVez = TEMPO_PADRAO) {
    if (jogadores.length < 3 || jogadores.length > 6) throw new Error('A partida precisa de 3 a 6 jogadores.');
    const cen = Cenarios.buscar(cenarioId);
    const inv = Pistas.gerarInvestigacao(cen, rnd);
    return {
      cenario: cenarioId,
      jogadores: embaralhar(jogadores, rnd).map(j => ({ id: j.id, nome: j.nome, acusou: false, eliminado: false })),
      vez: 0,
      turno: 1,
      tempoVez: TEMPOS.includes(tempoVez) ? tempoVez : TEMPO_PADRAO,
      revelouNaVez: false,    // cada detetive revela no máximo uma pista por vez
      pistas: inv.pistas,
      reveladas: [],          // ids das pistas, na ordem em que foram reveladas
      reveladaPor: {},        // id da pista -> nome de quem revelou
      solucao: inv.solucao,
      passos: inv.passos,
      acusacoes: [],
      vencedor: null,
      fim: false,
      ultimoEvento: null
    };
  }

  const jogadorDaVez = (est) => est.jogadores[est.vez];
  const ativos = (est) => est.jogadores.filter(j => !j.eliminado);
  const pistasRestantes = (est) => est.pistas.length - est.reveladas.length;

  function proximaVez(est) {
    if (ativos(est).length === 0) return est.vez;
    let i = est.vez;
    do { i = (i + 1) % est.jogadores.length; } while (est.jogadores[i].eliminado);
    return i;
  }
  function avancar(est) {
    est.vez = proximaVez(est);
    est.turno += 1;
    est.revelouNaVez = false;
    return est;
  }

  /* Revela uma pista nova. A vez NÃO passa: o detetive continua com o tempo que sobrou para analisar. */
  function revelarPista(estAtual, jogadorId) {
    const est = copiar(estAtual);
    if (est.fim || est.revelouNaVez || jogadorDaVez(est).id !== jogadorId) return estAtual;
    const proxima = est.pistas.find(p => !est.reveladas.includes(p.id));
    if (!proxima) return estAtual;
    est.reveladas.push(proxima.id);
    est.reveladaPor[proxima.id] = jogadorDaVez(est).nome;
    est.revelouNaVez = true;
    est.ultimoEvento = { tipo: 'pista', jogador: jogadorDaVez(est).nome, pista: proxima.id, n: est.reveladas.length, turno: est.turno };
    return est;
  }

  /* O detetive encerra a própria vez antes do tempo acabar. */
  function passarVez(estAtual, jogadorId) {
    const est = copiar(estAtual);
    if (est.fim || jogadorDaVez(est).id !== jogadorId) return estAtual;
    est.ultimoEvento = { tipo: 'passou', jogador: jogadorDaVez(est).nome };
    return avancar(est);
  }

  /* O tempo da vez acabou. Só vale para o turno informado, para não pular duas vezes. */
  function tempoEsgotado(estAtual, turno) {
    const est = copiar(estAtual);
    if (est.fim || est.turno !== turno) return estAtual;
    est.ultimoEvento = { tipo: 'tempo', jogador: jogadorDaVez(est).nome };
    return avancar(est);
  }


  raiz.Partida = { TEMPOS, TEMPO_PADRAO, criarPartida, jogadorDaVez, ativos, pistasRestantes, revelarPista, passarVez, tempoEsgotado, proximaVez };
  if (typeof module !== 'undefined') module.exports = raiz.Partida;
})(typeof window !== 'undefined' ? window : globalThis);