import { authApi } from "./auth.client";
import { groupApi } from "./group.client";
import { sharedTaskApi } from "./shared-task.client";
import { taskApi } from "./task.client";
import { userApi } from "./user.client";
import { websocketApi } from "./websocket.client";

export { authApi } from "./auth.client";
export { groupApi } from "./group.client";
export { sharedTaskApi } from "./shared-task.client";
export { taskApi } from "./task.client";
export { userApi } from "./user.client";
export { websocketApi } from "./websocket.client";

export const mindshelfApi = {
  auth: authApi,
  group: groupApi,
  sharedTask: sharedTaskApi,
  task: taskApi,
  user: userApi,
  websocket: websocketApi,
};
