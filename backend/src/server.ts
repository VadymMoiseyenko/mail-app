import Fastify from "fastify";
import apiV1 from "./api/v1";

const fastify = Fastify({
  logger: true,
});

fastify.register(apiV1, { prefix: "/api/v1" });

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
