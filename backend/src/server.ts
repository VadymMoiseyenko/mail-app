import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import apiV1 from "./api/v1";
import dbPlugin from "./db";

const fastify = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

// Add schema validator and serializer
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(require("@fastify/cors"), {
  origin: ["http://localhost:3000"], // Allow requests from your frontend
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly allow all methods
  allowedHeaders: ["Content-Type", "Authorization"],
});

fastify.register(dbPlugin);
fastify.register(apiV1, { prefix: "/api/v1" });

fastify.listen({ port: 3001 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
