import { authApi } from "./auth.client";
import { groupApi } from "./group.client";
import { taskApi } from "./task.client";
import { userApi } from "./user.client";
import { websocketApi } from "./websocket.client";

export { authApi } from "./auth.client";
export { groupApi } from "./group.client";
export { taskApi } from "./task.client";
export { userApi } from "./user.client";
export { websocketApi } from "./websocket.client";

export const mindshelfApi = {
  auth: authApi,
  group: groupApi,
  task: taskApi,
  user: userApi,
  websocket: websocketApi,
};
