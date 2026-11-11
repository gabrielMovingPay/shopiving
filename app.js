const PRODUCT = {
  slug: "console-playstation-5-pro-sony-ssd-2tb-com-controle-sem-fio-dualsense-branco-1000046552",
  id: "PRD4691722",
  sku: "SKU5863657",
  name: "Console PlayStation 5 Pro Sony, SSD 2TB, Com Controle Sem Fio DualSense, Branco - 1000046552",
  seller: "KABUM",
  photos: ["img/foto-1.jpg", "img/foto-2.jpg", "img/foto-3.jpg", "img/foto-4.jpg"],
  pointsClub: 308292,
  pointsSale: 321696,
  pointsList: 347783,
  cashSale: 1800,
  cashList: 1800,
  off: 7,
  accrual: 1800,
  parity: 1
};

const SIMILAR = [
  ["Console PlayStation 5 Edição Digital Sony Slim, SSD 825GB, Controle DualSense, Branco", "KABUM", "https://catalog.livelo.com.br/KBM%2FPRD5228194%2FSKU6620766%2FMEDIUM%2F1564247267%2FConsole-PlayStation-5-Edio-Digital-Sony-Slim-SSD-825GB-Controle-DualSense-Astros-Playroom-Branco--CFI-2114B.jpg", 195792, 204304, 4699, 4699],
  ["Console Sony PlayStation 5, Com Leitor de Discos, SSD 1TB, Controle DualSense + 2 Jogos", "KABUM", "https://catalog.livelo.com.br/KBM%2FPRD4691118%2FSKU5862401%2FMEDIUM%2F740619072%2FConsole-Sony-PlayStation-5-Com-Leitor-de-Discos-SSD-1TB-Controle-Sem-Fio-DualSense--2-Jogos.jpg", 229125, 239087, 5499, 5499],
  ["Controle Sem Fio Sony DualSense, PlayStation 5, Bluetooth, Branco - 3005767", "KABUM", "https://catalog.livelo.com.br/KBM%2FPRD5248027%2FSKU6645798%2FMEDIUM%2F1588449479%2FControle-Sem-Fio-Sony-DualSense-PlayStation-5-Bluetooth-Branco--3005767.jpg", 18369, 19168, 440.86, 441],
  ["Controle Sem Fio Sony DualSense, PlayStation 5, Bluetooth, Midnight Black", "KABUM", "https://catalog.livelo.com.br/KBM%2FPRD5248035%2FSKU6645806%2FMEDIUM%2F1588449526%2FControle-Sem-Fio-Sony-DualSense-PlayStation-5-Bluetooth-Midnight-Black--CFIZCT2W.jpg", 17875, 18652, 429, 429],
  ["Jogo Sony Gran Turismo 7 Playstation 5", "FAST SHOP", "https://catalog.livelo.com.br/WBC%2FPRD5520558%2FSKU7055580%2FMEDIUM%2F1677356238%2FJogo-Sony-Gran-Turismo-7-Playstation-5-4K-e-HDR-a-60-FPS-SSD-Dualsense-Branco.jpg", 42933, 44800, 1030.4, 1030],
  ["Controle Sem Fio Sony DualSense, PlayStation 5, Bluetooth, Starlight Blue", "KABUM", "https://catalog.livelo.com.br/KBM%2FPRD5075367%2FSKU6432393%2FMEDIUM%2F1387020553%2FControle-Sem-Fio-Sony-DualSense-PlayStation-5-Bluetooth-Starlight-Blue--CFIZCT2W.jpg", 20792, 21696, 499, 499],
  ["Controle Sem Fio Sony DualSense, PlayStation 5, Bluetooth, Galactic Purple", "KABUM", "https://catalog.livelo.com.br/KBM%2FPRD5248026%2FSKU6645797%2FMEDIUM%2F1588449475%2FControle-Sem-Fio-Sony-DualSense-PlayStation-5-Bluetooth-Galactic-Purple--CFIZCT1W.jpg", 18708, 19522, 449, 449],
  ["PlayStation 5 Edição Digital 825GB 1 Controle Branco Sony", "MAGAZINE LUIZA", "https://catalog.livelo.com.br/MZL%2FPRD4497945%2FSKU5605734%2FMEDIUM%2F1360704493%2FPlayStation-5-Edio-Digital-825GB-1-Controle-Branco-Sony.jpeg", 197325, 205904, 4735.79, 4736]
];

const state = {
  mode: "cash",
  qty: 1,
  photo: 0,
  cart: []
};

const $ = (id) => document.getElementById(id);

function pts(value) {
  return Math.round(value).toLocaleString("pt-BR") + " pontos";
}

function brl(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2400);
}

function routeParts() {
  const parts = location.pathname.split("/").filter(Boolean);
  const start = parts.indexOf("ps5-pro");
  if (start === -1) return null;
  return parts.slice(start);
}

function canonUrl() {
  const base = document.querySelector("base");
  const root = base ? base.href : location.origin + "/";
  return new URL(
    "ps5-pro/" + PRODUCT.slug + "/produto/" + PRODUCT.id + "?skuId=" + PRODUCT.sku,
    root
  ).href;
}

function pathOk() {
  const parts = routeParts();
  const sku = new URLSearchParams(location.search).get("skuId");
  if (!parts || parts.length < 4) return false;
  const slug = parts[1];
  const id = parts[3];
  if (slug !== PRODUCT.slug || id !== PRODUCT.id) return false;
  if (sku && sku !== PRODUCT.sku) return false;
  return true;
}

function renderPrices() {
  const q = state.qty;
  $("club-points").innerHTML = Math.round(PRODUCT.pointsClub * q).toLocaleString("pt-BR") + " <span>pontos</span>";
  $("list-points").textContent = pts(PRODUCT.pointsList * q);
  $("sale-points").textContent = pts(PRODUCT.pointsSale * q);
  $("cash-sale").textContent = brl(PRODUCT.cashSale * q);
  const cashOff = PRODUCT.cashList > PRODUCT.cashSale;
  $("cash-list").textContent = brl(PRODUCT.cashList * q);
  $("cash-list").classList.toggle("hidden", !cashOff);
  $("cash-off").classList.toggle("hidden", !cashOff);
  if (cashOff) {
    const percent = Math.round((1 - PRODUCT.cashSale / PRODUCT.cashList) * 100);
    $("cash-off").textContent = percent + "% OFF";
  }
  const installment = (PRODUCT.cashSale * q) / 10;
  $("installment").textContent = "Em até 10x de " + brl(installment) + " sem juros";
  const gained = Math.round(PRODUCT.accrual * q).toLocaleString("pt-BR");
  const line = "Você ganha " + gained + " (" + PRODUCT.parity + " por real)";
  $("accrual-club").textContent = line;
  $("accrual-default").textContent = line;
  $("qty").textContent = String(q);
}

function setMode(mode) {
  state.mode = mode;
  const points = mode === "points";
  $("mode-points").classList.toggle("active", points);
  $("mode-cash").classList.toggle("active", !points);
  $("mode-points").setAttribute("aria-checked", points ? "true" : "false");
  $("mode-cash").setAttribute("aria-checked", points ? "false" : "true");
  $("price-points").classList.toggle("hidden", !points);
  $("price-cash").classList.toggle("hidden", points);
}

function renderThumbs() {
  const box = $("thumbs");
  box.innerHTML = "";
  PRODUCT.photos.forEach((src, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = index === state.photo ? "active" : "";
    button.innerHTML = '<img alt="" src="' + src + '">';
    button.addEventListener("click", () => {
      state.photo = index;
      $("main-photo").src = src;
      renderThumbs();
    });
    box.appendChild(button);
  });
}

function renderSimilar() {
  const track = $("similar");
  track.innerHTML = SIMILAR.map((item) => {
    const [name, seller, image, club, regular, cash, gain] = item;
    return (
      '<article class="card">' +
      '<img alt="" src="' + image + '">' +
      "<h3>" + name + "</h3>" +
      '<p class="who">Vendido e entregue por ' + seller + "</p>" +
      '<p class="label">Usar pontos</p>' +
      '<div class="price-row"><span class="pts">' + Math.round(club).toLocaleString("pt-BR") + " pontos</span> <span class=\"club-tag\">Clube</span></div>" +
      '<p class="or-price">ou ' + Math.round(regular).toLocaleString("pt-BR") + " pontos</p>" +
      '<p class="label">Ganhar pontos</p>' +
      '<p class="cash">' + brl(cash) + "</p>" +
      "<p>" + Math.round(gain).toLocaleString("pt-BR") + " pontos</p>" +
      "</article>"
    );
  }).join("");
}

function openPair(backId, panelId, open) {
  $(backId).classList.toggle("open", open);
  $(panelId).classList.toggle("open", open);
}

function renderCart() {
  const count = state.cart.reduce((sum, line) => sum + line.qty, 0);
  const badge = $("cart-count");
  badge.textContent = String(count);
  badge.classList.toggle("show", count > 0);
  const body = $("cart-body");
  if (!state.cart.length) {
    body.innerHTML = '<p class="empty-cart">Seu carrinho está vazio.</p>';
    $("cart-total").textContent = state.mode === "points" ? "0 pontos" : brl(0);
    return;
  }
  body.innerHTML = state.cart.map((line, index) => {
    const value = line.mode === "points" ? pts(PRODUCT.pointsClub * line.qty) : brl(PRODUCT.cashSale * line.qty);
    const how = line.mode === "points" ? "Usar pontos" : "Ganhar pontos";
    return (
      '<div class="line"><img alt="" src="img/foto-1.jpg"><div><strong>' + PRODUCT.name +
      "</strong><p>" + how + " · " + line.qty + " un.</p><p>" + value +
      '</p><button class="pay-link" type="button" data-remove="' + index + '">Remover</button></div></div>'
    );
  }).join("");
  body.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      state.cart.splice(Number(button.dataset.remove), 1);
      renderCart();
    });
  });
  const pointsTotal = state.cart.filter((line) => line.mode === "points").reduce((sum, line) => sum + PRODUCT.pointsClub * line.qty, 0);
  const cashTotal = state.cart.filter((line) => line.mode === "cash").reduce((sum, line) => sum + PRODUCT.cashSale * line.qty, 0);
  const parts = [];
  if (pointsTotal) parts.push(pts(pointsTotal));
  if (cashTotal) parts.push(brl(cashTotal));
  $("cart-total").textContent = parts.join(" + ") || "0 pontos";
}

function addToCart(open) {
  state.cart.push({ qty: state.qty, mode: state.mode });
  renderCart();
  toast(state.mode === "points" ? "Produto adicionado para usar pontos." : "Produto adicionado para ganhar pontos.");
  if (open) openPair("cart-back", "cart", true);
}

function maskCep(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length > 5) return digits.slice(0, 5) + "-" + digits.slice(5);
  return digits;
}

function calcShip() {
  const digits = $("cep").value.replace(/\D/g, "");
  const box = $("ship-result");
  if (digits.length !== 8) {
    box.innerHTML = '<p class="error">CEP inválido</p>';
    return;
  }
  if (digits === "00000000") {
    box.innerHTML = '<p class="error">CEP não encontrado</p>';
    return;
  }
  const shown = digits.slice(0, 5) + "-" + digits.slice(5);
  box.innerHTML =
    '<p><b>Enviar para:</b> ' + shown + ' <button class="linkish" type="button" id="change-cep">Alterar CEP</button></p>' +
    '<article class="ship-card"><b>Normal</b><span>Receba até 20/11/2026</span><div>Frete Grátis</div></article>' +
    '<article class="ship-card"><b>Rápida</b><span>Receba até 14/11/2026</span><div>2.490 pontos ou ' + brl(57.9) + "</div></article>" +
    '<p class="fine">Outras opções de frete estarão disponíveis na próxima etapa. Os prazos podem variar conforme os itens do pedido, a opção de frete escolhida e a confirmação do pagamento.</p>';
  $("change-cep").addEventListener("click", () => {
    $("cep").focus();
    $("cep").select();
  });
}

function openModal(title, html) {
  $("modal-title").textContent = title;
  $("modal-body").innerHTML = html;
  $("modal-back").classList.add("open");
  $("modal").classList.add("open");
}

function closeModal() {
  $("modal-back").classList.remove("open");
  $("modal").classList.remove("open");
}

function openPayments() {
  openModal("Formas de pagamento",
    '<article class="pay-item"><h3>Cartão de Crédito</h3><p>Pague com o cartão de crédito e ganhe pontos na compra de qualquer produto. Ainda parcele suas compras em até 10x.</p><p>Cartões aceitos: Visa, MasterCard, Elo, Amex, Diners e Hipercard.</p></article>' +
    '<article class="pay-item"><h3>Pix</h3><p>Após finalizar sua compra, o código Pix ficará disponível durante 30 minutos para você pagar no Banco da sua escolha. A aprovação do pagamento é imediata.</p></article>' +
    '<article class="pay-item"><h3>Pontos</h3><p>Você pode pagar toda a compra, inclusive o frete, só com seus pontos Shopiving, mas não vai ganhar novos pontos.</p><p><span class="club-tag">com Clube Shopiving</span> <span class="badge">7% OFF</span></p></article>' +
    '<article class="pay-item"><h3>Pontos + Dinheiro</h3><p>Se você não tiver pontos o bastante é possível combinar seu saldo com um valor em reais, mas sem pontuar.</p></article>'
  );
}

function openClub() {
  openModal("Clube Shopiving",
    '<p>Benefícios do plano</p>' +
    '<article class="benefit"><h3>Pontos que não expiram</h3><p>Todos os pontos que você já tem ou ganhar não vão expirar enquanto você for assinante.</p></article>' +
    '<article class="benefit"><h3>Pontos com 40% OFF</h3><p>Em toda compra de pontos para você.</p></article>' +
    '<article class="benefit"><h3>Cupom de até 20% OFF</h3><p>Por aniversário de assinatura para usar em voos, hotéis, pacotes ou aluguel de carros.</p></article>' +
    '<article class="benefit"><h3>Ofertas de bônus para transferir</h3><p>e mais de 10 outros parceiros de viagem.</p></article>'
  );
}

function openLogin() {
  openModal("Fazer login",
    "<p>O login da Shopiving não faz parte desta página local. Dá para ver o produto, calcular o frete e montar o carrinho por aqui.</p>"
  );
}

function bind() {
  $("mode-points").addEventListener("click", () => setMode("points"));
  $("mode-cash").addEventListener("click", () => setMode("cash"));
  $("qty-minus").addEventListener("click", () => {
    state.qty = Math.max(1, state.qty - 1);
    renderPrices();
  });
  $("qty-plus").addEventListener("click", () => {
    state.qty = Math.min(5, state.qty + 1);
    renderPrices();
  });
  $("add-cart").addEventListener("click", () => addToCart(false));
  $("buy-now").addEventListener("click", () => addToCart(true));
  $("open-cart").addEventListener("click", () => openPair("cart-back", "cart", true));
  $("close-cart").addEventListener("click", () => openPair("cart-back", "cart", false));
  $("cart-back").addEventListener("click", () => openPair("cart-back", "cart", false));
  $("open-menu").addEventListener("click", () => openPair("menu-back", "menu", true));
  $("close-menu").addEventListener("click", () => openPair("menu-back", "menu", false));
  $("menu-back").addEventListener("click", () => openPair("menu-back", "menu", false));
  $("menu-login").addEventListener("click", () => { openPair("menu-back", "menu", false); openLogin(); });
  $("menu-account").addEventListener("click", () => { openPair("menu-back", "menu", false); openLogin(); });
  $("open-login").addEventListener("click", openLogin);
  $("open-pay").addEventListener("click", openPayments);
  $("open-club").addEventListener("click", openClub);
  $("rate-products").addEventListener("click", openLogin);
  $("close-modal").addEventListener("click", closeModal);
  $("modal-back").addEventListener("click", closeModal);
  $("checkout").addEventListener("click", () => {
    if (!state.cart.length) {
      toast("Adicione o produto ao carrinho.");
      return;
    }
    openPair("cart-back", "cart", false);
    toast("Pedido montado nesta página. Nenhum pagamento foi enviado.");
  });
  $("fav").addEventListener("click", () => {
    const on = $("fav").classList.toggle("on");
    $("fav").textContent = on ? "♥" : "♡";
    toast(on ? "Produto salvo nos favoritos." : "Produto removido dos favoritos.");
  });
  $("more-desc").addEventListener("click", () => {
    const desc = $("desc");
    const open = desc.classList.toggle("collapsed") === false;
    $("more-desc").textContent = open ? "Ver menos" : "Ver mais";
  });
  $("cep").addEventListener("input", () => {
    $("cep").value = maskCep($("cep").value);
  });
  $("calc-cep").addEventListener("click", calcShip);
  $("cep").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      calcShip();
    }
  });
  $("prev-sim").addEventListener("click", () => { $("similar").scrollBy({ left: -250, behavior: "smooth" }); });
  $("next-sim").addEventListener("click", () => { $("similar").scrollBy({ left: 250, behavior: "smooth" }); });
  const input = $("search-input");
  const suggest = $("suggest");
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    if (query.length < 2) {
      suggest.classList.remove("open");
      return;
    }
    const hits = [{ name: PRODUCT.name, image: PRODUCT.photos[0] }].concat(
      SIMILAR.filter((item) => item[0].toLowerCase().includes(query)).map((item) => ({ name: item[0], image: item[2] }))
    ).filter((item, index, list) => list.findIndex((other) => other.name === item.name) === index).slice(0, 4);
    const visible = hits.filter((item) => item.name.toLowerCase().includes(query) || "playstation ps5 console".includes(query) || query.split(" ").some((part) => item.name.toLowerCase().includes(part)));
    if (!visible.length) {
      suggest.innerHTML = "<h3>Nenhum resultado encontrado para " + input.value + "</h3>";
    } else {
      suggest.innerHTML = "<h3>Produtos</h3>" + visible.map((item) =>
        '<button type="button"><img alt="" src="' + item.image + '"><p>' + item.name + "</p></button>"
      ).join("");
      suggest.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
          suggest.classList.remove("open");
          input.value = "";
          location.href = canonUrl();
        });
      });
    }
    suggest.classList.add("open");
  });
  $("search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    input.dispatchEvent(new Event("input"));
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search")) suggest.classList.remove("open");
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
      openPair("cart-back", "cart", false);
      openPair("menu-back", "menu", false);
      suggest.classList.remove("open");
    }
  });
}

function boot() {
  bind();
  const parts = routeParts();
  if (parts && parts.length === 1) {
    location.replace(canonUrl());
    return;
  }
  if (!pathOk()) {
    $("page").classList.add("hidden");
    $("missing").classList.remove("hidden");
    document.title = "Produto Indisponível | Shopiving";
    return;
  }
  $("sku-label").textContent = PRODUCT.sku;
  renderThumbs();
  renderPrices();
  renderSimilar();
  renderCart();
  setMode("cash");
}

boot();
