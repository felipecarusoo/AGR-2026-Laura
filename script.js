const dadosCardsConteudo = [
  {
    id: 1,
    categoria: "preservacao",
    titulo: "Reducao do uso de papel",
    resumo: "Priorizar formatos digitais evita desperdicio e protege recursos florestais.",
    detalhe: "Use documentos online, assinaturas digitais e impressao frente e verso apenas quando necessario."
  },
  {
    id: 2,
    categoria: "conservacao",
    titulo: "Separacao correta de residuos",
    resumo: "Separar residuos melhora a reciclagem e evita contaminacao do solo e da agua.",
    detalhe: "Organize reciclaveis por tipo e descarte pilhas, eletronicos e oleo em pontos de coleta especializados."
  },
  {
    id: 3,
    categoria: "economia",
    titulo: "Energia renovavel no campo",
    resumo: "Fontes limpas reduzem custos e diminuem emissao de gases do efeito estufa.",
    detalhe: "Paineis solares e sistemas hibridos ajudam produtores a aumentar eficiencia com menor impacto."
  },
  {
    id: 4,
    categoria: "conservacao",
    titulo: "Reaproveitamento da agua",
    resumo: "Reuso da agua reduz consumo de fontes naturais e melhora a gestao hidrica.",
    detalhe: "Capte agua da chuva para limpeza, irrigacao e atividades que nao exigem agua potavel."
  },
  {
    id: 5,
    categoria: "economia",
    titulo: "Economia circular",
    resumo: "Reutilizar materiais mantem recursos em uso por mais tempo.",
    detalhe: "Recuperar, reparar e reciclar produtos reduz custos de producao e descarte."
  },
  {
    id: 6,
    categoria: "preservacao",
    titulo: "Mobilidade sustentavel",
    resumo: "Transporte consciente diminui poluicao do ar e gasto energetico.",
    detalhe: "Caminhar, pedalar, compartilhar veiculos e usar transporte coletivo sao alternativas eficazes."
  }
];

const dadosOds = [
  { numero: 1, titulo: "Erradicacao da Pobreza", direta: false, descricao: "Combater pobreza no meio rural amplia acesso a tecnologia, renda e oportunidades no campo." },
  { numero: 2, titulo: "Fome Zero", direta: true, descricao: "Promove producao de alimentos com seguranca e qualidade de forma sustentavel." },
  { numero: 3, titulo: "Saude e Bem-Estar", direta: false, descricao: "Boas praticas agricolas reduzem contaminacoes e melhoram qualidade de vida de trabalhadores e consumidores." },
  { numero: 4, titulo: "Educacao de Qualidade", direta: false, descricao: "Capacitacao tecnica no agro acelera inovacao, produtividade e adocao de praticas sustentaveis." },
  { numero: 5, titulo: "Igualdade de Genero", direta: false, descricao: "A participacao das mulheres no agronegocio fortalece a gestao, renda familiar e desenvolvimento local." },
  { numero: 6, titulo: "Agua Potavel", direta: true, descricao: "Incentiva uso eficiente da agua na irrigacao e no processamento agroindustrial." },
  { numero: 7, titulo: "Energia Limpa", direta: true, descricao: "Estimula energia solar e outras fontes renovaveis no campo." },
  { numero: 8, titulo: "Trabalho Decente", direta: false, descricao: "Valoriza relacoes de trabalho seguras e justas em toda a cadeia do agronegocio." },
  { numero: 9, titulo: "Inovacao e Infraestrutura", direta: false, descricao: "Infraestrutura e tecnologia permitem produzir mais com menos impacto ambiental." },
  { numero: 10, titulo: "Reducao das Desigualdades", direta: false, descricao: "Fortalecer pequenos produtores ajuda na distribuicao de renda e no desenvolvimento regional." },
  { numero: 11, titulo: "Cidades Sustentaveis", direta: false, descricao: "O agro sustenta centros urbanos com abastecimento, rastreabilidade e logistica eficiente." },
  { numero: 12, titulo: "Consumo Responsavel", direta: true, descricao: "Reduz perdas, desperdicios e melhora eficiencia da cadeia produtiva." },
  { numero: 13, titulo: "Acao Climatica", direta: true, descricao: "Orienta tecnicas de baixa emissao e maior resiliencia a eventos extremos." },
  { numero: 14, titulo: "Vida na Agua", direta: false, descricao: "Manejo correto do solo e insumos evita contaminacao de rios, lagos e nascentes." },
  { numero: 15, titulo: "Vida Terrestre", direta: true, descricao: "Valoriza conservacao do solo, da biodiversidade e recuperacao de areas." },
  { numero: 16, titulo: "Paz e Justica", direta: false, descricao: "Seguranca juridica e governanca fortalecem relacoes comerciais e ambientais no setor." },
  { numero: 17, titulo: "Parcerias", direta: false, descricao: "Cooperacao entre escolas, produtores, governo e ciencia acelera resultados sustentaveis." }
];

const listaPraticasDinamica = document.getElementById("lista-praticas-dinamica");
const gradeCardsConteudo = document.getElementById("grade-cards-conteudo");
const botoesFiltro = document.querySelectorAll(".botao-filtro");
const blocosComCategoria = document.querySelectorAll("[data-categoria]");
const botaoTopo = document.getElementById("botao-topo");
const botaoMenuMobile = document.getElementById("botao-menu-mobile");
const listaMenu = document.getElementById("lista-menu");
const slidesBanner = document.querySelectorAll(".slide-banner");
const botaoSlideAnterior = document.getElementById("botao-slide-anterior");
const botaoSlideProximo = document.getElementById("botao-slide-proximo");
const indicadoresSlide = document.getElementById("indicadores-slide");
const gradeOdsVisual = document.getElementById("grade-ods-visual");

let filtroAtual = "todos";
let indiceSlideAtual = 0;
let intervaloCarrossel = null;
const intervaloCarrosselMs = 2200;

function obterClasseCorOds(numero) {
  const mapa = { 2: "ods-2", 6: "ods-6", 7: "ods-7", 12: "ods-12", 13: "ods-13", 15: "ods-15" };
  return mapa[numero] || "";
}

function obterArquivosOds(numero) {
  const nomesComHifen = [8, 10, 11, 12, 13, 14, 15, 16, 17];
  const prefixo = nomesComHifen.includes(numero) ? `ODS-${numero}` : `ODS ${numero}`;
  return {
    colorida: `assets/img/ods/${prefixo}.png`,
    pb: `assets/img/ods/${prefixo} PB.png`
  };
}

function renderizarPainelOds() {
  if (!gradeOdsVisual) return;

  gradeOdsVisual.innerHTML = dadosOds
    .map((ods) => {
      const destaque = ods.direta ? `direta ${obterClasseCorOds(ods.numero)}` : "indireta";
      const arquivos = obterArquivosOds(ods.numero);
      const textoLigacao = "Ligacao direta";
      return `
        <article class="ods-item-visual ${destaque}" tabindex="0" data-ods="${ods.numero}" data-titulo="ODS ${ods.numero} - ${ods.titulo}" data-descricao="${ods.descricao}">
          <img class="ods-img ods-img-pb" src="${arquivos.pb}" alt="ODS ${ods.numero} em preto e branco">
          <img class="ods-img ods-img-cor" src="${arquivos.colorida}" alt="ODS ${ods.numero} colorida">
          ${ods.direta ? `<span class="selo-ods">${textoLigacao}</span>` : ""}
          <div class="box-flutuante-ods">${ods.descricao}</div>
        </article>
      `;
    })
    .join("");

  const cardsOds = gradeOdsVisual.querySelectorAll(".ods-item-visual");
  cardsOds.forEach((card) => {
    card.addEventListener("click", () => {
      const jaAtivo = card.classList.contains("ativo");
      cardsOds.forEach((item) => item.classList.remove("ativo"));
      if (!jaAtivo) card.classList.add("ativo");
    });

    card.addEventListener("keydown", (evento) => {
      if (evento.key !== "Enter" && evento.key !== " ") return;
      evento.preventDefault();
      card.click();
    });
  });
}

function criarItemPratica(item) {
  return `
    <article class="item-pratica" data-categoria="${item.categoria}">
      <h3>${item.titulo}</h3>
      <p>${item.resumo}</p>
    </article>
  `;
}

function criarCardConteudo(item) {
  return `
    <article class="cartao-conteudo" data-categoria="${item.categoria}">
      <h4>${item.titulo}</h4>
      <p>${item.resumo}</p>
      <button class="botao-saiba-mais" data-id-card="${item.id}" aria-expanded="false">Saiba mais</button>
      <div class="conteudo-extra oculto">${item.detalhe}</div>
    </article>
  `;
}

function renderizarConteudoDinamico() {
  if (!listaPraticasDinamica || !gradeCardsConteudo) return;
  listaPraticasDinamica.innerHTML = dadosCardsConteudo.map(criarItemPratica).join("");
  gradeCardsConteudo.innerHTML = dadosCardsConteudo.map(criarCardConteudo).join("");
}

function aplicarFiltro(categoria) {
  filtroAtual = categoria;

  blocosComCategoria.forEach((bloco) => {
    const categoriaBloco = bloco.dataset.categoria;
    const deveExibir = categoria === "todos" || categoriaBloco === categoria;
    bloco.classList.toggle("oculto", !deveExibir);
  });

  document.querySelectorAll(".item-pratica, .cartao-conteudo").forEach((item) => {
    const categoriaItem = item.dataset.categoria;
    const deveExibir = categoria === "todos" || categoriaItem === categoria;
    item.classList.toggle("oculto", !deveExibir);
  });

  botoesFiltro.forEach((botao) => {
    const ativo = botao.dataset.filtro === categoria;
    botao.classList.toggle("ativo", ativo);
    botao.setAttribute("aria-pressed", ativo ? "true" : "false");
  });
}

function ativarEventosSaibaMais() {
  if (!gradeCardsConteudo) return;
  gradeCardsConteudo.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".botao-saiba-mais");
    if (!botao) return;

    const cartao = botao.closest(".cartao-conteudo");
    const conteudoExtra = cartao.querySelector(".conteudo-extra");
    const estaExpandido = !conteudoExtra.classList.contains("oculto");

    conteudoExtra.classList.toggle("oculto");
    botao.textContent = estaExpandido ? "Saiba mais" : "Recolher";
    botao.setAttribute("aria-expanded", estaExpandido ? "false" : "true");

  });
}

function ativarEventosFiltro() {
  botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => aplicarFiltro(botao.dataset.filtro));
  });
}

function ativarScrollSuave() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (evento) => {
      const idDestino = link.getAttribute("href");
      const destino = document.querySelector(idDestino);
      if (!destino) return;
      evento.preventDefault();
      destino.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.innerWidth <= 760) listaMenu.classList.add("menu-fechado");
    });
  });
}

function controlarBotaoTopo() {
  window.addEventListener("scroll", () => {
    botaoTopo.classList.toggle("oculto", window.scrollY < 320);
  });

  botaoTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function configurarMenuMobile() {
  if (window.innerWidth <= 760) listaMenu.classList.add("menu-fechado");

  botaoMenuMobile.addEventListener("click", () => {
    const aberto = !listaMenu.classList.contains("menu-fechado");
    listaMenu.classList.toggle("menu-fechado");
    botaoMenuMobile.setAttribute("aria-expanded", aberto ? "false" : "true");
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      listaMenu.classList.remove("menu-fechado");
      botaoMenuMobile.setAttribute("aria-expanded", "false");
    } else if (botaoMenuMobile.getAttribute("aria-expanded") === "false") {
      listaMenu.classList.add("menu-fechado");
    }
  });
}

function atualizarSlides(indice) {
  slidesBanner.forEach((slide, posicao) => {
    slide.classList.toggle("ativo", posicao === indice);
  });

  document.querySelectorAll(".indicador-slide").forEach((indicador, posicao) => {
    indicador.classList.toggle("ativo", posicao === indice);
  });
}

function mudarSlide(direcao) {
  indiceSlideAtual += direcao;
  if (indiceSlideAtual < 0) indiceSlideAtual = slidesBanner.length - 1;
  if (indiceSlideAtual >= slidesBanner.length) indiceSlideAtual = 0;
  atualizarSlides(indiceSlideAtual);
}

function iniciarCarrosselAutomatico() {
  if (!slidesBanner.length) return;
  clearInterval(intervaloCarrossel);
  intervaloCarrossel = setInterval(() => {
    mudarSlide(1);
  }, intervaloCarrosselMs);
}

function configurarCarrossel() {
  if (!slidesBanner.length || !indicadoresSlide) return;

  indicadoresSlide.innerHTML = "";
  slidesBanner.forEach((_, indice) => {
    const indicador = document.createElement("button");
    indicador.className = `indicador-slide ${indice === 0 ? "ativo" : ""}`;
    indicador.setAttribute("aria-label", `Ir para slide ${indice + 1}`);
    indicador.addEventListener("click", () => {
      indiceSlideAtual = indice;
      atualizarSlides(indiceSlideAtual);
      iniciarCarrosselAutomatico();
    });
    indicadoresSlide.appendChild(indicador);
  });

  if (botaoSlideAnterior) {
    botaoSlideAnterior.addEventListener("click", () => {
      mudarSlide(-1);
      iniciarCarrosselAutomatico();
    });
  }

  if (botaoSlideProximo) {
    botaoSlideProximo.addEventListener("click", () => {
      mudarSlide(1);
      iniciarCarrosselAutomatico();
    });
  }

  atualizarSlides(indiceSlideAtual);
  iniciarCarrosselAutomatico();
}

function configurarAnimacaoSecoes() {
  const elementosAnimados = document.querySelectorAll(".animar-entrada-esquerda, .animar-entrada-direita");
  if (!elementosAnimados.length) return;

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add("animar-visivel");
        observador.unobserve(entrada.target);
      });
    },
    { threshold: 0.2 }
  );

  elementosAnimados.forEach((elemento) => observador.observe(elemento));
}

function configurarGaleriaCompromisso() {
  const imagemPrincipal = document.getElementById("imagem-principal-compromisso");
  const miniaturas = document.querySelectorAll(".miniatura-compromisso");
  if (!imagemPrincipal || !miniaturas.length) return;

  let indiceAtual = 0;
  let intervaloGaleria = null;
  const intervaloGaleriaMs = 4000;

  const atualizarImagemPorIndice = (indice) => {
    const miniatura = miniaturas[indice];
    if (!miniatura) return;
    const novaImagem = miniatura.dataset.imagemGrande;
    const novoAlt = miniatura.dataset.altGrande;
    if (!novaImagem) return;

    imagemPrincipal.src = novaImagem;
    if (novoAlt) imagemPrincipal.alt = novoAlt;

    miniaturas.forEach((item) => item.classList.remove("ativa"));
    miniatura.classList.add("ativa");
    indiceAtual = indice;
  };

  const iniciarRotacaoAutomatica = () => {
    clearInterval(intervaloGaleria);
    intervaloGaleria = setInterval(() => {
      const proximoIndice = (indiceAtual + 1) % miniaturas.length;
      atualizarImagemPorIndice(proximoIndice);
    }, intervaloGaleriaMs);
  };

  miniaturas.forEach((miniatura) => {
    miniatura.addEventListener("click", () => {
      const indiceSelecionado = Array.from(miniaturas).indexOf(miniatura);
      atualizarImagemPorIndice(indiceSelecionado);
      iniciarRotacaoAutomatica();
    });

    miniatura.addEventListener("mouseenter", () => clearInterval(intervaloGaleria));
    miniatura.addEventListener("mouseleave", () => iniciarRotacaoAutomatica());
  });

  imagemPrincipal.addEventListener("mouseenter", () => clearInterval(intervaloGaleria));
  imagemPrincipal.addEventListener("mouseleave", () => iniciarRotacaoAutomatica());

  const miniaturaInicial = document.querySelector(".miniatura-compromisso.ativa");
  if (miniaturaInicial) {
    const indiceInicial = Array.from(miniaturas).indexOf(miniaturaInicial);
    atualizarImagemPorIndice(indiceInicial >= 0 ? indiceInicial : 0);
  } else {
    atualizarImagemPorIndice(0);
  }
  iniciarRotacaoAutomatica();
}

renderizarPainelOds();
renderizarConteudoDinamico();
aplicarFiltro(filtroAtual);
ativarEventosSaibaMais();
ativarEventosFiltro();
ativarScrollSuave();
controlarBotaoTopo();
configurarMenuMobile();
configurarCarrossel();
configurarAnimacaoSecoes();
configurarGaleriaCompromisso();
