
(function (raiz) {
  let db = null, usuario = null, meuId = null;

  async function iniciar() {
    if (!raiz.claude || typeof raiz.claude.use !== 'function') return { ok: false };
    try {
      db = await raiz.claude.use('db');
      usuario = await raiz.claude.use('user');
      if (!db || !usuario) return { ok: false };
      meuId = await usuario.id();
      if (!meuId) return { ok: false };
      let podeEscrever = null;
      try { podeEscrever = await usuario.can('data.write'); } catch (e) { podeEscrever = null; }
      return { ok: true, podeEscrever: podeEscrever !== false };
    } catch (e) {
      return { ok: false };
    }
  }

  /* O estado vai embaralhado no banco para que a solução não fique legível à toa.
     Não é criptografia: serve só para não estragar a surpresa. */
  function codificar(obj, chave) {
    const bytes = new TextEncoder().encode(JSON.stringify(obj));
    const k = new TextEncoder().encode('detetive:' + chave);
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i] ^ k[i % k.length]);
    return btoa(bin);
  }
  function decodificar(txt, chave) {
    const bin = atob(txt);
    const k = new TextEncoder().encode('detetive:' + chave);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i) ^ k[i % k.length];
    return JSON.parse(new TextDecoder().decode(bytes));
  }

  const docSala = (codigo) => db.doc('salas/' + codigo);
  const colJogadores = (codigo) => db.collection('salas/' + codigo + '/jogadores');
  const docMarcas = (codigo) => db.collection('data/users/' + meuId).doc('sala-' + codigo);

  function normalizarCodigo(txt) { return String(txt || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }

  async function criarSala(cenarioId, nome, tempoVez) {
    for (let t = 0; t < 8; t++) {
      const codigo = 'DET' + String(Math.floor(100 + Math.random() * 900));
      const snap = await docSala(codigo).get();
      if (snap.exists && snap.data().status !== 'fim') continue;
      await docSala(codigo).set({ codigo, cenario: cenarioId, tempoVez, status: 'espera', anfitriao: meuId, criadaEm: Date.now(), estado: '' });
      await colJogadores(codigo).doc(meuId).set({ nome, entrou: Date.now() });
      return codigo;
    }
    throw new Error('Não foi possível criar a sala agora. Tente de novo.');
  }

  async function entrarSala(codigoTxt, nome) {
    const codigo = normalizarCodigo(codigoTxt);
    const snap = await docSala(codigo).get();
    if (!snap.exists) throw new Error('Nenhuma sala com o código ' + codigo + '. Confira o código com quem criou a sala.');
    const sala = snap.data();
    if (sala.status === 'fim') throw new Error('Essa investigação já terminou. Peça um código novo.');
    if (sala.status === 'jogo') {
      const est = decodificar(sala.estado, codigo);
      if (!est.jogadores.some(j => j.id === meuId)) throw new Error('Essa investigação já começou sem você.');
      return codigo;
    }
    const jogs = await colJogadores(codigo).get();
    const jaEstou = jogs.docs.some(d => d.id === meuId);
    if (!jaEstou && jogs.size >= 6) throw new Error('A sala já tem 6 jogadores.');
    await colJogadores(codigo).doc(meuId).set({ nome, entrou: Date.now() });
    return codigo;
  }


  raiz.Salas = {
    iniciar, criarSala, entrarSala, normalizarCodigo, codificar, decodificar,
    get meuId() { return meuId; }
  };
})(typeof window !== 'undefined' ? window : globalThis);
(function (raiz) {
  let db = null, usuario = null, meuId = null;

  async function iniciar() {
    if (!raiz.claude || typeof raiz.claude.use !== 'function') return { ok: false };
    try {
      db = await raiz.claude.use('db');
      usuario = await raiz.claude.use('user');
      if (!db || !usuario) return { ok: false };
      meuId = await usuario.id();
      if (!meuId) return { ok: false };
      let podeEscrever = null;
      try { podeEscrever = await usuario.can('data.write'); } catch (e) { podeEscrever = null; }
      return { ok: true, podeEscrever: podeEscrever !== false };
    } catch (e) {
      return { ok: false };
    }
  }

  /* O estado vai embaralhado no banco para que a solução não fique legível à toa.
     Não é criptografia: serve só para não estragar a surpresa. */
  function codificar(obj, chave) {
    const bytes = new TextEncoder().encode(JSON.stringify(obj));
    const k = new TextEncoder().encode('detetive:' + chave);
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i] ^ k[i % k.length]);
    return btoa(bin);
  }
  function decodificar(txt, chave) {
    const bin = atob(txt);
    const k = new TextEncoder().encode('detetive:' + chave);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i) ^ k[i % k.length];
    return JSON.parse(new TextDecoder().decode(bytes));
  }

  const docSala = (codigo) => db.doc('salas/' + codigo);
  const colJogadores = (codigo) => db.collection('salas/' + codigo + '/jogadores');
  const docMarcas = (codigo) => db.collection('data/users/' + meuId).doc('sala-' + codigo);

  function normalizarCodigo(txt) { return String(txt || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }

  async function criarSala(cenarioId, nome, tempoVez) {
    for (let t = 0; t < 8; t++) {
      const codigo = 'DET' + String(Math.floor(100 + Math.random() * 900));
      const snap = await docSala(codigo).get();
      if (snap.exists && snap.data().status !== 'fim') continue;
      await docSala(codigo).set({ codigo, cenario: cenarioId, tempoVez, status: 'espera', anfitriao: meuId, criadaEm: Date.now(), estado: '' });
      await colJogadores(codigo).doc(meuId).set({ nome, entrou: Date.now() });
      return codigo;
    }
    throw new Error('Não foi possível criar a sala agora. Tente de novo.');
  }

  async function entrarSala(codigoTxt, nome) {
    const codigo = normalizarCodigo(codigoTxt);
    const snap = await docSala(codigo).get();
    if (!snap.exists) throw new Error('Nenhuma sala com o código ' + codigo + '. Confira o código com quem criou a sala.');
    const sala = snap.data();
    if (sala.status === 'fim') throw new Error('Essa investigação já terminou. Peça um código novo.');
    if (sala.status === 'jogo') {
      const est = decodificar(sala.estado, codigo);
      if (!est.jogadores.some(j => j.id === meuId)) throw new Error('Essa investigação já começou sem você.');
      return codigo;
    }
    const jogs = await colJogadores(codigo).get();
    const jaEstou = jogs.docs.some(d => d.id === meuId);
    if (!jaEstou && jogs.size >= 6) throw new Error('A sala já tem 6 jogadores.');
    await colJogadores(codigo).doc(meuId).set({ nome, entrou: Date.now() });
    return codigo;
  }

  function ouvirSala(codigo, aoMudar, aoFalhar) {
    return docSala(codigo).onSnapshot(snap => {
      if (!snap.exists) { aoMudar(null); return; }
      const sala = { ...snap.data() };
      sala.partida = sala.estado ? decodificar(sala.estado, codigo) : null;
      aoMudar(sala, snap.metadata);
    }, aoFalhar);
  }
  function ouvirJogadores(codigo, aoMudar, aoFalhar) {
    return colJogadores(codigo).onSnapshot(qs => {
      const lista = qs.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => a.entrou - b.entrou);
      aoMudar(lista);
    }, aoFalhar);
  }

  async function comecarPartida(codigo, estado) {
    await docSala(codigo).update({ status: 'jogo', estado: codificar(estado, codigo) });
  }
  let gravando = Promise.resolve();
  function salvarEstado(codigo, estado) {
    gravando = gravando.then(() => docSala(codigo).update({ estado: codificar(estado, codigo), status: estado.fim ? 'fim' : 'jogo' }));
    return gravando;
  }
  async function sairDaSala(codigo) { try { await colJogadores(codigo).doc(meuId).delete(); } catch (e) { /* sem conexão: tudo bem */ } }

  async function carregarMarcas(codigo) {
    try { const s = await docMarcas(codigo).get(); return s.exists ? (s.data().marcas || {}) : {}; } catch (e) { return {}; }
  }
  let timerMarcas = null;
  function salvarMarcas(codigo, marcas) {
    clearTimeout(timerMarcas);
    timerMarcas = setTimeout(() => { docMarcas(codigo).set({ marcas }).catch(() => {}); }, 700);
  }

  raiz.Salas = {
    iniciar, criarSala, entrarSala, ouvirSala, ouvirJogadores, comecarPartida, salvarEstado, sairDaSala,
    carregarMarcas, salvarMarcas, normalizarCodigo, codificar, decodificar,
    get meuId() { return meuId; }
  };
})(typeof window !== 'undefined' ? window : globalThis);