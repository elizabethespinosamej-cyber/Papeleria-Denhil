import { useEffect, useMemo, useState } from "react";
import "./App.css";

const WHATSAPP = "525648222903"; 
const FACEBOOK = "https://www.facebook.com/share/1c2fbPmC18/";


const DIRECCION = "Calle Principal #21, Colonia Centro, Ciudad de México, México";


const DIRECCION_MAPA = "Papelería Denhil, Calle Principal 21, Ciudad de México";

const MAPS =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(DIRECCION_MAPA);
const MAPS_EMBED =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(DIRECCION_MAPA) +
  "&z=16&output=embed";

const FOTOS = {
  tienda: "/FrentePapeleria.jpeg",     
  historia: "/PapeDentro.jpeg",
};

const wa = (texto) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

const NAV = [
  ["inicio", "Inicio"],
  ["catalogo", "Catálogo"],
  ["servicios", "Servicios"],
  ["promociones", "Promociones"],
  ["nosotros", "Nosotros"],
  ["contacto", "Contacto"],
];

const CATEGORIAS = [
  ["todos", "🛍️ Todos los productos"],
  ["escolar", "📚 Papelería Escolar"],
  ["oficina", "🗂️ Oficina & Archivo"],
  ["merceria", "🎨 Mercería & Arte"],
  ["regalos", "🎁 Regalos & Envolturas"],
  ["computo", "🖥️ Internet & Cómputo"],
];

const MARCAS = [
  { nombre: "BIC", logo: "/marcas/bic.png" },
  { nombre: "Crayola", logo: "/marcas/crayola.png" },
  { nombre: "Prismacolor", logo: "/marcas/prismacolor.png" },
];

const PRODUCTOS = [
  {
    id: 1,
    cat: "escolar",
    tag: "Escolar",
    marca: "",
    nombre: "Cuadernos Profesionales",
    desc: "Tenemos cuadernos profesionales de todas las marcas. Elige el tipo de hoja: cuadro chico, cuadro grande, raya o blancos.",
    estado: "Surtido Inmediato",
    img: "/Cuadernos.jpeg",
    opcionesTitulo: "Tipo de hoja",
    opciones: ["Cuadro chico", "Cuadro grande", "Raya", "Blancos"]
  },
  {
    id: 2,
    cat: "escolar",
    tag: "Escritura",
    marca: "BIC",
    nombre: "Plumas BIC (paquete de un solo color)",
    desc: "Paquetes de plumas BIC de un solo color. Elige azul, negro o rojo.",
    estado: "Disponible en tienda",
    img: "/Plumas bic.jpeg",
    opcionesTitulo: "Color",
    opciones: ["Azul", "Negro", "Rojo"]
  },
  {
    id: 3,
    cat: "escolar",
    tag: "Escritura",
    marca: "BIC",
    nombre: "Plumas BIC (paquete de colores mixtos)",
    desc: "Paquetes de plumas BIC con colores mixtos.",
    estado: "Disponible en tienda",
    img: "/PLumascoloresbic.jpeg"
  },
  {
    id: 4,
    cat: "merceria",
    tag: "Arte",
    marca: "Prismacolor",
    nombre: "Colores Prismacolor",
    desc: "Cajas de colores Prismacolor. Elige la presentación de 12 o de 24 colores.",
    estado: "Surtido Inmediato",
    img: "/Colores prismas 12.jpeg",
    opcionesTitulo: "Presentación",
    opciones: ["12 colores", "24 colores"]
  },
  {
    id: 5,
    cat: "merceria",
    tag: "Arte",
    marca: "Crayola",
    nombre: "Crayola",
    desc: "Cajas de colores Crayola. Elige la presentación de 12 o de 24 crayolas.",
    estado: "Surtido Inmediato",
    img: "Crayolas12.jpeg",
    opcionesTitulo: "Presentación",
    opciones: ["12 crayolas", "24 crayolas"]
  }
];

const TEMPORADAS = [
  { icono: "📝", titulo: "Listas Escolares Completas", texto: "Envíanos foto de tu lista oficial por WhatsApp. Nosotros la surtimos por ti y te la entregamos lista para recoger.", cta: "Enviar mi lista por WhatsApp", msg: "Hola, quiero enviarles mi lista escolar para que me la surtan." },
  { icono: "💀", titulo: "Día de Muertos & Tradiciones", texto: "Papel picado, calaveritas para colorear, cartoncillo naranja y morado, papel crepé y artículos para altares escolares.", cta: "Apartar material de temporada", msg: "Hola, quiero apartar material para Día de Muertos." },
  { icono: "🎁", titulo: "Navidad y Regalos", texto: "Papel de regalo brillante, moños artesanales confeccionados en tienda, bolsas temáticas y tarjetas de dedicatoria.", cta: "Consultar envolturas especiales", msg: "Hola, quiero consultar envolturas y regalos de Navidad." },
];

const SERVICIOS = [
  { icono: "🖨️", titulo: "Copias e Impresiones", texto: "Impresiones láser y tinta continua en blanco y negro o full color en alta definición. Papel bond, opalina, cartulina y fotográfico.", cta: "Enviar archivo por WhatsApp", msg: "Hola, quiero mandar un archivo para imprimir." },
  { icono: "🧊", titulo: "Enmicados & Plastificados", texto: "Protege tus credenciales, actas, certificados y fotografías contra el agua y el tiempo con enmicado térmico de gran calibre.", cta: "Consultar medidas y formatos", msg: "Hola, quiero consultar medidas y precios de enmicado." },
  { icono: "📐", titulo: "Maquetas & Proyectos", texto: "Bases de unicel, cascarón, plastilinas, árboles a escala, figuras anatómicas y pegamentos especiales para tareas escolares.", cta: "Cotizar kit para maqueta", msg: "Hola, quiero cotizar un kit para una maqueta." },
  { icono: "🌐", titulo: "Trámites por Internet", texto: "Descarga e impresión de CURP oficial, actas de nacimiento certificadas, RFC, citas gubernamentales y escaneo directo a USB o correo.", cta: "Asistencia para tu trámite", msg: "Hola, necesito ayuda con un trámite por internet." },
];

const PASOS = [
  "Envía tu archivo (PDF, Word, imagen) con tus indicaciones.",
  "Te confirmamos la recepción y el tiempo estimado de entrega.",
  "Pasa a mostrador, paga con tu método preferido ¡y listo!",
];

const quitarAcentos = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function estaAbierto(ahora) {
  const dia = ahora.getDay(); // 0 = domingo
  const min = ahora.getHours() * 60 + ahora.getMinutes();
  if (dia === 0) return min >= 9 * 60 && min < 15 * 60;
  return min >= 8 * 60 && min < 20 * 60 + 30;
}

export default function App() {
  const [categoria, setCategoria] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [seccion, setSeccion] = useState("inicio");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [abierto, setAbierto] = useState(estaAbierto(new Date()));
  const [mostrarArriba, setMostrarArriba] = useState(false);
  const [verSug, setVerSug] = useState(false);

  /* ================= 🛒 CARRITO ================= */
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = JSON.parse(localStorage.getItem("denhil-carrito-v2"));
      return Array.isArray(guardado) ? guardado : [];
    } catch {
      return [];
    }
  });
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [cliente, setCliente] = useState("");
  const [notas, setNotas] = useState("");
  const [aviso, setAviso] = useState("");
  const [opcion, setOpcion] = useState({}); // opción elegida por producto

  // Guarda el carrito para que no se pierda al recargar
  useEffect(() => {
    try { localStorage.setItem("denhil-carrito-v2", JSON.stringify(carrito)); } catch { /* sin almacenamiento */ }
  }, [carrito]);

  // Bloquea el scroll de la página y cierra con Escape cuando el carrito está abierto
  useEffect(() => {
    document.body.style.overflow = carritoAbierto ? "hidden" : "";
    const onKey = (e) => { if (e.key === "Escape") setCarritoAbierto(false); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [carritoAbierto]);

  // Oculta el aviso "Agregado" a los 1.8 segundos
  useEffect(() => {
    if (!aviso) return;
    const t = setTimeout(() => setAviso(""), 1800);
    return () => clearTimeout(t);
  }, [aviso]);

  const lineas = useMemo(
    () =>
      carrito
        .map(({ id, opc, cant }) => ({ p: PRODUCTOS.find((x) => x.id === id), opc, cant }))
        .filter((l) => l.p && (!l.p.opciones || l.p.opciones.includes(l.opc))),
    [carrito]
  );
  const totalItems = lineas.reduce((n, l) => n + l.cant, 0);
  const enCarrito = (id) => carrito.filter((c) => c.id === id).reduce((n, c) => n + c.cant, 0);
  const opcionDe = (p) => (p.opciones ? opcion[p.id] || p.opciones[0] : undefined);

  const agregar = (p) => {
    const opc = opcionDe(p);
    const igual = (c) => c.id === p.id && c.opc === opc;
    setCarrito((prev) =>
      prev.some(igual)
        ? prev.map((c) => (igual(c) ? { ...c, cant: c.cant + 1 } : c))
        : [...prev, { id: p.id, opc, cant: 1 }]
    );
    setAviso(`✓ ${p.nombre}${opc ? " (" + opc + ")" : ""} agregado al carrito`);
  };
  const cambiar = (id, opc, delta) =>
    setCarrito((prev) =>
      prev
        .map((c) => (c.id === id && c.opc === opc ? { ...c, cant: c.cant + delta } : c))
        .filter((c) => c.cant > 0)
    );
  const quitar = (id, opc) => setCarrito((prev) => prev.filter((c) => !(c.id === id && c.opc === opc)));
  const vaciar = () => setCarrito([]);

  // Mensaje que se envía a WhatsApp
  const partes = ["Hola, este es mi carrito de Papelería Denhil 🛒"];
  if (cliente.trim()) partes.push(`Nombre: ${cliente.trim()}`);
  partes.push(
    "",
    "Productos:",
    ...lineas.map(({ p, opc, cant }) => `• ${cant} x ${p.nombre}${opc ? " - " + opc : ""}`),
    "",
    `Total de artículos: ${totalItems}`
  );
  if (notas.trim()) partes.push(`Notas: ${notas.trim()}`);
  partes.push("", "Quedo al pendiente para confirmar disponibilidad y precio. ¡Gracias!");
  const mensajeCarrito = partes.join("\n");

  // Sección activa en el menú + botón "volver arriba"
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      let actual = "inicio";
      NAV.forEach(([id]) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) actual = id;
      });
      setSeccion(actual);
      setMostrarArriba(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Actualiza "Abierto / Cerrado" cada minuto
  useEffect(() => {
    const t = setInterval(() => setAbierto(estaAbierto(new Date())), 60000);
    return () => clearInterval(t);
  }, []);

  const irA = (id) => {
    setMenuAbierto(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const productos = useMemo(() => {
    const q = quitarAcentos(busqueda.trim());
    if (!q) return categoria === "todos" ? PRODUCTOS : PRODUCTOS.filter((p) => p.cat === categoria);
    return PRODUCTOS.filter((p) =>
      quitarAcentos(`${p.nombre} ${p.desc} ${p.marca} ${p.tag}`).includes(q)
    );
  }, [busqueda, categoria]);

  const buscando = busqueda.trim() !== "";

  return (
    <div className="app">
      {/* Barra superior */}
      <div className="topbar">
        <div className="wrap topbar-in">
          <span>💳 Aceptamos efectivo, tarjetas de débito/crédito y vales de despensa</span>
          <span className="topbar-hide">🕗 Lun - Sáb: 8:00 AM - 8:30 PM | Dom: 9:00 AM - 3:00 PM</span>
          <span>
            <a href={wa("Hola, quiero información.")} target="_blank" rel="noreferrer">WhatsApp Tienda Directo</a>
            {" | "}
            <a href={FACEBOOK} target="_blank" rel="noreferrer">Facebook Oficial</a>
          </span>
        </div>
      </div>

      {/* Navegación */}
      <header className="nav">
        <div className="wrap nav-in">
          <button className="logo" onClick={() => irA("inicio")}>
            <span className="logo-ico">📖</span>
            <span>
              <b>Papelería Denhil</b>
              <small>UN MUNDO DE TODO</small>
            </span>
          </button>

          <nav className={`links ${menuAbierto ? "open" : ""}`}>
            {NAV.map(([id, label]) => (
              <button key={id} className={seccion === id ? "on" : ""} onClick={() => irA(id)}>
                {label}
              </button>
            ))}
          </nav>

          <div className="buscar">
            🔍
            <input
              value={busqueda}
              placeholder="Busca cuadernos, copias..."
              onChange={(e) => { setBusqueda(e.target.value); setVerSug(true); }}
              onFocus={() => setVerSug(true)}
              onBlur={() => setTimeout(() => setVerSug(false), 150)}
              onKeyDown={(e) => {
                if (e.key === "Enter") { setVerSug(false); irA("catalogo"); }
                if (e.key === "Escape") setVerSug(false);
              }}
            />
            {buscando && (
              <button className="limpiar" onClick={() => setBusqueda("")} aria-label="Borrar búsqueda">✕</button>
            )}
            {buscando && verSug && (
              <ul className="sugerencias">
                {productos.length === 0 ? (
                  <li className="sin">Sin coincidencias, pregúntanos por WhatsApp</li>
                ) : (
                  productos.slice(0, 5).map((p) => (
                    <li
                      key={p.id}
                      onMouseDown={() => {
                        setBusqueda(p.nombre);
                        setVerSug(false);
                        irA("catalogo");
                      }}
                    >
                      <span className="sug-ico">{p.img ? <img src={encodeURI(p.img)} alt="" /> : p.icono}</span>
                      <div><b>{p.nombre}</b><small>{p.tag} • {p.estado}</small></div>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>

          <a className="btn btn-azul" href={wa("Hola, quiero cotizar.")} target="_blank" rel="noreferrer">
            💬 Cotizar por WhatsApp
          </a>
          {/* 🛒 Botón del carrito */}
          <button className="btn-carrito" onClick={() => setCarritoAbierto(true)} aria-label="Abrir carrito">
            🛒<span className="carrito-txt"> Carrito</span>
            {totalItems > 0 && <i className="badge">{totalItems}</i>}
          </button>
          <button className="burger" onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Menú">
            {menuAbierto ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Inicio */}
      <section id="inicio" className="hero">
        <div className="wrap hero-in">
          <div>
            <span className="chip chip-naranja">Comercio local con tradición y confianza familiar</span>
            <h1>¡Bienvenidos a <span>Papelería Denhil</span>!</h1>
            <p className="lead">
              Todo lo que necesitas para tu escuela, oficina y proyectos personales, con la calidez y el servicio que mereces.
              Desde listas escolares completas hasta impresiones express y trámites digitales.
            </p>
            <div className="pagos">
              <b>💳 Aceptamos efectivo, tarjetas y vales</b>
              <span>Sin comisiones sorpresa en compras escolares</span>
            </div>
            <div className="botones">
              <button className="btn btn-azul" onClick={() => irA("catalogo")}>📖 Explorar Catálogo</button>
              <button className="btn btn-borde" onClick={() => irA("imprimir")}>🖨️ Enviar archivos a imprimir</button>
            </div>
            <div className="stats">
              <div><b>+15 Años</b><span>De servicio comunitario</span></div>
              <div><b>100%</b><span>Atención personalizada</span></div>
              <div><b>+3,000</b><span>Artículos en surtido</span></div>
            </div>
          </div>
          <div className="hero-foto">
            {/* 📷 FOTO DE LA TIENDA: se cambia en FOTOS.tienda (arriba del archivo) */}
            <div className="foto" style={FOTOS.tienda ? { backgroundImage: `url("${encodeURI(FOTOS.tienda)}")` } : undefined}>
              {!FOTOS.tienda && <span>🏪</span>}
            </div>
            <div className="foto-pie">
              <div><b>Tienda Física Activa</b><small>Mostrador y atención directa</small></div>
              <span className={`estado ${abierto ? "si" : "no"}`}>{abierto ? "Abierto Hoy" : "Cerrado ahora"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Promoción */}
      <section id="promociones" className="wrap">
        <div className="promo">
          <div>
            <span className="chip chip-amarillo">¡PROMOCIÓN ESCOLAR Y DE OFICINA!</span>
            <h2>En la compra de 5 productos del mismo precio, ¡el sexto tiene 50% de descuento!</h2>
            <p>Aplica en cuadernos, bolígrafos, cartulinas, carpetas y consumibles seleccionados para que surtas tu lista completa ahorrando más.</p>
          </div>
          <a className="btn btn-amarillo" href={wa("Hola, quiero aprovechar la promoción del sexto producto al 50%.")} target="_blank" rel="noreferrer">
            🏷️ Aprovechar oferta vía WhatsApp
          </a>
        </div>
      </section>

      {/* Historia */}
      <section id="nosotros" className="wrap historia">
        <div>
          <span className="chip chip-azul">♡ Corazón, familia y esfuerzo</span>
          <h2>Nuestra Historia: El sueño de crear un hogar para tus proyectos</h2>
          <p>
            Todo comenzó con la entrega y dedicación de su fundadora, quien con paciencia y maestría elaboraba forros artesanales
            cosidos a mano para cuadernos escolares. Con cada libreta forrada con esmero, nació el compromiso de acompañar a
            padres de familia, estudiantes y maestros en cada ciclo educativo.
          </p>
          <p>
            Hoy, Papelería Denhil sigue siendo ese espacio cercano donde no eres un número de orden, sino un vecino al que
            escuchamos y ayudamos a encontrar exactamente lo que necesita.
          </p>
          <div className="valores">
            <div>🤝<b>Trato Amable</b><small>Atención con paciencia</small></div>
            <div>👥<b>Vocación</b><small>Compromiso genuino</small></div>
            <div>🏘️<b>Comunidad</b><small>Impulso a la zona local</small></div>
          </div>
        </div>
        <div className="historia-foto">
          {/* 📷 FOTO DE LA HISTORIA: se cambia en FOTOS.historia (arriba del archivo) */}
          <div className="foto" style={FOTOS.historia ? { backgroundImage: `url("${encodeURI(FOTOS.historia)}")` } : undefined}>
            {!FOTOS.historia && <span>📚</span>}
          </div>
          <blockquote>
            “Desde el primer cuaderno forrado a mano, nuestro compromiso siempre ha sido servir a cada familia con esmero.”
            <cite>— Familia Denhil</cite>
          </blockquote>
        </div>
      </section>

      {/* Catálogo */}
      <section id="catalogo" className="wrap">
        <small className="kicker">📦 CATÁLOGO EXTENSO & SURTIDO INMEDIATO</small>
        <div className="cat-head">
          <div>
            <h2>Explora Nuestro Mundo de Todo</h2>
            <p className="sub">Selecciona tus artículos y pide cotización o apartado directo vía WhatsApp para entrega ágil en tienda.</p>
          </div>
          <a className="link" href={wa("Hola, les envío mi lista completa para cotizar.")} target="_blank" rel="noreferrer">
            ¿Buscas una lista completa? Envíala aquí →
          </a>
        </div>

        <div className="tabs">
          {CATEGORIAS.map(([id, label]) => (
            <button
              key={id}
              className={!buscando && categoria === id ? "on" : ""}
              onClick={() => { setBusqueda(""); setCategoria(id); }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 🏷️ MARCAS: se editan en el arreglo MARCAS (arriba del archivo) */}
        <div className="marcas">
          <span>MARCAS LÍDERES EN INVENTARIO:</span>
          <div>
            {MARCAS.map((m) =>
              m.logo ? (
                <img
                  key={m.nombre}
                  src={m.logo}
                  alt={m.nombre}
                  title={m.nombre}
                  className="logo-marca"
                  onError={(e) => { e.currentTarget.replaceWith(Object.assign(document.createElement("em"), { textContent: m.nombre })); }}
                />
              ) : (
                <em key={m.nombre}>{m.nombre}</em>
              )
            )}
          </div>
        </div>

        <h3 className="mas-vendido">
          {buscando ? `🔍 Resultados para “${busqueda.trim()}” (${productos.length})` : "⭐ Lo Más Vendido en Mostrador"}
        </h3>

        {productos.length === 0 ? (
          <div className="vacio">
            <p>{buscando ? "No encontramos ese artículo en el catálogo, ¡pero puede que lo tengamos en tienda!" : "Estamos subiendo los productos de esta categoría. ¡Pregúntanos por WhatsApp lo que necesites!"}</p>
            <a className="btn btn-azul" href={wa(buscando ? `Hola, ¿tienen "${busqueda.trim()}"?` : "Hola, quiero consultar productos de esta categoría.")} target="_blank" rel="noreferrer">
              💬 Preguntar por WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid4">
            {productos.map((p) => (
              <article className="card" key={p.id}>
                {/* 📷 FOTO DEL PRODUCTO: se cambia en el campo "img" de cada producto (arreglo PRODUCTOS) */}
                <div className="card-img">
                  <span className="tag">{p.tag.toUpperCase()}</span>
                  {p.img ? (
                    <img
                      src={encodeURI(p.img)}
                      alt={p.nombre}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : null}
                  {/* El emoji queda de respaldo detrás de la foto */}
                  {p.icono && <span className="ico">{p.icono}</span>}
                </div>
                <div className="card-body">
                  {/* 🏷️ MARCA DEL PRODUCTO: se cambia en el campo "marca" de cada producto */}
                  {p.marca && <small>Marca: {p.marca}</small>}
                  <h4>{p.nombre}</h4>
                  <p>{p.desc}</p>
                  {p.opciones && (
                    <label className="opcion">
                      <span>{p.opcionesTitulo}:</span>
                      <select value={opcionDe(p)} onChange={(e) => setOpcion({ ...opcion, [p.id]: e.target.value })}>
                        {p.opciones.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </label>
                  )}
                  <span className="stock">● {p.estado}</span>
                  {enCarrito(p.id) > 0 && <span className="en-carrito">✓ {enCarrito(p.id)} en tu carrito</span>}
                  <button className="btn btn-azul btn-full" onClick={() => agregar(p)}>
                    🛒 Agregar al carrito
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Temporadas */}
      <section className="wrap">
        <div className="temporadas">
          <div className="cat-head">
            <div>
              <small className="kicker naranja">TEMÁTICAS DINÁMICAS</small>
              <h2>Especial de Temporadas Denhil</h2>
              <p className="sub">Materiales preparados para las festividades, manualidades y listas del ciclo escolar.</p>
            </div>
            <a className="btn btn-borde btn-chico" href={wa("Hola, quiero consultar materiales específicos.")} target="_blank" rel="noreferrer">
              ❓ Consultar materiales específicos
            </a>
          </div>
          <div className="grid3">
            {TEMPORADAS.map((t) => (
              <div className="card-plana" key={t.titulo}>
                <span className="ico-sq">{t.icono}</span>
                <h4>{t.titulo}</h4>
                <p>{t.texto}</p>
                <a className="link" href={wa(t.msg)} target="_blank" rel="noreferrer">{t.cta} ›</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="wrap centro">
        <small className="kicker naranja">SOLUCIONES PRÁCTICAS</small>
        <h2 className="azul-grande">Servicios de Cómputo e Impresión</h2>
        <p className="sub">Ahorra tiempo y filas. Realizamos tus impresiones y trámites con rapidez y la máxima resolución.</p>
        <div className="grid4 izq">
          {SERVICIOS.map((s) => (
            <div className="card-plana" key={s.titulo}>
              <span className="ico-sq azul">{s.icono}</span>
              <h4>{s.titulo}</h4>
              <p>{s.texto}</p>
              <a className="link" href={wa(s.msg)} target="_blank" rel="noreferrer">{s.cta} ▹</a>
            </div>
          ))}
        </div>
      </section>

      {/* Enviar archivos */}
      <section id="imprimir" className="wrap">
        <div className="rapido">
          <div>
            <span className="chip chip-oscuro">⚡ Servicio Rápido Cero Filas</span>
            <h2>Envía tus archivos para imprimir y recógelos listos</h2>
            <p>
              ¿Llevas prisa para la escuela o la oficina? Mándanos tus documentos por WhatsApp
              especificando el formato (color o blanco y negro, doble cara, engrapado). Te confirmamos al instante y los recoges en mostrador sin esperar.
            </p>
            <div className="botones">
              <a className="btn btn-amarillo" href={wa("Hola, les envío un archivo para imprimir.")} target="_blank" rel="noreferrer">💬 Enviar por WhatsApp</a>
            </div>
          </div>
          <div className="como">
            <h4>☑ ¿Cómo funciona?</h4>
            <ol>{PASOS.map((p, i) => <li key={i}><b>{i + 1}</b>{p}</li>)}</ol>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="wrap centro">
        <small className="kicker naranja">SIEMPRE CERCA DE TI</small>
        <h2 className="azul-grande">Ubicación, Horarios y Contacto</h2>
        <p className="sub">Visítanos en nuestra tienda física o comunícate directamente con nuestro equipo de atención.</p>
        <div className="contacto izq">
          <div className="col">
            <div className="caja">
              <span className="ico-sq">📍</span>
              <div>
                <h4>Dirección de la Tienda</h4>
                {/* 📍 DIRECCIÓN: se cambia en la constante DIRECCION (arriba del archivo) */}
                <p>Papelería Denhil — {DIRECCION}.</p>
                <a className="link" href={MAPS} target="_blank" rel="noreferrer">Cómo llegar en Google Maps ↗</a>
              </div>
            </div>
            <div className="caja">
              <span className="ico-sq">🕗</span>
              <div>
                <h4>Horario de Atención</h4>
                <div className="horario"><b>Lunes a Sábado:</b><span>8:00 AM - 8:30 PM</span></div>
                <div className="horario"><b>Domingo:</b><span>9:00 AM - 3:00 PM</span></div>
                <span className={`estado ${abierto ? "si" : "no"}`}>
                  {abierto ? "Abierto ahora" : "Cerrado ahora"}
                </span>
              </div>
            </div>
            <div className="caja fb">
              <div>
                <h4>🌐 Comunidad en Facebook</h4>
                <p>Dinámicas, avisos de descanso y novedades</p>
                <a className="btn btn-azul btn-full" href={FACEBOOK} target="_blank" rel="noreferrer">Síguenos en Facebook →</a>
              </div>
            </div>
          </div>
          <div className="mapa">
            {/* 🗺️ MAPA REAL: se genera con DIRECCION_MAPA (arriba del archivo) */}
            <div className="mapa-embed">
              <iframe
                title="Ubicación de Papelería Denhil"
                src={MAPS_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="mapa-pie">
              <span>💡 Tus pedidos se atienden al instante por WhatsApp o directo en mostrador</span>
              <a className="link" href={MAPS} target="_blank" rel="noreferrer">Abrir en Google Maps ↗</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="wrap foot-grid">
          <div>
            <h4>Papelería Denhil</h4>
            <small className="naranja-t">UN MUNDO DE TODO</small>
            <p>Tradición familiar y servicio comprometido con el aprendizaje y los proyectos de toda nuestra comunidad escolar y empresarial.</p>
          </div>
          <div>
            <h4>Catálogo y Servicios</h4>
            <button onClick={() => { setBusqueda(""); setCategoria("todos"); irA("catalogo"); }}>Catálogo Escolar</button>
            <button onClick={() => irA("servicios")}>Servicios de Impresión</button>
            <button onClick={() => irA("promociones")}>Promociones del Mes</button>
          </div>
          <div>
            <h4>Conócenos</h4>
            <button onClick={() => irA("nosotros")}>Historia Denhil</button>
            <button onClick={() => irA("contacto")}>Ubicación y Horarios</button>
            <button onClick={() => alert("Aviso de privacidad: aquí puedes agregar tu texto o enlazar a tu documento.")}>Aviso de Privacidad</button>
          </div>
          <div>
            <h4>Métodos de Pago</h4>
            <div className="pills"><em>Efectivo</em><em>Tarjetas Débito/Crédito</em><em>Vales de Despensa</em></div>
            <p>¿Dudas sobre material o surtido especial?</p>
            <a className="link" href={wa("Hola, tengo una duda sobre material.")} target="_blank" rel="noreferrer">💬 Contactar a Mostrador</a>
          </div>
        </div>
        <div className="wrap foot-pie">
          <span>© {new Date().getFullYear()} Papelería Denhil. Un Mundo de Todo. Todos los derechos reservados.</span>
          <span>Hecho con dedicación familiar • <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Volver arriba</button></span>
        </div>
      </footer>

      {/* 🛒 Panel del carrito */}
      {carritoAbierto && <div className="overlay" onClick={() => setCarritoAbierto(false)} />}
      <aside className={`drawer ${carritoAbierto ? "open" : ""}`} aria-hidden={!carritoAbierto}>
        <div className="drawer-head">
          <h3>🛒 Mi carrito</h3>
          <button onClick={() => setCarritoAbierto(false)} aria-label="Cerrar carrito">✕</button>
        </div>

        {lineas.length === 0 ? (
          <div className="drawer-vacio">
            <span>🛒</span>
            <p>Tu carrito está vacío. Agrega productos del catálogo y envíanos tu pedido por WhatsApp.</p>
            <button className="btn btn-azul" onClick={() => { setCarritoAbierto(false); irA("catalogo"); }}>
              Ver catálogo
            </button>
          </div>
        ) : (
          <>
            <ul className="drawer-lista">
              {lineas.map(({ p, opc, cant }) => (
                <li key={p.id + "|" + (opc || "")}>
                  <span className="mini">
                    {p.img && <img src={encodeURI(p.img)} alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} />}
                    {p.icono}
                  </span>
                  <div className="info">
                    <b>{p.nombre}</b>
                    <small>{[p.marca, opc].filter(Boolean).join(" • ")}</small>
                    <div className="cant">
                      <button onClick={() => cambiar(p.id, opc, -1)} aria-label="Quitar uno">−</button>
                      <span>{cant}</span>
                      <button onClick={() => cambiar(p.id, opc, 1)} aria-label="Agregar uno">+</button>
                    </div>
                  </div>
                  <button className="quitar" onClick={() => quitar(p.id, opc)} aria-label="Eliminar producto">🗑️</button>
                </li>
              ))}
            </ul>
            <div className="drawer-pie">
              <input
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                placeholder="Tu nombre (opcional)"
              />
              <textarea
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Notas o indicaciones (opcional)"
                rows={2}
              />
              <div className="total"><span>Total de artículos</span><b>{totalItems}</b></div>
              <a className="btn btn-verde btn-full" href={wa(mensajeCarrito)} target="_blank" rel="noreferrer">
                📲 Enviar pedido por WhatsApp
              </a>
              <button className="vaciar" onClick={vaciar}>Vaciar carrito</button>
            </div>
          </>
        )}
      </aside>

      {aviso && <div className="toast">{aviso}</div>}

      {/* Chat flotante */}
      <a className="chat" href={wa("Hola, quiero cotizar sin compromiso.")} target="_blank" rel="noreferrer">
        <span className="pill"><i /> En línea • <b>Cotiza aquí sin compromiso</b></span>
        <span className="chat-btn">💬</span>
      </a>

      {mostrarArriba && (
        <button className="subir" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Subir">↑</button>
      )}
    </div>
  );
}
