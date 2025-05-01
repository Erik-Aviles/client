import { faker } from "@faker-js/faker";
import {
  CheckCheck,
  Forward,
  Layers,
  Loader2,
  RefreshCcw,
  ShoppingCart,
} from "lucide-react";

export const orderPeriod = [
  {
    period: "Ordendes del dia",
    sales: "13000",
    color: "bg-orange-500",
    icon: <Layers />,
  },
  {
    period: "Ordendes de ayer",
    sales: "12000",
    color: "bg-green-600",
    icon: <Layers />,
  },
  {
    period: "Esta semana",
    sales: "14000",
    color: "bg-purple-600",
    icon: <Layers />,
  },
  {
    period: "Este mes",
    sales: "15000",
    color: "bg-yellow-600",
    icon: <Layers />,
  },
  {
    period: "Mes pasado",
    sales: "17000",
    color: "bg-blue-600",
    icon: <Layers />,
  },
  {
    period: "Todas",
    sales: "205000",
    color: "bg-pink-600",
    icon: <Layers />,
  },
];

export const ordenData = [
  {
    title: "Total",
    quantity: "554",
    iconBg: "bg-amber-400",
    icon: <ShoppingCart />,
  },
  {
    title: "Pendientes",
    quantity: "100",
    iconBg: "bg-purple-400",
    icon: <Loader2 />,
  },
  {
    title: "Procesando",
    quantity: "21",
    iconBg: "bg-blue-400",
    icon: <RefreshCcw />,
  },
  {
    title: "Enviadas",
    quantity: "10",
    iconBg: "bg-orange-400",
    icon: <Forward />,
  },
  {
    title: "Entregadas",
    quantity: "38",
    iconBg: "bg-green-400",
    icon: <CheckCheck />,
  },
];

export const salesCharts = {
  labels: ["blusa", "pantalon", "camisa", "abrigo", "medias", "interior"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const labels = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const tabsData = [
  {
    title: "Ventas",
    type: "sales",
    data: {
      labels,
      datasets: [
        {
          label: "Ventas",
          data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    },
  },
  {
    title: "Pedidos",
    type: "orders",
    data: {
      labels,
      datasets: [
        {
          label: "Pedidos",
          data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
          borderColor: "rgb(0, 0, 255)",
          backgroundColor: "rgb(0, 0, 255, 0.5)",
        },
      ],
    },
  },
];

export const orderStatus = {
  delivered: "text-green-500",
  sending: "text-purple-500",
  processing: "text-blue-400",
  pending: "text-orange-500",
  canceled: "text-red-500",
};

export const orders =[
  {
    "orderId": "ORD001",
    "date": "2025-02-14",
    "status": "sending",
    "totalAmount": 460,
    "customer": {
      "firstName": "María",
      "lastName": "González",
      "phone": "09870001321",
      "dni": "000000001",
      "email": "maría.gonzález@example.com"
    },
    "shipping": {
      "firstName": "María",
      "lastName": "González",
      "address": "Calle 1 #2",
      "city": "Guayaquil",
      "province": "Guayas",
      "phone": "09870001321"
    },
    "billing": {
      "firstName": "María",
      "lastName": "González",
      "address": "Calle 1 #2",
      "city": "Guayaquil",
      "province": "Guayas",
      "phone": "09870001321"
    },
    "orders": [
      {
        "productName": "Mouse Logitech MX",
        "category": "Accesorios",
        "price": 80,
        "quantity": 2,
        "totalPrice": 160
      },
      {
        "productName": "Teclado Mecánico Razer",
        "category": "Accesorios",
        "price": 150,
        "quantity": 2,
        "totalPrice": 300
      }
    ]
  },
  {
    "orderId": "ORD002",
    "date": "2025-02-14",
    "status": "delivered",
    "totalAmount": 1350,
    "customer": {
      "firstName": "Pedro",
      "lastName": "Rodríguez",
      "phone": "09870002321",
      "dni": "000000002",
      "email": "pedro.rodríguez@example.com"
    },
    "shipping": {
      "firstName": "Pedro",
      "lastName": "Rodríguez",
      "address": "Calle 2 #4",
      "city": "Cuenca",
      "province": "Azuay",
      "phone": "09870002321"
    },
    "billing": {
      "firstName": "Pedro",
      "lastName": "Rodríguez",
      "address": "Calle 2 #4",
      "city": "Cuenca",
      "province": "Azuay",
      "phone": "09870002321"
    },
    "orders": [
      {
        "productName": "Teclado Mecánico Razer",
        "category": "Accesorios",
        "price": 150,
        "quantity": 3,
        "totalPrice": 450
      },
      {
        "productName": "Monitor LG UltraWide",
        "category": "Electrónica",
        "price": 300,
        "quantity": 3,
        "totalPrice": 900
      }
    ]
  },
  {
    "orderId": "ORD003",
    "date": "2025-02-14",
    "status": "canceled",
    "totalAmount": 650,
    "customer": {
      "firstName": "Ana",
      "lastName": "Fernández",
      "phone": "09870003321",
      "dni": "000000003",
      "email": "ana.fernández@example.com"
    },
    "shipping": {
      "firstName": "Ana",
      "lastName": "Fernández",
      "address": "Calle 3 #6",
      "city": "Ambato",
      "province": "Tungurahua",
      "phone": "09870003321"
    },
    "billing": {
      "firstName": "Ana",
      "lastName": "Fernández",
      "address": "Calle 3 #6",
      "city": "Ambato",
      "province": "Tungurahua",
      "phone": "09870003321"
    },
    "orders": [
      {
        "productName": "Monitor LG UltraWide",
        "category": "Electrónica",
        "price": 300,
        "quantity": 1,
        "totalPrice": 300
      },
      {
        "productName": "Auriculares Sony WH-1000XM4",
        "category": "Audio",
        "price": 350,
        "quantity": 1,
        "totalPrice": 350
      }
    ]
  },
  {
    "orderId": "ORD004",
    "date": "2025-02-14",
    "status": "pending",
    "totalAmount": 2500,
    "customer": {
      "firstName": "Luis",
      "lastName": "López",
      "phone": "09870004321",
      "dni": "000000004",
      "email": "luis.lópez@example.com"
    },
    "shipping": {
      "firstName": "Luis",
      "lastName": "López",
      "address": "Calle 4 #8",
      "city": "Manta",
      "province": "Manabí",
      "phone": "09870004321"
    },
    "billing": {
      "firstName": "Luis",
      "lastName": "López",
      "address": "Calle 4 #8",
      "city": "Manta",
      "province": "Manabí",
      "phone": "09870004321"
    },
    "orders": [
      {
        "productName": "Auriculares Sony WH-1000XM4",
        "category": "Audio",
        "price": 350,
        "quantity": 2,
        "totalPrice": 700
      },
      {
        "productName": "Smartphone Samsung Galaxy S23",
        "category": "Telefonía",
        "price": 900,
        "quantity": 2,
        "totalPrice": 1800
      }
    ]
  },
  {
    "orderId": "ORD005",
    "date": "2025-02-14",
    "status": "sending",
    "totalAmount": 2850,
    "customer": {
      "firstName": "Laura",
      "lastName": "Martínez",
      "phone": "09870005321",
      "dni": "000000005",
      "email": "laura.martínez@example.com"
    },
    "shipping": {
      "firstName": "Laura",
      "lastName": "Martínez",
      "address": "Calle 5 #10",
      "city": "Loja",
      "province": "Loja",
      "phone": "09870005321"
    },
    "billing": {
      "firstName": "Laura",
      "lastName": "Martínez",
      "address": "Calle 5 #10",
      "city": "Loja",
      "province": "Loja",
      "phone": "09870005321"
    },
    "orders": [
      {
        "productName": "Smartphone Samsung Galaxy S23",
        "category": "Telefonía",
        "price": 900,
        "quantity": 3,
        "totalPrice": 2700
      },
      {
        "productName": "Cargador Rápido Samsung",
        "category": "Accesorios",
        "price": 50,
        "quantity": 3,
        "totalPrice": 150
      }
    ]
  },
  {
    "orderId": "ORD006",
    "date": "2025-02-14",
    "status": "delivered",
    "totalAmount": 650,
    "customer": {
      "firstName": "Carlos",
      "lastName": "Díaz",
      "phone": "09870006321",
      "dni": "000000006",
      "email": "carlos.díaz@example.com"
    },
    "shipping": {
      "firstName": "Carlos",
      "lastName": "Díaz",
      "address": "Calle 6 #12",
      "city": "Riobamba",
      "province": "Chimborazo",
      "phone": "09870006321"
    },
    "billing": {
      "firstName": "Carlos",
      "lastName": "Díaz",
      "address": "Calle 6 #12",
      "city": "Riobamba",
      "province": "Chimborazo",
      "phone": "09870006321"
    },
    "orders": [
      {
        "productName": "Cargador Rápido Samsung",
        "category": "Accesorios",
        "price": 50,
        "quantity": 1,
        "totalPrice": 50
      },
      {
        "productName": "Tablet iPad Air",
        "category": "Tablets",
        "price": 600,
        "quantity": 1,
        "totalPrice": 600
      }
    ]
  },
  {
    "orderId": "ORD007",
    "date": "2025-02-14",
    "status": "canceled",
    "totalAmount": 3400,
    "customer": {
      "firstName": "Elena",
      "lastName": "Hernández",
      "phone": "09870007321",
      "dni": "000000007",
      "email": "elena.hernández@example.com"
    },
    "shipping": {
      "firstName": "Elena",
      "lastName": "Hernández",
      "address": "Calle 7 #14",
      "city": "Portoviejo",
      "province": "Manabí",
      "phone": "09870007321"
    },
    "billing": {
      "firstName": "Elena",
      "lastName": "Hernández",
      "address": "Calle 7 #14",
      "city": "Portoviejo",
      "province": "Manabí",
      "phone": "09870007321"
    },
    "orders": [
      {
        "productName": "Tablet iPad Air",
        "category": "Tablets",
        "price": 600,
        "quantity": 2,
        "totalPrice": 1200
      },
      {
        "productName": "Cámara Canon EOS",
        "category": "Fotografía",
        "price": 1100,
        "quantity": 2,
        "totalPrice": 2200
      }
    ]
  },
  {
    "orderId": "ORD008",
    "date": "2025-02-14",
    "status": "pending",
    "totalAmount": 3570,
    "customer": {
      "firstName": "Javier",
      "lastName": "Torres",
      "phone": "09870008321",
      "dni": "000000008",
      "email": "javier.torres@example.com"
    },
    "shipping": {
      "firstName": "Javier",
      "lastName": "Torres",
      "address": "Calle 8 #16",
      "city": "Machala",
      "province": "El Oro",
      "phone": "09870008321"
    },
    "billing": {
      "firstName": "Javier",
      "lastName": "Torres",
      "address": "Calle 8 #16",
      "city": "Machala",
      "province": "El Oro",
      "phone": "09870008321"
    },
    "orders": [
      {
        "productName": "Cámara Canon EOS",
        "category": "Fotografía",
        "price": 1100,
        "quantity": 3,
        "totalPrice": 3300
      },
      {
        "productName": "Disco Duro Externo 2TB",
        "category": "Almacenamiento",
        "price": 90,
        "quantity": 3,
        "totalPrice": 270
      }
    ]
  },
  {
    "orderId": "ORD009",
    "date": "2025-02-14",
    "status": "sending",
    "totalAmount": 1290,
    "customer": {
      "firstName": "Sofía",
      "lastName": "Ramírez",
      "phone": "09870009321",
      "dni": "000000009",
      "email": "sofía.ramírez@example.com"
    },
    "shipping": {
      "firstName": "Sofía",
      "lastName": "Ramírez",
      "address": "Calle 9 #18",
      "city": "Esmeraldas",
      "province": "Esmeraldas",
      "phone": "09870009321"
    },
    "billing": {
      "firstName": "Sofía",
      "lastName": "Ramírez",
      "address": "Calle 9 #18",
      "city": "Esmeraldas",
      "province": "Esmeraldas",
      "phone": "09870009321"
    },
    "orders": [
      {
        "productName": "Disco Duro Externo 2TB",
        "category": "Almacenamiento",
        "price": 90,
        "quantity": 1,
        "totalPrice": 90
      },
      {
        "productName": "Laptop Dell XPS",
        "category": "Electrónica",
        "price": 1200,
        "quantity": 1,
        "totalPrice": 1200
      }
    ]
  },
  {
    "orderId": "ORD010",
    "date": "2025-02-14",
    "status": "processing",
    "totalAmount": 2560,
    "customer": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "phone": "09870010321",
      "dni": "000000010",
      "email": "juan.pérez@example.com"
    },
    "shipping": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "address": "Calle 10 #20",
      "city": "Quito",
      "province": "Pichincha",
      "phone": "09870010321"
    },
    "billing": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "address": "Calle 10 #20",
      "city": "Quito",
      "province": "Pichincha",
      "phone": "09870010321"
    },
    "orders": [
      {
        "productName": "Laptop Dell XPS",
        "category": "Electrónica",
        "price": 1200,
        "quantity": 2,
        "totalPrice": 2400
      },
      {
        "productName": "Mouse Logitech MX",
        "category": "Accesorios",
        "price": 80,
        "quantity": 2,
        "totalPrice": 160
      }
    ]
  },
  {
    "orderId": "ORD011",
    "date": "2025-02-14",
    "status": "canceled",
    "totalAmount": 690,
    "customer": {
      "firstName": "María",
      "lastName": "González",
      "phone": "09870011321",
      "dni": "000000011",
      "email": "maría.gonzález@example.com"
    },
    "shipping": {
      "firstName": "María",
      "lastName": "González",
      "address": "Calle 11 #22",
      "city": "Guayaquil",
      "province": "Guayas",
      "phone": "09870011321"
    },
    "billing": {
      "firstName": "María",
      "lastName": "González",
      "address": "Calle 11 #22",
      "city": "Guayaquil",
      "province": "Guayas",
      "phone": "09870011321"
    },
    "orders": [
      {
        "productName": "Mouse Logitech MX",
        "category": "Accesorios",
        "price": 80,
        "quantity": 3,
        "totalPrice": 240
      },
      {
        "productName": "Teclado Mecánico Razer",
        "category": "Accesorios",
        "price": 150,
        "quantity": 3,
        "totalPrice": 450
      }
    ]
  },
  {
    "orderId": "ORD012",
    "date": "2025-02-14",
    "status": "pending",
    "totalAmount": 450,
    "customer": {
      "firstName": "Pedro",
      "lastName": "Rodríguez",
      "phone": "09870012321",
      "dni": "000000012",
      "email": "pedro.rodríguez@example.com"
    },
    "shipping": {
      "firstName": "Pedro",
      "lastName": "Rodríguez",
      "address": "Calle 12 #24",
      "city": "Cuenca",
      "province": "Azuay",
      "phone": "09870012321"
    },
    "billing": {
      "firstName": "Pedro",
      "lastName": "Rodríguez",
      "address": "Calle 12 #24",
      "city": "Cuenca",
      "province": "Azuay",
      "phone": "09870012321"
    },
    "orders": [
      {
        "productName": "Teclado Mecánico Razer",
        "category": "Accesorios",
        "price": 150,
        "quantity": 1,
        "totalPrice": 150
      },
      {
        "productName": "Monitor LG UltraWide",
        "category": "Electrónica",
        "price": 300,
        "quantity": 1,
        "totalPrice": 300
      }
    ]
  },
  {
    "orderId": "ORD013",
    "date": "2025-02-14",
    "status": "sending",
    "totalAmount": 1300,
    "customer": {
      "firstName": "Ana",
      "lastName": "Fernández",
      "phone": "09870013321",
      "dni": "000000013",
      "email": "ana.fernández@example.com"
    },
    "shipping": {
      "firstName": "Ana",
      "lastName": "Fernández",
      "address": "Calle 13 #26",
      "city": "Ambato",
      "province": "Tungurahua",
      "phone": "09870013321"
    },
    "billing": {
      "firstName": "Ana",
      "lastName": "Fernández",
      "address": "Calle 13 #26",
      "city": "Ambato",
      "province": "Tungurahua",
      "phone": "09870013321"
    },
    "orders": [
      {
        "productName": "Monitor LG UltraWide",
        "category": "Electrónica",
        "price": 300,
        "quantity": 2,
        "totalPrice": 600
      },
      {
        "productName": "Auriculares Sony WH-1000XM4",
        "category": "Audio",
        "price": 350,
        "quantity": 2,
        "totalPrice": 700
      }
    ]
  },
  {
    "orderId": "ORD014",
    "date": "2025-02-14",
    "status": "delivered",
    "totalAmount": 3750,
    "customer": {
      "firstName": "Luis",
      "lastName": "López",
      "phone": "09870014321",
      "dni": "000000014",
      "email": "luis.lópez@example.com"
    },
    "shipping": {
      "firstName": "Luis",
      "lastName": "López",
      "address": "Calle 14 #28",
      "city": "Manta",
      "province": "Manabí",
      "phone": "09870014321"
    },
    "billing": {
      "firstName": "Luis",
      "lastName": "López",
      "address": "Calle 14 #28",
      "city": "Manta",
      "province": "Manabí",
      "phone": "09870014321"
    },
    "orders": [
      {
        "productName": "Auriculares Sony WH-1000XM4",
        "category": "Audio",
        "price": 350,
        "quantity": 3,
        "totalPrice": 1050
      },
      {
        "productName": "Smartphone Samsung Galaxy S23",
        "category": "Telefonía",
        "price": 900,
        "quantity": 3,
        "totalPrice": 2700
      }
    ]
  },
  {
    "orderId": "ORD015",
    "date": "2025-02-14",
    "status": "canceled",
    "totalAmount": 950,
    "customer": {
      "firstName": "Laura",
      "lastName": "Martínez",
      "phone": "09870015321",
      "dni": "000000015",
      "email": "laura.martínez@example.com"
    },
    "shipping": {
      "firstName": "Laura",
      "lastName": "Martínez",
      "address": "Calle 15 #30",
      "city": "Loja",
      "province": "Loja",
      "phone": "09870015321"
    },
    "billing": {
      "firstName": "Laura",
      "lastName": "Martínez",
      "address": "Calle 15 #30",
      "city": "Loja",
      "province": "Loja",
      "phone": "09870015321"
    },
    "orders": [
      {
        "productName": "Smartphone Samsung Galaxy S23",
        "category": "Telefonía",
        "price": 900,
        "quantity": 1,
        "totalPrice": 900
      },
      {
        "productName": "Cargador Rápido Samsung",
        "category": "Accesorios",
        "price": 50,
        "quantity": 1,
        "totalPrice": 50
      }
    ]
  },
  {
    "orderId": "ORD016",
    "date": "2025-02-14",
    "status": "pending",
    "totalAmount": 1300,
    "customer": {
      "firstName": "Carlos",
      "lastName": "Díaz",
      "phone": "09870016321",
      "dni": "000000016",
      "email": "carlos.díaz@example.com"
    },
    "shipping": {
      "firstName": "Carlos",
      "lastName": "Díaz",
      "address": "Calle 16 #32",
      "city": "Riobamba",
      "province": "Chimborazo",
      "phone": "09870016321"
    },
    "billing": {
      "firstName": "Carlos",
      "lastName": "Díaz",
      "address": "Calle 16 #32",
      "city": "Riobamba",
      "province": "Chimborazo",
      "phone": "09870016321"
    },
    "orders": [
      {
        "productName": "Cargador Rápido Samsung",
        "category": "Accesorios",
        "price": 50,
        "quantity": 2,
        "totalPrice": 100
      },
      {
        "productName": "Tablet iPad Air",
        "category": "Tablets",
        "price": 600,
        "quantity": 2,
        "totalPrice": 1200
      }
    ]
  },
  {
    "orderId": "ORD017",
    "date": "2025-02-14",
    "status": "sending",
    "totalAmount": 5100,
    "customer": {
      "firstName": "Elena",
      "lastName": "Hernández",
      "phone": "09870017321",
      "dni": "000000017",
      "email": "elena.hernández@example.com"
    },
    "shipping": {
      "firstName": "Elena",
      "lastName": "Hernández",
      "address": "Calle 17 #34",
      "city": "Portoviejo",
      "province": "Manabí",
      "phone": "09870017321"
    },
    "billing": {
      "firstName": "Elena",
      "lastName": "Hernández",
      "address": "Calle 17 #34",
      "city": "Portoviejo",
      "province": "Manabí",
      "phone": "09870017321"
    },
    "orders": [
      {
        "productName": "Tablet iPad Air",
        "category": "Tablets",
        "price": 600,
        "quantity": 3,
        "totalPrice": 1800
      },
      {
        "productName": "Cámara Canon EOS",
        "category": "Fotografía",
        "price": 1100,
        "quantity": 3,
        "totalPrice": 3300
      }
    ]
  },
  {
    "orderId": "ORD018",
    "date": "2025-02-14",
    "status": "delivered",
    "totalAmount": 1190,
    "customer": {
      "firstName": "Javier",
      "lastName": "Torres",
      "phone": "09870018321",
      "dni": "000000018",
      "email": "javier.torres@example.com"
    },
    "shipping": {
      "firstName": "Javier",
      "lastName": "Torres",
      "address": "Calle 18 #36",
      "city": "Machala",
      "province": "El Oro",
      "phone": "09870018321"
    },
    "billing": {
      "firstName": "Javier",
      "lastName": "Torres",
      "address": "Calle 18 #36",
      "city": "Machala",
      "province": "El Oro",
      "phone": "09870018321"
    },
    "orders": [
      {
        "productName": "Cámara Canon EOS",
        "category": "Fotografía",
        "price": 1100,
        "quantity": 1,
        "totalPrice": 1100
      },
      {
        "productName": "Disco Duro Externo 2TB",
        "category": "Almacenamiento",
        "price": 90,
        "quantity": 1,
        "totalPrice": 90
      }
    ]
  },
  {
    "orderId": "ORD019",
    "date": "2025-02-14",
    "status": "canceled",
    "totalAmount": 2580,
    "customer": {
      "firstName": "Sofía",
      "lastName": "Ramírez",
      "phone": "09870019321",
      "dni": "000000019",
      "email": "sofía.ramírez@example.com"
    },
    "shipping": {
      "firstName": "Sofía",
      "lastName": "Ramírez",
      "address": "Calle 19 #38",
      "city": "Esmeraldas",
      "province": "Esmeraldas",
      "phone": "09870019321"
    },
    "billing": {
      "firstName": "Sofía",
      "lastName": "Ramírez",
      "address": "Calle 19 #38",
      "city": "Esmeraldas",
      "province": "Esmeraldas",
      "phone": "09870019321"
    },
    "orders": [
      {
        "productName": "Disco Duro Externo 2TB",
        "category": "Almacenamiento",
        "price": 90,
        "quantity": 2,
        "totalPrice": 180
      },
      {
        "productName": "Laptop Dell XPS",
        "category": "Electrónica",
        "price": 1200,
        "quantity": 2,
        "totalPrice": 2400
      }
    ]
  },
  {
    "orderId": "ORD020",
    "date": "2025-02-14",
    "status": "pending",
    "totalAmount": 3840,
    "customer": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "phone": "09870020321",
      "dni": "000000020",
      "email": "juan.pérez@example.com"
    },
    "shipping": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "address": "Calle 20 #40",
      "city": "Quito",
      "province": "Pichincha",
      "phone": "09870020321"
    },
    "billing": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "address": "Calle 20 #40",
      "city": "Quito",
      "province": "Pichincha",
      "phone": "09870020321"
    },
    "orders": [
      {
        "productName": "Laptop Dell XPS",
        "category": "Electrónica",
        "price": 1200,
        "quantity": 3,
        "totalPrice": 3600
      },
      {
        "productName": "Mouse Logitech MX",
        "category": "Accesorios",
        "price": 80,
        "quantity": 3,
        "totalPrice": 240
      }
    ]
  },
  {
    "orderId": "ORD021",
    "date": "2025-02-14",
    "status": "sending",
    "totalAmount": 230,
    "customer": {
      "firstName": "María",
      "lastName": "González",
      "phone": "09870021321",
      "dni": "000000021",
      "email": "maría.gonzález@example.com"
    },
    "shipping": {
      "firstName": "María",
      "lastName": "González",
      "address": "Calle 21 #42",
      "city": "Guayaquil",
      "province": "Guayas",
      "phone": "09870021321"
    },
    "billing": {
      "firstName": "María",
      "lastName": "González",
      "address": "Calle 21 #42",
      "city": "Guayaquil",
      "province": "Guayas",
      "phone": "09870021321"
    },
    "orders": [
      {
        "productName": "Mouse Logitech MX",
        "category": "Accesorios",
        "price": 80,
        "quantity": 1,
        "totalPrice": 80
      },
      {
        "productName": "Teclado Mecánico Razer",
        "category": "Accesorios",
        "price": 150,
        "quantity": 1,
        "totalPrice": 150
      }
    ]
  },
  {
    "orderId": "ORD022",
    "date": "2025-02-14",
    "status": "delivered",
    "totalAmount": 900,
    "customer": {
      "firstName": "Pedro",
      "lastName": "Rodríguez",
      "phone": "09870022321",
      "dni": "000000022",
      "email": "pedro.rodríguez@example.com"
    },
    "shipping": {
      "firstName": "Pedro",
      "lastName": "Rodríguez",
      "address": "Calle 22 #44",
      "city": "Cuenca",
      "province": "Azuay",
      "phone": "09870022321"
    },
    "billing": {
      "firstName": "Pedro",
      "lastName": "Rodríguez",
      "address": "Calle 22 #44",
      "city": "Cuenca",
      "province": "Azuay",
      "phone": "09870022321"
    },
    "orders": [
      {
        "productName": "Teclado Mecánico Razer",
        "category": "Accesorios",
        "price": 150,
        "quantity": 2,
        "totalPrice": 300
      },
      {
        "productName": "Monitor LG UltraWide",
        "category": "Electrónica",
        "price": 300,
        "quantity": 2,
        "totalPrice": 600
      }
    ]
  },
  {
    "orderId": "ORD023",
    "date": "2025-02-14",
    "status": "canceled",
    "totalAmount": 1950,
    "customer": {
      "firstName": "Ana",
      "lastName": "Fernández",
      "phone": "09870023321",
      "dni": "000000023",
      "email": "ana.fernández@example.com"
    },
    "shipping": {
      "firstName": "Ana",
      "lastName": "Fernández",
      "address": "Calle 23 #46",
      "city": "Ambato",
      "province": "Tungurahua",
      "phone": "09870023321"
    },
    "billing": {
      "firstName": "Ana",
      "lastName": "Fernández",
      "address": "Calle 23 #46",
      "city": "Ambato",
      "province": "Tungurahua",
      "phone": "09870023321"
    },
    "orders": [
      {
        "productName": "Monitor LG UltraWide",
        "category": "Electrónica",
        "price": 300,
        "quantity": 3,
        "totalPrice": 900
      },
      {
        "productName": "Auriculares Sony WH-1000XM4",
        "category": "Audio",
        "price": 350,
        "quantity": 3,
        "totalPrice": 1050
      }
    ]
  },
  {
    "orderId": "ORD024",
    "date": "2025-02-14",
    "status": "pending",
    "totalAmount": 1250,
    "customer": {
      "firstName": "Luis",
      "lastName": "López",
      "phone": "09870024321",
      "dni": "000000024",
      "email": "luis.lópez@example.com"
    },
    "shipping": {
      "firstName": "Luis",
      "lastName": "López",
      "address": "Calle 24 #48",
      "city": "Manta",
      "province": "Manabí",
      "phone": "09870024321"
    },
    "billing": {
      "firstName": "Luis",
      "lastName": "López",
      "address": "Calle 24 #48",
      "city": "Manta",
      "province": "Manabí",
      "phone": "09870024321"
    },
    "orders": [
      {
        "productName": "Auriculares Sony WH-1000XM4",
        "category": "Audio",
        "price": 350,
        "quantity": 1,
        "totalPrice": 350
      },
      {
        "productName": "Smartphone Samsung Galaxy S23",
        "category": "Telefonía",
        "price": 900,
        "quantity": 1,
        "totalPrice": 900
      }
    ]
  },
  {
    "orderId": "ORD025",
    "date": "2025-02-14",
    "status": "sending",
    "totalAmount": 1900,
    "customer": {
      "firstName": "Laura",
      "lastName": "Martínez",
      "phone": "09870025321",
      "dni": "000000025",
      "email": "laura.martínez@example.com"
    },
    "shipping": {
      "firstName": "Laura",
      "lastName": "Martínez",
      "address": "Calle 25 #50",
      "city": "Loja",
      "province": "Loja",
      "phone": "09870025321"
    },
    "billing": {
      "firstName": "Laura",
      "lastName": "Martínez",
      "address": "Calle 25 #50",
      "city": "Loja",
      "province": "Loja",
      "phone": "09870025321"
    },
    "orders": [
      {
        "productName": "Smartphone Samsung Galaxy S23",
        "category": "Telefonía",
        "price": 900,
        "quantity": 2,
        "totalPrice": 1800
      },
      {
        "productName": "Cargador Rápido Samsung",
        "category": "Accesorios",
        "price": 50,
        "quantity": 2,
        "totalPrice": 100
      }
    ]
  },
  {
    "orderId": "ORD026",
    "date": "2025-02-14",
    "status": "delivered",
    "totalAmount": 1950,
    "customer": {
      "firstName": "Carlos",
      "lastName": "Díaz",
      "phone": "09870026321",
      "dni": "000000026",
      "email": "carlos.díaz@example.com"
    },
    "shipping": {
      "firstName": "Carlos",
      "lastName": "Díaz",
      "address": "Calle 26 #52",
      "city": "Riobamba",
      "province": "Chimborazo",
      "phone": "09870026321"
    },
    "billing": {
      "firstName": "Carlos",
      "lastName": "Díaz",
      "address": "Calle 26 #52",
      "city": "Riobamba",
      "province": "Chimborazo",
      "phone": "09870026321"
    },
    "orders": [
      {
        "productName": "Cargador Rápido Samsung",
        "category": "Accesorios",
        "price": 50,
        "quantity": 3,
        "totalPrice": 150
      },
      {
        "productName": "Tablet iPad Air",
        "category": "Tablets",
        "price": 600,
        "quantity": 3,
        "totalPrice": 1800
      }
    ]
  },
  {
    "orderId": "ORD027",
    "date": "2025-02-14",
    "status": "canceled",
    "totalAmount": 1700,
    "customer": {
      "firstName": "Elena",
      "lastName": "Hernández",
      "phone": "09870027321",
      "dni": "000000027",
      "email": "elena.hernández@example.com"
    },
    "shipping": {
      "firstName": "Elena",
      "lastName": "Hernández",
      "address": "Calle 27 #54",
      "city": "Portoviejo",
      "province": "Manabí",
      "phone": "09870027321"
    },
    "billing": {
      "firstName": "Elena",
      "lastName": "Hernández",
      "address": "Calle 27 #54",
      "city": "Portoviejo",
      "province": "Manabí",
      "phone": "09870027321"
    },
    "orders": [
      {
        "productName": "Tablet iPad Air",
        "category": "Tablets",
        "price": 600,
        "quantity": 1,
        "totalPrice": 600
      },
      {
        "productName": "Cámara Canon EOS",
        "category": "Fotografía",
        "price": 1100,
        "quantity": 1,
        "totalPrice": 1100
      }
    ]
  },
  {
    "orderId": "ORD028",
    "date": "2025-02-14",
    "status": "pending",
    "totalAmount": 2380,
    "customer": {
      "firstName": "Javier",
      "lastName": "Torres",
      "phone": "09870028321",
      "dni": "000000028",
      "email": "javier.torres@example.com"
    },
    "shipping": {
      "firstName": "Javier",
      "lastName": "Torres",
      "address": "Calle 28 #56",
      "city": "Machala",
      "province": "El Oro",
      "phone": "09870028321"
    },
    "billing": {
      "firstName": "Javier",
      "lastName": "Torres",
      "address": "Calle 28 #56",
      "city": "Machala",
      "province": "El Oro",
      "phone": "09870028321"
    },
    "orders": [
      {
        "productName": "Cámara Canon EOS",
        "category": "Fotografía",
        "price": 1100,
        "quantity": 2,
        "totalPrice": 2200
      },
      {
        "productName": "Disco Duro Externo 2TB",
        "category": "Almacenamiento",
        "price": 90,
        "quantity": 2,
        "totalPrice": 180
      }
    ]
  },
  {
    "orderId": "ORD029",
    "date": "2025-02-14",
    "status": "sending",
    "totalAmount": 3870,
    "customer": {
      "firstName": "Sofía",
      "lastName": "Ramírez",
      "phone": "09870029321",
      "dni": "000000029",
      "email": "sofía.ramírez@example.com"
    },
    "shipping": {
      "firstName": "Sofía",
      "lastName": "Ramírez",
      "address": "Calle 29 #58",
      "city": "Esmeraldas",
      "province": "Esmeraldas",
      "phone": "09870029321"
    },
    "billing": {
      "firstName": "Sofía",
      "lastName": "Ramírez",
      "address": "Calle 29 #58",
      "city": "Esmeraldas",
      "province": "Esmeraldas",
      "phone": "09870029321"
    },
    "orders": [
      {
        "productName": "Disco Duro Externo 2TB",
        "category": "Almacenamiento",
        "price": 90,
        "quantity": 3,
        "totalPrice": 270
      },
      {
        "productName": "Laptop Dell XPS",
        "category": "Electrónica",
        "price": 1200,
        "quantity": 3,
        "totalPrice": 3600
      }
    ]
  },
  {
    "orderId": "ORD030",
    "date": "2025-02-14",
    "status": "delivered",
    "totalAmount": 1280,
    "customer": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "phone": "09870030321",
      "dni": "000000030",
      "email": "juan.pérez@example.com"
    },
    "shipping": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "address": "Calle 30 #60",
      "city": "Quito",
      "province": "Pichincha",
      "phone": "09870030321"
    },
    "billing": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "address": "Calle 30 #60",
      "city": "Quito",
      "province": "Pichincha",
      "phone": "09870030321"
    },
    "orders": [
      {
        "productName": "Laptop Dell XPS",
        "category": "Electrónica",
        "price": 1200,
        "quantity": 1,
        "totalPrice": 1200
      },
      {
        "productName": "Mouse Logitech MX",
        "category": "Accesorios",
        "price": 80,
        "quantity": 1,
        "totalPrice": 80
      }
    ]
  },
  {
    "orderId": "ORD031",
    "date": "2025-02-14",
    "status": "canceled",
    "totalAmount": 460,
    "customer": {
      "firstName": "María",
      "lastName": "González",
      "phone": "09870031321",
      "dni": "000000031",
      "email": "maría.gonzález@example.com"
    },
    "shipping": {
      "firstName": "María",
      "lastName": "González",
      "address": "Calle 31 #62",
      "city": "Guayaquil",
      "province": "Guayas",
      "phone": "09870031321"
    },
    "billing": {
      "firstName": "María",
      "lastName": "González",
      "address": "Calle 31 #62",
      "city": "Guayaquil",
      "province": "Guayas",
      "phone": "09870031321"
    },
    "orders": [
      {
        "productName": "Mouse Logitech MX",
        "category": "Accesorios",
        "price": 80,
        "quantity": 2,
        "totalPrice": 160
      },
      {
        "productName": "Teclado Mecánico Razer",
        "category": "Accesorios",
        "price": 150,
        "quantity": 2,
        "totalPrice": 300
      }
    ]
  },
  {
    "orderId": "ORD032",
    "date": "2025-02-14",
    "status": "pending",
    "totalAmount": 1350,
    "customer": {
      "firstName": "Pedro",
      "lastName": "Rodríguez",
      "phone": "09870032321",
      "dni": "000000032",
      "email": "pedro.rodríguez@example.com"
    },
    "shipping": {
      "firstName": "Pedro",
      "lastName": "Rodríguez",
      "address": "Calle 32 #64",
      "city": "Cuenca",
      "province": "Azuay",
      "phone": "09870032321"
    },
    "billing": {
      "firstName": "Pedro",
      "lastName": "Rodríguez",
      "address": "Calle 32 #64",
      "city": "Cuenca",
      "province": "Azuay",
      "phone": "09870032321"
    },
    "orders": [
      {
        "productName": "Teclado Mecánico Razer",
        "category": "Accesorios",
        "price": 150,
        "quantity": 3,
        "totalPrice": 450
      },
      {
        "productName": "Monitor LG UltraWide",
        "category": "Electrónica",
        "price": 300,
        "quantity": 3,
        "totalPrice": 900
      }
    ]
  },
  {
    "orderId": "ORD033",
    "date": "2025-02-14",
    "status": "sending",
    "totalAmount": 650,
    "customer": {
      "firstName": "Ana",
      "lastName": "Fernández",
      "phone": "09870033321",
      "dni": "000000033",
      "email": "ana.fernández@example.com"
    },
    "shipping": {
      "firstName": "Ana",
      "lastName": "Fernández",
      "address": "Calle 33 #66",
      "city": "Ambato",
      "province": "Tungurahua",
      "phone": "09870033321"
    },
    "billing": {
      "firstName": "Ana",
      "lastName": "Fernández",
      "address": "Calle 33 #66",
      "city": "Ambato",
      "province": "Tungurahua",
      "phone": "09870033321"
    },
    "orders": [
      {
        "productName": "Monitor LG UltraWide",
        "category": "Electrónica",
        "price": 300,
        "quantity": 1,
        "totalPrice": 300
      },
      {
        "productName": "Auriculares Sony WH-1000XM4",
        "category": "Audio",
        "price": 350,
        "quantity": 1,
        "totalPrice": 350
      }
    ]
  },
  {
    "orderId": "ORD034",
    "date": "2025-02-14",
    "status": "delivered",
    "totalAmount": 2500,
    "customer": {
      "firstName": "Luis",
      "lastName": "López",
      "phone": "09870034321",
      "dni": "000000034",
      "email": "luis.lópez@example.com"
    },
    "shipping": {
      "firstName": "Luis",
      "lastName": "López",
      "address": "Calle 34 #68",
      "city": "Manta",
      "province": "Manabí",
      "phone": "09870034321"
    },
    "billing": {
      "firstName": "Luis",
      "lastName": "López",
      "address": "Calle 34 #68",
      "city": "Manta",
      "province": "Manabí",
      "phone": "09870034321"
    },
    "orders": [
      {
        "productName": "Auriculares Sony WH-1000XM4",
        "category": "Audio",
        "price": 350,
        "quantity": 2,
        "totalPrice": 700
      },
      {
        "productName": "Smartphone Samsung Galaxy S23",
        "category": "Telefonía",
        "price": 900,
        "quantity": 2,
        "totalPrice": 1800
      }
    ]
  },
  {
    "orderId": "ORD035",
    "date": "2025-02-14",
    "status": "canceled",
    "totalAmount": 2850,
    "customer": {
      "firstName": "Laura",
      "lastName": "Martínez",
      "phone": "09870035321",
      "dni": "000000035",
      "email": "laura.martínez@example.com"
    },
    "shipping": {
      "firstName": "Laura",
      "lastName": "Martínez",
      "address": "Calle 35 #70",
      "city": "Loja",
      "province": "Loja",
      "phone": "09870035321"
    },
    "billing": {
      "firstName": "Laura",
      "lastName": "Martínez",
      "address": "Calle 35 #70",
      "city": "Loja",
      "province": "Loja",
      "phone": "09870035321"
    },
    "orders": [
      {
        "productName": "Smartphone Samsung Galaxy S23",
        "category": "Telefonía",
        "price": 900,
        "quantity": 3,
        "totalPrice": 2700
      },
      {
        "productName": "Cargador Rápido Samsung",
        "category": "Accesorios",
        "price": 50,
        "quantity": 3,
        "totalPrice": 150
      }
    ]
  },
  {
    "orderId": "ORD036",
    "date": "2025-02-14",
    "status": "pending",
    "totalAmount": 650,
    "customer": {
      "firstName": "Carlos",
      "lastName": "Díaz",
      "phone": "09870036321",
      "dni": "000000036",
      "email": "carlos.díaz@example.com"
    },
    "shipping": {
      "firstName": "Carlos",
      "lastName": "Díaz",
      "address": "Calle 36 #72",
      "city": "Riobamba",
      "province": "Chimborazo",
      "phone": "09870036321"
    },
    "billing": {
      "firstName": "Carlos",
      "lastName": "Díaz",
      "address": "Calle 36 #72",
      "city": "Riobamba",
      "province": "Chimborazo",
      "phone": "09870036321"
    },
    "orders": [
      {
        "productName": "Cargador Rápido Samsung",
        "category": "Accesorios",
        "price": 50,
        "quantity": 1,
        "totalPrice": 50
      },
      {
        "productName": "Tablet iPad Air",
        "category": "Tablets",
        "price": 600,
        "quantity": 1,
        "totalPrice": 600
      }
    ]
  },
  {
    "orderId": "ORD037",
    "date": "2025-02-14",
    "status": "sending",
    "totalAmount": 3400,
    "customer": {
      "firstName": "Elena",
      "lastName": "Hernández",
      "phone": "09870037321",
      "dni": "000000037",
      "email": "elena.hernández@example.com"
    },
    "shipping": {
      "firstName": "Elena",
      "lastName": "Hernández",
      "address": "Calle 37 #74",
      "city": "Portoviejo",
      "province": "Manabí",
      "phone": "09870037321"
    },
    "billing": {
      "firstName": "Elena",
      "lastName": "Hernández",
      "address": "Calle 37 #74",
      "city": "Portoviejo",
      "province": "Manabí",
      "phone": "09870037321"
    },
    "orders": [
      {
        "productName": "Tablet iPad Air",
        "category": "Tablets",
        "price": 600,
        "quantity": 2,
        "totalPrice": 1200
      },
      {
        "productName": "Cámara Canon EOS",
        "category": "Fotografía",
        "price": 1100,
        "quantity": 2,
        "totalPrice": 2200
      }
    ]
  },
  {
    "orderId": "ORD038",
    "date": "2025-02-14",
    "status": "delivered",
    "totalAmount": 3570,
    "customer": {
      "firstName": "Javier",
      "lastName": "Torres",
      "phone": "09870038321",
      "dni": "000000038",
      "email": "javier.torres@example.com"
    },
    "shipping": {
      "firstName": "Javier",
      "lastName": "Torres",
      "address": "Calle 38 #76",
      "city": "Machala",
      "province": "El Oro",
      "phone": "09870038321"
    },
    "billing": {
      "firstName": "Javier",
      "lastName": "Torres",
      "address": "Calle 38 #76",
      "city": "Machala",
      "province": "El Oro",
      "phone": "09870038321"
    },
    "orders": [
      {
        "productName": "Cámara Canon EOS",
        "category": "Fotografía",
        "price": 1100,
        "quantity": 3,
        "totalPrice": 3300
      },
      {
        "productName": "Disco Duro Externo 2TB",
        "category": "Almacenamiento",
        "price": 90,
        "quantity": 3,
        "totalPrice": 270
      }
    ]
  },
  {
    "orderId": "ORD039",
    "date": "2025-02-14",
    "status": "canceled",
    "totalAmount": 1290,
    "customer": {
      "firstName": "Sofía",
      "lastName": "Ramírez",
      "phone": "09870039321",
      "dni": "000000039",
      "email": "sofía.ramírez@example.com"
    },
    "shipping": {
      "firstName": "Sofía",
      "lastName": "Ramírez",
      "address": "Calle 39 #78",
      "city": "Esmeraldas",
      "province": "Esmeraldas",
      "phone": "09870039321"
    },
    "billing": {
      "firstName": "Sofía",
      "lastName": "Ramírez",
      "address": "Calle 39 #78",
      "city": "Esmeraldas",
      "province": "Esmeraldas",
      "phone": "09870039321"
    },
    "orders": [
      {
        "productName": "Disco Duro Externo 2TB",
        "category": "Almacenamiento",
        "price": 90,
        "quantity": 1,
        "totalPrice": 90
      },
      {
        "productName": "Laptop Dell XPS",
        "category": "Electrónica",
        "price": 1200,
        "quantity": 1,
        "totalPrice": 1200
      }
    ]
  },
  {
    "orderId": "ORD040",
    "date": "2025-02-14",
    "status": "pending",
    "totalAmount": 2560,
    "customer": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "phone": "09870040321",
      "dni": "000000040",
      "email": "juan.pérez@example.com"
    },
    "shipping": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "address": "Calle 40 #80",
      "city": "Quito",
      "province": "Pichincha",
      "phone": "09870040321"
    },
    "billing": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "address": "Calle 40 #80",
      "city": "Quito",
      "province": "Pichincha",
      "phone": "09870040321"
    },
    "orders": [
      {
        "productName": "Laptop Dell XPS",
        "category": "Electrónica",
        "price": 1200,
        "quantity": 2,
        "totalPrice": 2400
      },
      {
        "productName": "Mouse Logitech MX",
        "category": "Accesorios",
        "price": 80,
        "quantity": 2,
        "totalPrice": 160
      }
    ]
  },
  {
    "orderId": "ORD041",
    "date": "2025-02-14",
    "status": "sending",
    "totalAmount": 690,
    "customer": {
      "firstName": "María",
      "lastName": "González",
      "phone": "09870041321",
      "dni": "000000041",
      "email": "maría.gonzález@example.com"
    },
    "shipping": {
      "firstName": "María",
      "lastName": "González",
      "address": "Calle 41 #82",
      "city": "Guayaquil",
      "province": "Guayas",
      "phone": "09870041321"
    },
    "billing": {
      "firstName": "María",
      "lastName": "González",
      "address": "Calle 41 #82",
      "city": "Guayaquil",
      "province": "Guayas",
      "phone": "09870041321"
    },
    "orders": [
      {
        "productName": "Mouse Logitech MX",
        "category": "Accesorios",
        "price": 80,
        "quantity": 3,
        "totalPrice": 240
      },
      {
        "productName": "Teclado Mecánico Razer",
        "category": "Accesorios",
        "price": 150,
        "quantity": 3,
        "totalPrice": 450
      }
    ]
  },
  {
    "orderId": "ORD042",
    "date": "2025-02-14",
    "status": "delivered",
    "totalAmount": 450,
    "customer": {
      "firstName": "Pedro",
      "lastName": "Rodríguez",
      "phone": "09870042321",
      "dni": "000000042",
      "email": "pedro.rodríguez@example.com"
    },
    "shipping": {
      "firstName": "Pedro",
      "lastName": "Rodríguez",
      "address": "Calle 42 #84",
      "city": "Cuenca",
      "province": "Azuay",
      "phone": "09870042321"
    },
    "billing": {
      "firstName": "Pedro",
      "lastName": "Rodríguez",
      "address": "Calle 42 #84",
      "city": "Cuenca",
      "province": "Azuay",
      "phone": "09870042321"
    },
    "orders": [
      {
        "productName": "Teclado Mecánico Razer",
        "category": "Accesorios",
        "price": 150,
        "quantity": 1,
        "totalPrice": 150
      },
      {
        "productName": "Monitor LG UltraWide",
        "category": "Electrónica",
        "price": 300,
        "quantity": 1,
        "totalPrice": 300
      }
    ]
  },
  {
    "orderId": "ORD043",
    "date": "2025-02-14",
    "status": "canceled",
    "totalAmount": 1300,
    "customer": {
      "firstName": "Ana",
      "lastName": "Fernández",
      "phone": "09870043321",
      "dni": "000000043",
      "email": "ana.fernández@example.com"
    },
    "shipping": {
      "firstName": "Ana",
      "lastName": "Fernández",
      "address": "Calle 43 #86",
      "city": "Ambato",
      "province": "Tungurahua",
      "phone": "09870043321"
    },
    "billing": {
      "firstName": "Ana",
      "lastName": "Fernández",
      "address": "Calle 43 #86",
      "city": "Ambato",
      "province": "Tungurahua",
      "phone": "09870043321"
    },
    "orders": [
      {
        "productName": "Monitor LG UltraWide",
        "category": "Electrónica",
        "price": 300,
        "quantity": 2,
        "totalPrice": 600
      },
      {
        "productName": "Auriculares Sony WH-1000XM4",
        "category": "Audio",
        "price": 350,
        "quantity": 2,
        "totalPrice": 700
      }
    ]
  },
  {
    "orderId": "ORD044",
    "date": "2025-02-14",
    "status": "pending",
    "totalAmount": 3750,
    "customer": {
      "firstName": "Luis",
      "lastName": "López",
      "phone": "09870044321",
      "dni": "000000044",
      "email": "luis.lópez@example.com"
    },
    "shipping": {
      "firstName": "Luis",
      "lastName": "López",
      "address": "Calle 44 #88",
      "city": "Manta",
      "province": "Manabí",
      "phone": "09870044321"
    },
    "billing": {
      "firstName": "Luis",
      "lastName": "López",
      "address": "Calle 44 #88",
      "city": "Manta",
      "province": "Manabí",
      "phone": "09870044321"
    },
    "orders": [
      {
        "productName": "Auriculares Sony WH-1000XM4",
        "category": "Audio",
        "price": 350,
        "quantity": 3,
        "totalPrice": 1050
      },
      {
        "productName": "Smartphone Samsung Galaxy S23",
        "category": "Telefonía",
        "price": 900,
        "quantity": 3,
        "totalPrice": 2700
      }
    ]
  },
  {
    "orderId": "ORD045",
    "date": "2025-02-14",
    "status": "sending",
    "totalAmount": 950,
    "customer": {
      "firstName": "Laura",
      "lastName": "Martínez",
      "phone": "09870045321",
      "dni": "000000045",
      "email": "laura.martínez@example.com"
    },
    "shipping": {
      "firstName": "Laura",
      "lastName": "Martínez",
      "address": "Calle 45 #90",
      "city": "Loja",
      "province": "Loja",
      "phone": "09870045321"
    },
    "billing": {
      "firstName": "Laura",
      "lastName": "Martínez",
      "address": "Calle 45 #90",
      "city": "Loja",
      "province": "Loja",
      "phone": "09870045321"
    },
    "orders": [
      {
        "productName": "Smartphone Samsung Galaxy S23",
        "category": "Telefonía",
        "price": 900,
        "quantity": 1,
        "totalPrice": 900
      },
      {
        "productName": "Cargador Rápido Samsung",
        "category": "Accesorios",
        "price": 50,
        "quantity": 1,
        "totalPrice": 50
      }
    ]
  },
  {
    "orderId": "ORD046",
    "date": "2025-02-14",
    "status": "delivered",
    "totalAmount": 1300,
    "customer": {
      "firstName": "Carlos",
      "lastName": "Díaz",
      "phone": "09870046321",
      "dni": "000000046",
      "email": "carlos.díaz@example.com"
    },
    "shipping": {
      "firstName": "Carlos",
      "lastName": "Díaz",
      "address": "Calle 46 #92",
      "city": "Riobamba",
      "province": "Chimborazo",
      "phone": "09870046321"
    },
    "billing": {
      "firstName": "Carlos",
      "lastName": "Díaz",
      "address": "Calle 46 #92",
      "city": "Riobamba",
      "province": "Chimborazo",
      "phone": "09870046321"
    },
    "orders": [
      {
        "productName": "Cargador Rápido Samsung",
        "category": "Accesorios",
        "price": 50,
        "quantity": 2,
        "totalPrice": 100
      },
      {
        "productName": "Tablet iPad Air",
        "category": "Tablets",
        "price": 600,
        "quantity": 2,
        "totalPrice": 1200
      }
    ]
  },
  {
    "orderId": "ORD047",
    "date": "2025-02-14",
    "status": "canceled",
    "totalAmount": 5100,
    "customer": {
      "firstName": "Elena",
      "lastName": "Hernández",
      "phone": "09870047321",
      "dni": "000000047",
      "email": "elena.hernández@example.com"
    },
    "shipping": {
      "firstName": "Elena",
      "lastName": "Hernández",
      "address": "Calle 47 #94",
      "city": "Portoviejo",
      "province": "Manabí",
      "phone": "09870047321"
    },
    "billing": {
      "firstName": "Elena",
      "lastName": "Hernández",
      "address": "Calle 47 #94",
      "city": "Portoviejo",
      "province": "Manabí",
      "phone": "09870047321"
    },
    "orders": [
      {
        "productName": "Tablet iPad Air",
        "category": "Tablets",
        "price": 600,
        "quantity": 3,
        "totalPrice": 1800
      },
      {
        "productName": "Cámara Canon EOS",
        "category": "Fotografía",
        "price": 1100,
        "quantity": 3,
        "totalPrice": 3300
      }
    ]
  },
  {
    "orderId": "ORD048",
    "date": "2025-02-14",
    "status": "pending",
    "totalAmount": 1190,
    "customer": {
      "firstName": "Javier",
      "lastName": "Torres",
      "phone": "09870048321",
      "dni": "000000048",
      "email": "javier.torres@example.com"
    },
    "shipping": {
      "firstName": "Javier",
      "lastName": "Torres",
      "address": "Calle 48 #96",
      "city": "Machala",
      "province": "El Oro",
      "phone": "09870048321"
    },
    "billing": {
      "firstName": "Javier",
      "lastName": "Torres",
      "address": "Calle 48 #96",
      "city": "Machala",
      "province": "El Oro",
      "phone": "09870048321"
    },
    "orders": [
      {
        "productName": "Cámara Canon EOS",
        "category": "Fotografía",
        "price": 1100,
        "quantity": 1,
        "totalPrice": 1100
      },
      {
        "productName": "Disco Duro Externo 2TB",
        "category": "Almacenamiento",
        "price": 90,
        "quantity": 1,
        "totalPrice": 90
      }
    ]
  },
  {
    "orderId": "ORD049",
    "date": "2025-02-14",
    "status": "sending",
    "totalAmount": 2580,
    "customer": {
      "firstName": "Sofía",
      "lastName": "Ramírez",
      "phone": "09870049321",
      "dni": "000000049",
      "email": "sofía.ramírez@example.com"
    },
    "shipping": {
      "firstName": "Sofía",
      "lastName": "Ramírez",
      "address": "Calle 49 #98",
      "city": "Esmeraldas",
      "province": "Esmeraldas",
      "phone": "09870049321"
    },
    "billing": {
      "firstName": "Sofía",
      "lastName": "Ramírez",
      "address": "Calle 49 #98",
      "city": "Esmeraldas",
      "province": "Esmeraldas",
      "phone": "09870049321"
    },
    "orders": [
      {
        "productName": "Disco Duro Externo 2TB",
        "category": "Almacenamiento",
        "price": 90,
        "quantity": 2,
        "totalPrice": 180
      },
      {
        "productName": "Laptop Dell XPS",
        "category": "Electrónica",
        "price": 1200,
        "quantity": 2,
        "totalPrice": 2400
      }
    ]
  },
  {
    "orderId": "ORD050",
    "date": "2025-02-14",
    "status": "delivered",
    "totalAmount": 3840,
    "customer": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "phone": "09870050321",
      "dni": "000000050",
      "email": "juan.pérez@example.com"
    },
    "shipping": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "address": "Calle 50 #100",
      "city": "Quito",
      "province": "Pichincha",
      "phone": "09870050321"
    },
    "billing": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "address": "Calle 50 #100",
      "city": "Quito",
      "province": "Pichincha",
      "phone": "09870050321"
    },
    "orders": [
      {
        "productName": "Laptop Dell XPS",
        "category": "Electrónica",
        "price": 1200,
        "quantity": 3,
        "totalPrice": 3600
      },
      {
        "productName": "Mouse Logitech MX",
        "category": "Accesorios",
        "price": 80,
        "quantity": 3,
        "totalPrice": 240
      }
    ]
  }
]