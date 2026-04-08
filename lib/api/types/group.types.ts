import type { PaginatedResponse } from "./common.types";

export type GroupResponse = {
  id: string;
  name: string;
  color: string;
};

export type PaginatedGroupResponse = PaginatedResponse<GroupResponse>;

export type CreateGroupRequest = {
  name: string;
  color: string;
};

export type UpdateGroupRequest = {
  id: string;
  name: string;
};
