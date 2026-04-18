export const mockUsers = [
  {
    id: "1",
    name: "المدير العام",
    username: "superadmin",
    password: "1234",
    role: "superadmin" as const,
    sector: null,
  },
  {
    id: "2",
    name: "مدير الرياضة",
    username: "sports",
    password: "1234",
    role: "admin" as const,
    sector: "sports" as const,
  },
  {
    id: "3",
    name: "مدير الصحة",
    username: "health",
    password: "1234",
    role: "admin" as const,
    sector: "health" as const,
  },
  {
    id: "4",
    name: "مدير التعليم",
    username: "education",
    password: "1234",
    role: "admin" as const,
    sector: "education" as const,
  },
]
