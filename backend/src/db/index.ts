import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import knex, { Knex } from "knex";
import { EmailRepository } from "../api/v1/mail/mail.repository";

class DatabaseService {
  private db: Knex;
  public readonly emails: EmailRepository;

  constructor(knexInstance: Knex) {
    this.db = knexInstance;
    this.emails = new EmailRepository(this.db);
  }

  async close() {
    await this.db.destroy();
  }
}

async function dbPlugin(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  const db = knex({
    client: "sqlite3",
    connection: {
      filename: "./db.sqlite",
    },
    useNullAsDefault: true,
  });

  const dbService = new DatabaseService(db);

  fastify.decorate("db", dbService);

  fastify.addHook("onClose", async () => {
    await dbService.close();
  });
}

declare module "fastify" {
  interface FastifyInstance {
    db: DatabaseService;
  }
}

export default fp(dbPlugin, {
  name: "db-plugin",
});
