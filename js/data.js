// general data for the application

const tipoDocumento = ["C.C", "C.E", "PAS"];
const sexos = ["F", "M"];
const nacionalidades = ["COL", "EXTRANJERO"];

const distritosMilitares = [
    "Distrito 1 - Bogotá",
    "Distrito 2 - Medellín",
    "Distrito 3 - Cali",
    "Distrito 4 - Barranquilla",
    "Distrito 5 - Bucaramanga",
    "Distrito 6 - Manizales",
    "Distrito 7 - Pereira",
    "Distrito 8 - Ibagué",
    "Distrito 9 - Cúcuta",
    "Distrito 10 - Pasto"
];

const paises = [
    "Colombia", "Venezuela", "Ecuador", "Perú", "Brasil",
    "Argentina", "Chile", "México", "Estados Unidos", "España",
    "Francia", "Alemania", "Italia", "Portugal", "Otro"
];

const departamentos = [
    "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar",
    "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca",
    "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía",
    "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta",
    "Nariño", "Norte de Santander", "Putumayo", "Quindío",
    "Risaralda", "San Andrés", "Santander", "Sucre", "Tolima",
    "Valle del Cauca", "Vaupés", "Vichada"
];

const municipios = {
    "Amazonas": ["Leticia", "Puerto Nariño"],
    "Antioquia": ["Medellín", "Bello", "Envigado", "Itagüí", "Rionegro", "Apartadó", "Turbo"],
    "Arauca": ["Arauca", "Saravena", "Tame", "Fortul"],
    "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Sabanalarga", "Baranoa"],
    "Bolívar": ["Cartagena", "Magangué", "El Carmen de Bolívar", "Mompox"],
    "Boyacá": ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Paipa"],
    "Caldas": ["Manizales", "La Dorada", "Chinchiná", "Riosucio", "Salamina"],
    "Caquetá": ["Florencia", "San Vicente del Caguán", "Puerto Rico", "El Doncello", "La Montañita"],
    "Casanare": ["Yopal", "Aguazul", "Villanueva", "Tauramena", "Paz de Ariporo"],
    "Cauca": ["Popayán", "Santander de Quilichao", "Puerto Tejada", "Patía", "Guapi"],
    "Cesar": ["Valledupar", "Aguachica", "Codazzi", "La Paz", "Bosconia"],
    "Chocó": ["Quibdó", "Istmina", "Tumaco", "Bahía Solano", "Nuquí"],
    "Córdoba": ["Montería", "Lorica", "Sahagún", "Cereté", "Montelíbano"],
    "Cundinamarca": ["Bogotá", "Soacha", "Zipaquirá", "Facatativá", "Chía", "Fusagasugá"],
    "Guainía": ["Inírida"],
    "Guaviare": ["San José del Guaviare", "Calamar", "El Retorno", "Miraflores"],
    "Huila": ["Neiva", "Pitalito", "Garzón", "La Plata", "Campoalegre"],
    "La Guajira": ["Riohacha", "Maicao", "Uribia", "Manaure", "Fonseca"],
    "Magdalena": ["Santa Marta", "Ciénaga", "Fundación", "El Banco", "Plato"],
    "Meta": ["Villavicencio", "Acacías", "Granada", "Puerto López", "San Martín"],
    "Nariño": ["Pasto", "Tumaco", "Ipiales", "Túquerres", "La Unión"],
    "Norte de Santander": ["Cúcuta", "Ocaña", "Pamplona", "Villa del Rosario", "Los Patios"],
    "Putumayo": ["Mocoa", "Puerto Asís", "Orito", "Valle del Guamuez", "Sibundoy"],
    "Quindío": ["Armenia", "Calarcá", "Montenegro", "Quimbaya", "La Tebaida", "Circasia"],
    "Risaralda": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal", "La Virginia", "Belén de Umbría"],
    "San Andrés": ["San Andrés", "Providencia"],
    "Santander": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barrancabermeja"],
    "Sucre": ["Sincelejo", "Corozal", "Sampués", "San Marcos", "Tolú"],
    "Tolima": ["Ibagué", "Espinal", "Melgar", "Honda", "Chaparral"],
    "Valle del Cauca": ["Cali", "Buenaventura", "Palmira", "Tuluá", "Buga", "Cartago"],
    "Vaupés": ["Mitú", "Carurú", "Taraira"],
    "Vichada": ["Puerto Carreño", "La Primavera", "Santa Rosalía"]
};

const modalidadesAcademicas = [
    { codigo: "TC", nombre: "Técnica" },
    { codigo: "TL", nombre: "Tecnológica" },
    { codigo: "TE", nombre: "Tecnológica Especializada" },
    { codigo: "UN", nombre: "Universitaria" },
    { codigo: "ES", nombre: "Especialización" },
    { codigo: "MG", nombre: "Maestría o Magíster" },
    { codigo: "DOC", nombre: "Doctorado o PHD" }
];

const idiomas = [
    "Inglés", "Francés", "Alemán", "Portugués",
    "Italiano", "Mandarín", "Japonés", "Árabe", "Otro"
];

const nivelesIdioma = ["R", "B", "MB"];

const estadosHojaVida = ["Diligenciada", "Aceptada", "Rechazada"];