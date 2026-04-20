import { describe, expect, it } from "vitest";
import type { HomeChat } from "../types/home.types";
import { mapChatsToConversationItems } from "./home.mappers";

function buildChat(overrides: Partial<HomeChat>): HomeChat {
  return {
    friend: {
      id: "friend-1",
      name: "Alice",
      email: "alice@example.com",
      avatar_url: "https://example.com/alice.png",
    },
    unread_count: 0,
    ...overrides,
  };
}

describe("mapChatsToConversationItems", () => {
  it("maps chats, sorts by newest message and limits the list to five items", () => {
    const chats = Array.from({ length: 6 }, (_, index) =>
      buildChat({
        friend: {
          id: `friend-${index + 1}`,
          name: `Friend ${index + 1}`,
          email: `friend${index + 1}@example.com`,
          avatar_url: `https://example.com/${index + 1}.png`,
        },
        last_message: {
          id: `message-${index + 1}`,
          content: `message ${index + 1}`,
          created_at: `2026-04-1${index}T10:00:00.000Z`,
          type: "text",
        },
        unread_count: index,
      }),
    );

    const items = mapChatsToConversationItems(chats);

    expect(items).toHaveLength(5);
    expect(items.map((item) => item.friendId)).toEqual([
      "friend-6",
      "friend-5",
      "friend-4",
      "friend-3",
      "friend-2",
    ]);
    expect(items[0]).toMatchObject({
      id: "chat-friend-6",
      unreadCount: 5,
      preview: "message 6",
    });
  });

  it("uses special preview for shared tasks and fallback text when there is no last message", () => {
    const items = mapChatsToConversationItems([
      buildChat({
        friend: {
          id: "shared-task-friend",
          name: "Shared Task",
          email: "shared@example.com",
          avatar_url: "https://example.com/shared.png",
        },
        last_message: {
          id: "message-shared",
          content: "ignored preview",
          created_at: "2026-04-18T10:00:00.000Z",
          type: "shared_task",
        },
      }),
      buildChat({
        friend: {
          id: "empty-friend",
          name: "Empty State",
          email: "empty@example.com",
          avatar_url: "https://example.com/empty.png",
        },
      }),
    ]);

    expect(items.find((item) => item.friendId === "shared-task-friend")?.preview).toBe(
      "A note was shared in this conversation.",
    );
    expect(items.find((item) => item.friendId === "empty-friend")?.preview).toBe(
      "Open the conversation to pick up the context.",
    );
  });

  it("truncates long message previews", () => {
    const longContent = "a".repeat(140);
    const [item] = mapChatsToConversationItems([
      buildChat({
        last_message: {
          id: "message-long",
          content: longContent,
          created_at: "2026-04-18T10:00:00.000Z",
          type: "text",
        },
      }),
    ]);

    expect(item.preview).toBe(`${"a".repeat(111)}...`);
  });
});
