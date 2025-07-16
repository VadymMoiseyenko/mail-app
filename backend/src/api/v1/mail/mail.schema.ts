export const createMailBodySchema = {
  type: "object",
  required: ["to", "subject", "body"],
  properties: {
    to: { type: "string", format: "email" },
    cc: { type: "string", format: "email" },
    bcc: { type: "string", format: "email" },
    subject: { type: "string", minLength: 1 },
    body: { type: "string", minLength: 1 },
  },
};

export const updateMailBodySchema = {
  type: "object",
  properties: {
    to: { type: "string", format: "email" },
    cc: { type: "string", format: "email" },
    bcc: { type: "string", format: "email" },
    subject: { type: "string", minLength: 1 },
    body: { type: "string", minLength: 1 },
  },
};

export const paramsSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
};
