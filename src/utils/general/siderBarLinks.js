import {
    LayoutGrid,
    Slack,
    Users,
    Warehouse,
    Truck,
    User,
    Settings,
    Unplug,
    Boxes,
    LayoutList,
    SendToBack,
    ScanSearch,
    MonitorPlay,
  } from "lucide-react";

export const sideBarLinks = [
    { name: "Panel", icon: <LayoutGrid />, href: "/dashboard" },
    { name: "catalogo", icon: <Slack />, href: "#" },
    { name: "Clientes", icon: <Users />, href: "/dashboard/customers" },
    { name: "Mercados", icon: <Warehouse />, href: "/dashboard/markets" },
    { name: "Ordenes", icon: <Truck />, href: "/dashboard/orders"  },
    { name: "Personal", icon: <User />, href: "/dashboard/staff" },
    { name: "Configuración", icon: <Settings />, href: "#" },
    { name: "Tienda en línea", icon: <Unplug />, href: "#" },
  ];
export const cataloqueLinks = [
    { name: "productos", icon: Boxes, href: "/dashboard/products" },
    { name: "categorias", icon: LayoutList, href: "/dashboard/categories" },
    { name: "Cupones", icon: ScanSearch , href: "/dashboard/coupons"  },
    { name: "Tienda", icon: MonitorPlay , href: "/dashboard/store"  },
  ];