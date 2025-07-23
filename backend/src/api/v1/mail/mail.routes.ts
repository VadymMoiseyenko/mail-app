import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import * as controller from "./mail.controller";
import {
  createMailBodySchema,
  paramsSchema,
  updateMailBodySchema,
} from "../../../../../common";

export default async function mailRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get("/", {
    handler: controller.listMails,
  });

  app.post("/", {
    schema: {
      body: createMailBodySchema,
    },
    handler: controller.createMail,
  });

  app.get("/:id", {
    schema: {
      params: paramsSchema,
    },
    handler: controller.getMail,
  });

  app.put("/:id", {
    schema: {
      body: updateMailBodySchema,
      params: paramsSchema,
    },
    handler: controller.updateMail,
  });

  app.delete("/:id", {
    schema: {
      params: paramsSchema,
    },
    handler: controller.deleteMail,
  });
}
