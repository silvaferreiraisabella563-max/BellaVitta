/* BELLA VITTA — catálogo, destaques, filtros e carrinho compartilhado */
const WHATSAPP = "+55(64)99945-2262"; // Troque pelo número da loja: 55 + DDD + número.

const produtos = [
  {id:1,nome:"Alface",preco:4.00,estoque:30,categoria:"verduras",imagem:"IMAGENS/ALFACE.webp",destaque:true},
  {id:2,nome:"Acelga",preco:4.50,estoque:18,categoria:"verduras",imagem:"IMAGENS/ACELGA.jpg"},
  {id:4,nome:"Rúcula",preco:4.50,estoque:20,categoria:"verduras",imagem:"IMAGENS/beneficios-da-rucula.jpg"},
  {id:5,nome:"Espinafre",preco:4.00,estoque:18,categoria:"verduras",imagem:"IMAGENS/Design-espinafree-2023-05-25T172031.295.png"},
  {id:6,nome:"Repolho",preco:5.00,estoque:16,categoria:"verduras",imagem:"IMAGENS/GettyImages-1408874683-1024x683.jpg"},
  {id:7,nome:"Brócolis",preco:7.00,estoque:12,categoria:"verduras",imagem:"IMAGENS/ativo_brocolis-690x515.jpg"},
  {id:8,nome:"Tomate",preco:7.90,estoque:35,categoria:"legumes",imagem:"IMAGENS/Tudo-sobre-tomate-–-Fatos-interessantes-sobre-o-tomate.jpg",destaque:true,oferta:true,precoOferta:6.90},
  {id:9,nome:"Cenoura",preco:5.50,estoque:28,categoria:"legumes",imagem:"IMAGENS/CENOURA.jpg"},
  {id:10,nome:"Pepino",preco:5.00,estoque:18,categoria:"legumes",imagem:"IMAGENS/PEPINO.webp"},
  {id:11,nome:"Beterraba",preco:5.50,estoque:20,categoria:"legumes",imagem:"IMAGENS/BETERRABA.jpg"},
  {id:12,nome:"Abobrinha",preco:6.00,estoque:15,categoria:"legumes",imagem:"IMAGENS/ABOBRINHA.webp"},
  {id:13,nome:"Pimentão",preco:8.00,estoque:14,categoria:"legumes",imagem:"IMAGENS/pimentoes-1.jpg"},
  {id:14,nome:"Batata",preco:5.00,estoque:40,categoria:"legumes",imagem:"IMAGENS/BATATA.png"},
  {id:15,nome:"Cebola",preco:4.50,estoque:32,categoria:"legumes",imagem:"IMAGENS/CEBOLA.webp"},
  {id:16,nome:"Couve-flor",preco:8.00,estoque:15,categoria:"verduras",imagem:"IMAGENS/COUVE-FLOR.jpg"},
  {id:17,nome:"Morango",preco:9.90,estoque:10,categoria:"frutas",imagem:"IMAGENS/MORANGO.jpg",destaque:true,oferta:true,precoOferta:8.90},
  {id:18,nome:"Limão",preco:4.90,estoque:30,categoria:"frutas",imagem:"IMAGENS/limao-arvore_1740068616345.webp"},
  {id:19,nome:"Maçã",preco:8.90,estoque:22,categoria:"frutas",imagem:"IMAGENS/MAÇA.jpeg"},
  {id:20,nome:"Banana",preco:5.90,estoque:36,categoria:"frutas",imagem:"IMAGENS/BANANA.jpeg"},
  {id:21,nome:"Acerola",preco:7.00,estoque:15,categoria:"frutas",imagem:"IMAGENS/acerola_2026-01-09_18-00-08.webp"},
  {id:22,nome:"Cheiro-verde",preco:3.00,estoque:24,categoria:"temperos",imagem:"IMAGENS/como-plantar-cheiro-verde-topo.jpg",destaque:true},
  {id:23,nome:"Manjericão",preco:4.50,estoque:12,categoria:"temperos",imagem:"IMAGENS/MANJERICCAO.webp"},
  {id:24,nome:"Alho",preco:3.00,estoque:40,categoria:"temperos",imagem:"IMAGENS/ALHO.webp"},
  {id:25,nome:"Pimenta",preco:4.00,estoque:15,categoria:"temperos",imagem:"IMAGENS/PIMENTA.jpg"},
  {id:26,nome:"Cebolinha",preco:3.50,estoque:25,categoria:"temperos",imagem:"IMAGENS/CEBOLINHA.jpeg"}
];

const CHAVE_CARRINHO = "bellaVittaCarrinho";
const formatarDinheiro = valor => valor.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const porId = id => document.getElementById(id);
let carrinho = carregarCarrinho();

function carregarCarrinho(){
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_CARRINHO) || "[]");
    if (!Array.isArray(salvo)) return [];
    return salvo.filter(item => produtos.some(p => p.id === Number(item.id)) && Number(item.quantidade) > 0)
      .map(item => ({id:Number(item.id),quantidade:Math.floor(Number(item.quantidade))}));
  } catch { return []; }
}
function salvarCarrinho(){ localStorage.setItem(CHAVE_CARRINHO,JSON.stringify(carrinho)); }
function obterQuantidade(id){ return carrinho.find(item=>item.id===id)?.quantidade || 0; }

function criarCard(produto, modoOferta=false){
  const precoFinal = modoOferta && produto.precoOferta ? produto.precoOferta : produto.preco;
  const selo = modoOferta ? '<span class="selo-oferta">Oferta</span>' : (produto.destaque ? '<span class="selo-destaque">Destaque</span>' : '');
  const precoAntigo = modoOferta && produto.precoOferta ? `<span class="produto-preco-antigo">${formatarDinheiro(produto.preco)}</span>` : "";
  const imagem = produto.imagem || "";
  return `<article class="produto-card">
    <div class="produto-imagem"><img src="${imagem}" alt="${produto.nome}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80';">${selo}</div>
    <div class="produto-info"><span class="produto-categoria">${produto.categoria}</span><h3>${produto.nome}</h3>
    <p class="produto-preco">${formatarDinheiro(precoFinal)} ${precoAntigo}</p>
    <p class="produto-estoque">${produto.estoque} unidades disponíveis</p>
    <button class="botao-adicionar" type="button" data-adicionar="${produto.id}">Adicionar ao carrinho</button></div>
  </article>`;
}
function renderizarGrade(id, lista, modoOferta=false){
  const grade=porId(id); if(!grade) return;
  grade.innerHTML=lista.length ? lista.map(p=>criarCard(p,modoOferta)).join("") : '<p class="empty-state">Não encontramos produtos nessa seleção.</p>';
}
function renderizarCatalogo(){
  const busca=(porId("campoBusca")?.value || "").trim().toLocaleLowerCase("pt-BR");
  const categoria=porId("filtroCategoria")?.value || "todos";
  const ordem=porId("ordenarProdutos")?.value || "nome";
  let lista=produtos.filter(p=>p.nome.toLocaleLowerCase("pt-BR").includes(busca) && (categoria==="todos" || p.categoria===categoria));
  if(ordem==="menor-preco") lista.sort((a,b)=>a.preco-b.preco);
  else if(ordem==="maior-preco") lista.sort((a,b)=>b.preco-a.preco);
  else lista.sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR"));
  renderizarGrade("gradeProdutos",lista);
  const contador=porId("contadorProdutos"); if(contador) contador.textContent=`${lista.length} produto(s) encontrado(s)`;
}
function renderizarDestaques(){ renderizarGrade("gradeDestaques",produtos.filter(p=>p.destaque)); }
function renderizarOfertas(){ renderizarGrade("gradeOfertas",produtos.filter(p=>p.oferta),true); }

function adicionarAoCarrinho(id){
  const p=produtos.find(item=>item.id===Number(id)); if(!p) return;
  if(obterQuantidade(p.id)>=p.estoque){ avisar("Você já adicionou todas as unidades disponíveis."); return; }
  const item=carrinho.find(i=>i.id===p.id);
  if(item) item.quantidade++; else carrinho.push({id:p.id,quantidade:1});
  salvarCarrinho(); renderizarCarrinho(); avisar(`${p.nome} adicionado ao carrinho.`);
}
function mudarQuantidade(id,delta){
  const item=carrinho.find(i=>i.id===Number(id)); const p=produtos.find(p=>p.id===Number(id));
  if(!item||!p) return;
  const nova=item.quantidade+delta;
  if(nova<=0) carrinho=carrinho.filter(i=>i.id!==Number(id));
  else if(nova<=p.estoque) item.quantidade=nova;
  else avisar("Não há mais unidades disponíveis.");
  salvarCarrinho(); renderizarCarrinho();
}
function removerDoCarrinho(id){ carrinho=carrinho.filter(i=>i.id!==Number(id)); salvarCarrinho(); renderizarCarrinho(); }
function renderizarCarrinho(){
  const itens=porId("itensCarrinho");
  const quantidade=carrinho.reduce((s,i)=>s+i.quantidade,0);
  const total=carrinho.reduce((s,i)=>{const p=produtos.find(p=>p.id===i.id);return s+(p?p.preco*i.quantidade:0)},0);
  if(porId("contadorCarrinho")) porId("contadorCarrinho").textContent=quantidade;
  if(porId("totalCarrinho")) porId("totalCarrinho").textContent=formatarDinheiro(total);
  if(!itens) return;
  if(!carrinho.length){itens.innerHTML='<p class="carrinho-vazio">Seu carrinho está vazio. Escolha alguns produtos fresquinhos!</p>';return;}
  itens.innerHTML=carrinho.map(i=>{
    const p=produtos.find(p=>p.id===i.id); if(!p) return "";
    return `<div class="item-carrinho"><div class="item-carrinho-info"><strong>${p.nome}</strong><span>${formatarDinheiro(p.preco)} cada</span><span>Subtotal: ${formatarDinheiro(p.preco*i.quantidade)}</span></div><div class="quantidade-carrinho"><button type="button" data-menos="${p.id}" aria-label="Diminuir ${p.nome}">−</button><span>${i.quantidade}</span><button type="button" data-mais="${p.id}" aria-label="Aumentar ${p.nome}">+</button></div><button class="remover-item" type="button" data-remover="${p.id}">Remover</button></div>`;
  }).join("");
}
function abrirCarrinho(){
  porId("painelCarrinho")?.classList.add("aberto"); porId("fundoCarrinho")?.classList.add("visivel");
  porId("painelCarrinho")?.setAttribute("aria-hidden","false"); document.body.classList.add("carrinho-aberto");
}
function fecharCarrinho(){
  porId("painelCarrinho")?.classList.remove("aberto"); porId("fundoCarrinho")?.classList.remove("visivel");
  porId("painelCarrinho")?.setAttribute("aria-hidden","true"); document.body.classList.remove("carrinho-aberto");
}
function avisar(texto){
  const toast=porId("toast"); if(!toast){console.info(texto);return;}
  toast.textContent=texto;toast.classList.add("visivel");clearTimeout(avisar.timer);
  avisar.timer=setTimeout(()=>toast.classList.remove("visivel"),2800);
}
function numeroWhatsAppValido(){return WHATSAPP.replace(/\D/g,"").length>=12 && WHATSAPP!=="5500000000000";}
function abrirWhatsApp(mensagem="Olá! Gostaria de saber mais sobre os produtos da Bella Vitta."){
  if(!numeroWhatsAppValido()){avisar("Configure o número do WhatsApp no início do script.js.");return;}
  window.open(`https://wa.me/${WHATSAPP.replace(/\D/g,"")}?text=${encodeURIComponent(mensagem)}`,"_blank","noopener,noreferrer");
}
function finalizarPedido(){
  if(!carrinho.length){avisar("Seu carrinho está vazio.");return;}
  const linhas=carrinho.map(i=>{const p=produtos.find(p=>p.id===i.id);return `• ${p.nome} x${i.quantidade} — ${formatarDinheiro(p.preco*i.quantidade)}`;});
  const total=carrinho.reduce((s,i)=>s+produtos.find(p=>p.id===i.id).preco*i.quantidade,0);
  abrirWhatsApp(`Olá! Quero fazer um pedido na Bella Vitta:\n\n${linhas.join("\n")}\n\nTotal estimado: ${formatarDinheiro(total)}\n\nPoderiam confirmar a disponibilidade e a entrega?`);
}
function configurar(){
  porId("anoAtual") && (porId("anoAtual").textContent=new Date().getFullYear());
  porId("campoBusca")?.addEventListener("input",renderizarCatalogo);
  porId("filtroCategoria")?.addEventListener("change",renderizarCatalogo);
  porId("ordenarProdutos")?.addEventListener("change",renderizarCatalogo);
  porId("abrirCarrinho")?.addEventListener("click",abrirCarrinho);
  porId("fecharCarrinho")?.addEventListener("click",fecharCarrinho);
  porId("fundoCarrinho")?.addEventListener("click",fecharCarrinho);
  porId("continuarComprando")?.addEventListener("click",fecharCarrinho);
  porId("finalizarPedido")?.addEventListener("click",finalizarPedido);
  porId("whatsappOfertas")?.addEventListener("click",()=>abrirWhatsApp("Olá! Gostaria de saber quais são as ofertas da Bella Vitta."));
  porId("menuMobile")?.addEventListener("click",()=>{
    const nav=porId("navegacao"); if(!nav)return;
    const aberto=nav.classList.toggle("aberto"); porId("menuMobile").setAttribute("aria-expanded",String(aberto));
  });
  document.addEventListener("click",e=>{
    const adicionar=e.target.closest("[data-adicionar]");
    const mais=e.target.closest("[data-mais]");
    const menos=e.target.closest("[data-menos]");
    const remover=e.target.closest("[data-remover]");
    if(adicionar) adicionarAoCarrinho(adicionar.dataset.adicionar);
    if(mais) mudarQuantidade(mais.dataset.mais,1);
    if(menos) mudarQuantidade(menos.dataset.menos,-1);
    if(remover) removerDoCarrinho(remover.dataset.remover);
  });
  document.addEventListener("keydown",e=>{if(e.key==="Escape")fecharCarrinho();});
  // Categoria vinda dos atalhos da página inicial: produtos.html?categoria=frutas
  const parametro=new URLSearchParams(window.location.search).get("categoria");
  if(parametro && porId("filtroCategoria")) porId("filtroCategoria").value=parametro;
  renderizarCatalogo();renderizarDestaques();renderizarOfertas();renderizarCarrinho();
}
document.addEventListener("DOMContentLoaded",configurar);
