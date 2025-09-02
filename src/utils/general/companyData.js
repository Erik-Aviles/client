export const companyData = {
  name: "Betimes Company",
  email: "betimescompany23@gmail.com",
  primaryColor: "#006279",
  secondaryColor: "#6D41A1",
  logo: "/betimesCompany.png",
  streetAddress: "Av. Jaime Roldos Aguillera y cuadragesima septima",
  city: " Quevedo",
  province: "Los Rios",
  country: "Ecuador",
  postal: "120310",
  tax: 15,
  socialMedia: [
    { title: "facebook", href: "#" },
    { title: "instagram", href: "#" },
    { title: "tiktok", href: "#" },
    { title: "twitter", href: "#" },
  ],
  shippingOptions: [
    {
      id: "local",
      title: "Retiro en tienda",
      description: "En nuestra tienda sin costo.",
      value: 0,
      estimatedTime: "Mismo día",
    },
    {
      id: "standard",
      title: "Envío estándar",
      description: "Retiro en servicio de mensajería.",
      value: 4.99,
      estimatedTime: "2-5 días hábiles",
    },
    {
      id: "vip",
      title: "Envío VIP",
      description: "Entrega a domicilio.",
      value: 9.99,
      estimatedTime: "1 día hábil",
    },
  ],
};

export const userRole = [
  { id: 1, title: "Usuario" },
  { id: 2, title: "Aministrador" },
  { id: 3, title: "Proveedor" },
  { id: 3, title: "Personal" },
];

export const shippingOptions = [
  {
    id: "local-pickup",
    name: "Retiro en tienda",
    description: "Puedes retirar tu pedido en nuestra tienda sin costo.",
    price: 0,
    estimatedTime: "Mismo día",
  },
  {
    id: "standard",
    name: "Envío estándar",
    description: "Entrega en 2 a 5 días hábiles.",
    price: 4.99,
    estimatedTime: "2-5 días hábiles",
  },
  {
    id: "express",
    name: "Envío express",
    description: "Entrega al siguiente día hábil.",
    price: 9.99,
    estimatedTime: "1 día hábil",
  },
  {
    id: "regional",
    name: "Envío regional",
    description: "Envío a zonas rurales o provincias.",
    price: 7.99,
    regions: ["Azuay", "Manabí", "Loja"], // opcional
    estimatedTime: "3-6 días hábiles",
  },
];
