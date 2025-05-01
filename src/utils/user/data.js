export const userData = [
  {
    id: "64b9f0c2e3d2a7f8b6a1d4e9",
    name: "Betimes Company",
    username: "betcom92",
    email: "juan.perez@example.com",
    phone: "+34 612 345 678",
    avatar: "https://example.com/avatar.jpg",
    role: "admin",
    status: "active",
    createdAt: "2024-02-14T10:30:00Z",
    updatedAt: "2024-02-14T12:45:00Z",
    lastLogin: "2024-02-14T11:00:00Z",
    settings: {
      theme: "dark",
      notifications: true,
      language: "es",
    },
    permissions: {
      canEdit: true,
      canDelete: true,
      canViewReports: true,
    },
    address: {
      street: "Calle Mayor 123",
      city: "Madrid",
      postalCode: "28001",
      country: "España",
    },
    security: {
      twoFactorEnabled: true,
      recoveryCodes: ["abc123", "def456", "ghi789"],
    },
    subscription: {
      plan: "premium",
      expiresAt: "2025-02-14T00:00:00Z",
      autoRenew: true,
    },
    metadata: {
      notes: "Cliente VIP",
      tags: ["e-commerce", "frequent buyer"],
    },
  },
];
