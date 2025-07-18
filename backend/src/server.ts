import Fastify from "fastify";
import apiV1 from "./api/v1";
import dbPlugin from "./db";

const fastify = Fastify({
  logger: true,
});

fastify.register(require("@fastify/cors"), {
  origin: ["http://localhost:3000"], // Allow requests from your frontend
  credentials: true,
});

fastify.register(dbPlugin);
fastify.register(apiV1, { prefix: "/api/v1" });

fastify.listen({ port: 3001 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
