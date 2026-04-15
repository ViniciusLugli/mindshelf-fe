export const queryKeys = {
  auth: {
    currentUser: ["auth", "current-user"] as const,
  },
  groups: {
    all: ["groups"] as const,
    list: (search: string, page: number, limit: number) =>
      ["groups", "list", search, page, limit] as const,
    detail: (groupId: string) => ["groups", "detail", groupId] as const,
    workspace: (groupId: string) => ["groups", "workspace", groupId] as const,
  },
  tasks: {
    all: ["tasks"] as const,
    list: (search: string, page: number, limit: number) =>
      ["tasks", "list", search, page, limit] as const,
    detail: (taskId: string) => ["tasks", "detail", taskId] as const,
    byGroup: (groupId: string, page: number, limit: number) =>
      ["tasks", "group", groupId, page, limit] as const,
    workspace: (taskId: string) => ["tasks", "workspace", taskId] as const,
  },
  users: {
    all: ["users"] as const,
    search: (search: string, page: number, limit: number) =>
      ["users", "search", search, page, limit] as const,
    detail: (userId: string) => ["users", "detail", userId] as const,
  },
  home: {
    activity: ["home", "activity"] as const,
  },
} as const;
