/*
  Sanchez Brick’s Website Script

  This file contains the client-side logic used throughout the
  demonstration website.  It is intentionally lightweight and uses
  vanilla JavaScript to handle dynamic behaviours such as filtering the
  product catalogue, managing the product comparison interface,
  populating product detail pages, and running the brick calculator.

  Note: In a production environment the data would be fetched from
  a CMS or API.  Here we embed a small sample of products to
  illustrate the interactions described in the specification.
*/

// Sample product catalogue
const products = [
  {
    slug: 'cara-vista-arena-premium',
    name: 'Cara Vista Arena Premium',
    category: 'cara-vista',
    usos: 'Fachadas exteriores e interiores',
    colores: ['Arena', 'Tierra', 'Canela'],
    texturas: ['Liso', 'Semirústico'],
    medidas: { L: 240, A: 115, H: 71 },
    junta: 10,
    rendimiento: 52,
    masa: 2.3,
    absorcion: '≤ 12',
    resistencia: '≥ 22',
    mpa: 22,
    densidad: '—',
    disponibilidad: 'Inmediata',
    peso_por_pieza: 2.3,
    price: 12.5,
    image: 'assets/product-placeholder.png',
    description: 'Ladrillo cara vista de alta calidad con acabado liso o semirústico.'
  },
  {
    slug: 'estructural-clasico',
    name: 'Estructural Clásico',
    category: 'estructural',
    usos: 'Construcción de muros portantes',
    colores: ['Rojo'],
    texturas: ['Rústico'],
    medidas: { L: 200, A: 100, H: 60 },
    junta: 12,
    rendimiento: 60,
    masa: 3.1,
    absorcion: '≤ 14',
    resistencia: '≥ 25',
    mpa: 25,
    densidad: '—',
    disponibilidad: 'Bajo pedido',
    peso_por_pieza: 3.1,
    price: 10.0,
    image: 'assets/product-placeholder.png',
    description: 'Ladrillo estructural robusto para muros resistentes.'
  },
  {
    slug: 'adoquin-rustico',
    name: 'Adoquín Rústico',
    category: 'adoquin',
    usos: 'Pavimentos exteriores, plazas y caminos',
    colores: ['Rojo', 'Gris'],
    texturas: ['Rústico'],
    medidas: { L: 200, A: 100, H: 50 },
    junta: 8,
    rendimiento: 45,
    masa: 2.8,
    absorcion: '≤ 10',
    resistencia: '≥ 18',
    mpa: 18,
    densidad: '—',
    disponibilidad: 'Inmediata',
    peso_por_pieza: 2.8,
    price: 8.5,
    image: 'assets/product-placeholder.png',
    description: 'Adoquín de superficie rústica para caminos de alto tránsito.'
  },
  {
    slug: 'thin-brick-toscano',
    name: 'Thin Brick Toscano',
    category: 'thin-brick',
    usos: 'Revestimientos ligeros en interiores y exteriores',
    colores: ['Terracota', 'Café'],
    texturas: ['Liso'],
    medidas: { L: 240, A: 70, H: 20 },
    junta: 8,
    rendimiento: 55,
    masa: 1.2,
    absorcion: '≤ 15',
    resistencia: '≥ 15',
    mpa: 15,
    densidad: '—',
    disponibilidad: 'Inmediata',
    peso_por_pieza: 1.2,
    price: 9.0,
    image: 'assets/product-placeholder.png',
    description: 'Pieza delgada ideal para revestimientos ligeros y decorativos.'
  },
  {
    slug: 'refractario-alta-temperatura',
    name: 'Refractario Alta Temperatura',
    category: 'refractario',
    usos: 'Hornos, chimeneas y aplicaciones industriales',
    colores: ['Natural'],
    texturas: ['Liso'],
    medidas: { L: 230, A: 114, H: 64 },
    junta: 5,
    rendimiento: 50,
    masa: 3.5,
    absorcion: '≤ 6',
    resistencia: '≥ 30',
    mpa: 30,
    densidad: '—',
    disponibilidad: 'Bajo pedido',
    peso_por_pieza: 3.5,
    price: 15.0,
    image: 'assets/product-placeholder.png',
    description: 'Ladrillo refractario resistente a temperaturas extremas.'
  }
];

// Global state for comparison
const compareList = [];

/**
 * Helper to get URL query parameters as an object
 */
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const obj = {};
  for (const [key, value] of params.entries()) {
    obj[key] = value;
  }
  return obj;
}

/**
 * Render the product list into a container.  Applies the active
 * filters when present.  Called from the productos page on load and
 * whenever filters change.
 */
function renderProductList() {
  const container = document.querySelector('#product-list');
  if (!container) return;
  // Read filters from select elements
  const categoryFilter = document.querySelector('#filter-category')?.value || '';
  const colorFilter = document.querySelector('#filter-color')?.value || '';
  const textFilter = document.querySelector('#filter-texture')?.value || '';
  let filtered = [...products];
  if (categoryFilter) {
    filtered = filtered.filter(p => p.category === categoryFilter);
  }
  if (colorFilter) {
    filtered = filtered.filter(p => p.colores.map(c => c.toLowerCase()).includes(colorFilter.toLowerCase()));
  }
  if (textFilter) {
    filtered = filtered.filter(p => p.texturas.map(t => t.toLowerCase()).includes(textFilter.toLowerCase()));
  }
  // Clear container
  container.innerHTML = '';
  if (!filtered.length) {
    const empty = document.createElement('p');
    empty.textContent = 'No hay productos con esos filtros. Prueba limpiar filtros o contáctanos.';
    container.appendChild(empty);
    return;
  }
  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    // Image
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    card.appendChild(img);
    // Body
    const body = document.createElement('div');
    body.className = 'card-body';
    // Title
    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = product.name;
    body.appendChild(title);
    // Text
    const text = document.createElement('p');
    text.className = 'card-text';
    text.textContent = product.usos;
    body.appendChild(text);
    // Rendimiento
    const rend = document.createElement('p');
    rend.className = 'card-text';
    rend.textContent = `Rendimiento: ${product.rendimiento} pzas/m²`;
    body.appendChild(rend);
    // Colores chips
    const chips = document.createElement('div');
    chips.className = 'chips mt-2';
    product.colores.forEach(color => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = color;
      chips.appendChild(chip);
    });
    body.appendChild(chips);
    // Buttons row
    const btnRow = document.createElement('div');
    btnRow.className = 'mt-4';
    // Ver ficha
    const btnFicha = document.createElement('a');
    btnFicha.href = `producto.html?slug=${product.slug}`;
    btnFicha.className = 'btn btn-light';
    btnFicha.textContent = 'Ver ficha';
    btnRow.appendChild(btnFicha);
    // Comparar
    const btnCompare = document.createElement('button');
    btnCompare.type = 'button';
    btnCompare.className = 'btn btn-secondary ml-2';
    btnCompare.textContent = 'Comparar';
    btnCompare.dataset.slug = product.slug;
    btnCompare.addEventListener('click', () => toggleCompare(product.slug));
    btnRow.appendChild(btnCompare);
    // Cotizar
    const btnQuote = document.createElement('a');
    btnQuote.href = `cotizar.html?producto=${product.slug}`;
    btnQuote.className = 'btn btn-primary ml-2';
    btnQuote.textContent = 'Cotizar';
    btnRow.appendChild(btnQuote);
    body.appendChild(btnRow);
    card.appendChild(body);
    container.appendChild(card);
  });
}

/**
 * Toggle product in comparison list.  Updates the compare bar and
 * ensures at most three items may be compared.  If product is
 * already selected it is removed.
 */
function toggleCompare(slug) {
  const index = compareList.indexOf(slug);
  if (index !== -1) {
    compareList.splice(index, 1);
  } else {
    if (compareList.length >= 3) {
      alert('Puedes comparar hasta 3 productos a la vez.');
      return;
    }
    compareList.push(slug);
  }
  updateCompareBar();
}

/**
 * Render the comparison bar based on the current state.  When there
 * are selected products the bar becomes visible; otherwise it is
 * hidden.  Each selected product is displayed as a small pill.
 */
function updateCompareBar() {
  const bar = document.querySelector('#compare-bar');
  if (!bar) return;
  const itemsContainer = bar.querySelector('.compare-items');
  itemsContainer.innerHTML = '';
  compareList.forEach(slug => {
    const prod = products.find(p => p.slug === slug);
    if (!prod) return;
    const pill = document.createElement('span');
    pill.textContent = prod.name;
    pill.style.padding = '0.25rem 0.5rem';
    pill.style.backgroundColor = 'var(--clay-600)';
    pill.style.color = 'white';
    pill.style.borderRadius = 'var(--radius-sm)';
    itemsContainer.appendChild(pill);
  });
  // Show or hide bar
  if (compareList.length) {
    bar.style.display = 'flex';
  } else {
    bar.style.display = 'none';
  }
}

/**
 * Show the comparison modal with a table comparing the selected
 * products.  Generates a table with specification names in the
 * first column and each selected product in its own column.
 */
function openComparisonModal() {
  const modal = document.querySelector('#compare-modal');
  if (!modal) return;
  const content = modal.querySelector('.modal-content');
  // Clear previous content
  content.innerHTML = '';
  // Build table only if at least two items
  if (compareList.length < 2) {
    const msg = document.createElement('p');
    msg.textContent = 'Seleccione al menos dos productos para comparar.';
    content.appendChild(msg);
  } else {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    // First blank cell
    const firstTh = document.createElement('th');
    firstTh.textContent = '';
    headerRow.appendChild(firstTh);
    // Product names
    compareList.forEach(slug => {
      const prod = products.find(p => p.slug === slug);
      const th = document.createElement('th');
      th.textContent = prod?.name || '';
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    // Define rows of specs
    const specs = [
      { name: 'Medidas (mm)', key: 'medidas' },
      { name: 'Junta (mm)', key: 'junta' },
      { name: 'Rendimiento (pzas/m²)', key: 'rendimiento' },
      { name: 'Peso (kg)', key: 'masa' },
      { name: 'Absorción (%)', key: 'absorcion' },
      { name: 'Resistencia (MPa)', key: 'resistencia' },
      { name: 'Disponibilidad', key: 'disponibilidad' }
    ];
    specs.forEach(spec => {
      const row = document.createElement('tr');
      const th = document.createElement('th');
      th.textContent = spec.name;
      row.appendChild(th);
      compareList.forEach(slug => {
        const prod = products.find(p => p.slug === slug);
        const td = document.createElement('td');
        let value = '';
        if (spec.key === 'medidas' && prod) {
          const { L, A, H } = prod.medidas;
          value = `${L} × ${A} × ${H}`;
        } else if (prod) {
          value = prod[spec.key];
        }
        td.textContent = value;
        row.appendChild(td);
      });
      table.appendChild(row);
    });
    content.appendChild(table);
  }
  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn btn-secondary';
  closeBtn.textContent = 'Cerrar';
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  content.appendChild(closeBtn);
  modal.style.display = 'flex';
}

/**
 * Populate the product detail page using the slug from the query
 * parameter.  If product not found a message is shown.  The page
 * must contain elements with ids matching those referenced here.
 */
function renderProductDetail() {
  const params = getQueryParams();
  const slug = params.slug;
  if (!slug) return;
  const product = products.find(p => p.slug === slug);
  const container = document.querySelector('#product-detail');
  if (!container) return;
  if (!product) {
    container.innerHTML = '<p>Producto no encontrado.</p>';
    return;
  }
  // Title
  const nameEl = container.querySelector('.product-name');
  if (nameEl) nameEl.textContent = product.name;
  // Usos
  const usosEl = container.querySelector('.product-usos');
  if (usosEl) usosEl.textContent = product.usos;
  // Gallery (single image here)
  const galleryEl = container.querySelector('.product-gallery');
  if (galleryEl) {
    galleryEl.innerHTML = '';
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.style.width = '100%';
    img.style.borderRadius = 'var(--radius-sm)';
    galleryEl.appendChild(img);
  }
  // Specs table
  const tableEl = container.querySelector('.spec-table');
  if (tableEl) {
    tableEl.innerHTML = '';
    const rows = [
      ['Medidas (L × A × H, mm)', `${product.medidas.L} × ${product.medidas.A} × ${product.medidas.H}`],
      ['Junta recomendada (mm)', product.junta],
      ['Rendimiento (pzas/m²)', product.rendimiento],
      ['Masa / peso por pieza (kg)', product.masa],
      ['Absorción (%)', product.absorcion],
      ['Resistencia a compresión (MPa)', product.resistencia],
      ['Densidad aparente (kg/m³)', product.densidad],
      ['Acabados / Texturas', product.texturas.join(', ')],
      ['Colores', product.colores.join(', ')],
      ['Disponibilidad', product.disponibilidad]
    ];
    rows.forEach(row => {
      const tr = document.createElement('tr');
      const th = document.createElement('td');
      th.textContent = row[0];
      th.style.fontWeight = '600';
      const td = document.createElement('td');
      td.textContent = row[1];
      tr.appendChild(th);
      tr.appendChild(td);
      tableEl.appendChild(tr);
    });
  }
  // CTA for calculator and quote
  const quoteBtn = container.querySelector('.btn-quote');
  if (quoteBtn) quoteBtn.href = `cotizar.html?producto=${product.slug}`;
  const calcBtn = container.querySelector('.btn-calc');
  if (calcBtn) calcBtn.href = `calculadora.html?slug=${product.slug}`;
}

/**
 * Run the brick calculator based on user input.  Reads values from
 * form fields, performs the calculation described in the project
 * specification and outputs results into designated elements.
 */
function runCalculator() {
  const area = parseFloat(document.querySelector('#calc-area').value) || 0;
  const mermaPct = parseFloat(document.querySelector('#calc-merma').value) || 0;
  const junta = parseFloat(document.querySelector('#calc-junta').value) || 0;
  const precio = parseFloat(document.querySelector('#calc-precio').value) || null;
  const palletCapacidad = parseInt(document.querySelector('#calc-pallet').value) || 400;
  const largo = parseFloat(document.querySelector('#calc-largo').value) || null;
  const alto = parseFloat(document.querySelector('#calc-alto').value) || null;
  const rendimientoInput = parseFloat(document.querySelector('#calc-rendimiento').value) || null;
  const pesoPorPieza = parseFloat(document.querySelector('#calc-peso').value) || null;
  let rendimiento;
  if (!rendimientoInput) {
    if (largo && alto && junta) {
      rendimiento = Math.floor((1000 / (alto + junta)) * (1000 / (largo + junta)));
    } else {
      rendimiento = 0;
    }
  } else {
    rendimiento = rendimientoInput;
  }
  const piezasBrutas = area * rendimiento;
  const piezasTotales = Math.ceil(piezasBrutas * (1 + mermaPct / 100));
  const palletsEstimados = Math.ceil(piezasTotales / palletCapacidad);
  const pesoTotal = pesoPorPieza ? Math.round(piezasTotales * pesoPorPieza * 10) / 10 : null;
  const costoTotal = precio ? Math.round(piezasTotales * precio * 100) / 100 : null;
  // Display results
  document.querySelector('#result-piezas').textContent = isNaN(piezasTotales) ? '-' : piezasTotales;
  document.querySelector('#result-pallets').textContent = isNaN(palletsEstimados) ? '-' : palletsEstimados;
  document.querySelector('#result-peso').textContent = pesoTotal !== null && !isNaN(pesoTotal) ? `${pesoTotal} kg` : '—';
  document.querySelector('#result-costo').textContent = costoTotal !== null && !isNaN(costoTotal) ? `$${costoTotal.toFixed(2)}` : '—';
}

/**
 * On the calculator page, prefill fields based on the slug if
 * available.  For example, set rendimiento and peso_por_pieza from
 * the product data.  Also sets the default pallet capacity.
 */
function prefillCalculator() {
  const params = getQueryParams();
  const slug = params.slug;
  if (!slug) return;
  const product = products.find(p => p.slug === slug);
  if (!product) return;
  // Set rendimiento
  const rendEl = document.querySelector('#calc-rendimiento');
  if (rendEl) rendEl.value = product.rendimiento;
  // Set peso
  const pesoEl = document.querySelector('#calc-peso');
  if (pesoEl) pesoEl.value = product.peso_por_pieza;
  // Hide dimension fields
  const dimL = document.querySelector('#calc-largo');
  const dimA = document.querySelector('#calc-alto');
  if (dimL && dimA) {
    dimL.value = product.medidas.L;
    dimA.value = product.medidas.H;
  }
  // Optionally hide dimension inputs if rendimiento provided
}

/**
 * Initialise event listeners and page-specific logic.  Called on
 * DOMContentLoaded.
 */
function init() {
  // Toggle mobile menu
  const menuToggle = document.querySelector('#menu-toggle');
  const navList = document.querySelector('header .nav ul');
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('show');
    });
  }
  // Product list page
  if (document.querySelector('#product-list')) {
    // Render product list initially
    renderProductList();
    // Attach filter change events
    const filters = document.querySelectorAll('#filter-category, #filter-color, #filter-texture');
    filters.forEach(filter => {
      filter.addEventListener('change', () => {
        renderProductList();
      });
    });
    // Compare modal open button
    const compareBtn = document.querySelector('#compare-bar .btn-compare');
    if (compareBtn) {
      compareBtn.addEventListener('click', openComparisonModal);
    }
  }
  // Product detail page
  if (document.querySelector('#product-detail')) {
    renderProductDetail();
  }
  // Calculator page
  if (document.querySelector('#calculator-form')) {
    // Prefill if slug provided
    prefillCalculator();
    // Bind calculation on submit
    const form = document.querySelector('#calculator-form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      runCalculator();
    });
  }
  // Contact form
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const successMsg = document.querySelector('#contact-success');
      const errorMsg = document.querySelector('#contact-error');
      if (successMsg) successMsg.textContent = '¡Gracias! Recibimos tu solicitud y un asesor te contactará en menos de 24 horas hábiles.';
      contactForm.reset();
    });
  }
  // Compare modal backdrop click to close
  const compareModal = document.querySelector('#compare-modal');
  if (compareModal) {
    compareModal.addEventListener('click', e => {
      if (e.target === compareModal) {
        compareModal.style.display = 'none';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', init);