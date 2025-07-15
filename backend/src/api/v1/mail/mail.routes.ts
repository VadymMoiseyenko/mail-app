import { FastifyInstance } from "fastify/types/instance";
import * as controller from "./mail.controller";
import {
  createMailBodySchema,
  paramsSchema,
  updateMailBodySchema,
} from "./mail.schema";
import { create } from "domain";

export default async function mailRoutes(fastify: FastifyInstance) {
  fastify.get("/", {
    handler: controller.listMails,
  });

  fastify.post("/", {
    schema: { body: createMailBodySchema },
    handler: controller.createMail,
  });

  fastify.put("/:id", {
    schema: { body: updateMailBodySchema, params: paramsSchema },
    handler: controller.updateMail,
  });

  fastify.delete("/:id", {
    schema: { params: paramsSchema },
    handler: controller.deleteMail,
  });
}
