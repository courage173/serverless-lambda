export default {
  type: "object",
  properties: {
    signature: {
      type: "object",
      properties: {
        timestamp: { type: "string" },
        token: { type: "string" },
        signature: { type: "string" },
      },
    },
    "event-data": {
      type: "object",
      properties: {
        event: { type: "string" },
        timestamp: { type: "number" },
        id: { type: "string" },
      },
    },
  },
} as const;
