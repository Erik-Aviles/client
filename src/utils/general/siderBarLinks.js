import {
  LayoutGrid,
  Slack,
  Warehouse,
  Truck,
  User,
  Settings,
  Unplug,
  Boxes,
  LayoutList,
  ScanSearch,
  MonitorPlay,
  UserSquare2,
  Users2,
} from "lucide-react";

export const sideBarLinks = [
  { name: "panel", icon: <LayoutGrid />, href: "/dashboard" },
  { name: "catalogo", icon: <Slack />, href: "#" },
  { name: "clientes", icon: <Users2 />, href: "/dashboard/customers" },
  { name: "proveedores", icon: <UserSquare2 />, href: "/dashboard/suppliers" },
  { name: "mercados", icon: <Warehouse />, href: "/dashboard/markets" },
  { name: "ordenes", icon: <Truck />, href: "/dashboard/orders" },
  { name: "personal", icon: <User />, href: "/dashboard/staff" },
  { name: "Capacitación", icon: <User />, href: "/dashboard/training" },
  { name: "configuración", icon: <Settings />, href: "#" },
  { name: "tienda en línea", icon: <Unplug />, href: "#" },
];
export const catalogueLinks = [
  { name: "productos", icon: Boxes, href: "/dashboard/products" },
  { name: "categorias", icon: LayoutList, href: "/dashboard/categories" },
  { name: "cupones", icon: ScanSearch, href: "/dashboard/coupons" },
  { name: "banners", icon: MonitorPlay, href: "/dashboard/banners" },
];
