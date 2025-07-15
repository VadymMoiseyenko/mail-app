import { FastifyInstance } from "fastify";
import mailRoutes from "./mail/mail.routes";

export default async function apiV1(fastify: FastifyInstance) {
  fastify.register(mailRoutes, { prefix: "/mail" });
}
