import {
  Warehouse,
  Presentation,
  UserRoundPen,
  Settings,
  Unplug,
  ScanSearch,
  MonitorPlay,
  LayoutDashboard,
  Package,
  Tags,
  ClipboardList,
  Users,
  Truck,
  BookOpenText,
  IdCard,
  UserRound,
  UsersRound,
} from "lucide-react";

export const catalogueLinks = [
  {
    key: "productos",
    name: "productos",
    href: "/dashboard/products",
    icon: Package,
    roles: ["ADMIN", "SUPPLIER"],
  },
  {
    key: "categorias",
    name: "categorias",
    href: "/dashboard/categories",
    icon: Tags,
    roles: ["ADMIN"],
  },
  {
    key: "cupones",
    name: "cupones",
    href: "/dashboard/coupons",
    icon: ScanSearch,
    roles: ["ADMIN", "SUPPLIER"],
  },
  {
    key: "banners",
    name: "banners",
    href: "/dashboard/banners",
    icon: MonitorPlay,
    roles: ["ADMIN"],
  },
];

export const usersLinks = [
  {
    key: "clientes",
    name: "clientes",
    href: "/dashboard/customers",
    icon: UsersRound,
    roles: ["ADMIN", "MODERADOR"],
  },
  {
    key: "usuarios",
    name: "usuarios",
    href: "/dashboard/users",
    icon: UserRound,
    roles: ["ADMIN", "MODERADOR"],
  },
  {
    key: "proveedores",
    name: "proveedores",
    href: "/dashboard/suppliers",
    icon: Truck,
    roles: ["ADMIN", "MODERADOR"],
  },
  {
    key: "personal",
    name: "personal",
    href: "/dashboard/staff",
    icon: IdCard,
    roles: ["ADMIN"],
  },
];

export const sideBarLinks = [
  {
    key: "panel",
    name: "panel",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["ADMIN", "SUPPLIER", "MODERADOR", "USER"],
  },
  {
    key: "catalogo",
    name: "catalogo",
    icon: BookOpenText,
    roles: ["ADMIN", "SUPPLIER", "MODERADOR"],
    children: catalogueLinks,
  },
  {
    key: "usuarios",
    name: "usuarios",
    icon: Users,
    roles: ["ADMIN"],
    children: usersLinks,
  },
  {
    key: "mercados",
    name: "mercados",
    href: "/dashboard/markets",
    icon: Warehouse,
    roles: ["ADMIN", "SUPPLIER"],
  },
  {
    key: "ordenes",
    name: "Mis pedidos",
    href: "/dashboard/orders",
    icon: ClipboardList,
    roles: ["USER"],
  },
  {
    key: "ordenes-admin",
    name: "Ordenes",
    href: "/dashboard/orders-admin",
    icon: ClipboardList,
    roles: ["ADMIN", "MODERADOR"],
  },
  {
    key: "sales",
    name: "ventas",
    href: "/dashboard/sales",
    icon: ClipboardList,
    roles: ["ADMIN", "SUPPLIER", "MODERADOR"],
  },
  {
    key: "capacitacion",
    name: "Capacitación",
    href: "/dashboard/trainings",
    icon: Presentation,
    roles: ["ADMIN", "SUPPLIER", "MODERADOR"],
  },
  {
    key: "perfil",
    name: "Mi perfil",
    href: "/dashboard/profile",
    icon: UserRoundPen,
    roles: ["ADMIN", "SUPPLIER", "MODERADOR", "USER"],
  },
  {
    key: "configuracion",
    name: "configuración",
    href: "/dashboard/settings",
    icon: Settings,
    roles: ["ADMIN", "SUPPLIER"],
  },
  {
    key: "tienda",
    name: "tienda en línea",
    href: "/",
    icon: Unplug,
    roles: ["ADMIN", "SUPPLIER", "USER", "MODERADOR"],
  },
];

/**
 * Filtra enlaces según el rol del usuario
 */
export function filterLinksByRole(links, role) {
  return links
    .map((link) => {
      // Filtramos los hijos si existen
      if (link.children) {
        const filteredChildren = filterLinksByRole(link.children, role);
        // Solo devolvemos el padre si tiene hijos visibles
        return filteredChildren.length > 0 && link.roles.includes(role)
          ? { ...link, children: filteredChildren }
          : null;
      }

      // Si no tiene hijos, lo filtramos por roles
      return link.roles.includes(role) ? link : null;
    })
    .filter(Boolean); // Eliminamos los null
}
