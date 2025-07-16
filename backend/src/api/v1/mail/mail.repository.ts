import { Knex } from "knex";
import { CreateMailRequest, Mail } from "./mail.types";

export class EmailRepository {
  private db: Knex;

  constructor(database: Knex) {
    this.db = database;
  }

  async list(searchQuery?: string) {
    let query = this.db("emails").select("*");

    if (searchQuery) {
      query = query.where(function () {
        this.where("subject", "like", `%${searchQuery}%`)
          .orWhere("body", "like", `%${searchQuery}%`)
          .orWhere("to", "like", `%${searchQuery}%`);
      });
    }

    return query.orderBy("created_at", "desc");
  }

  async create(emailData: CreateMailRequest) {
    return this.db("emails").insert(emailData).returning("*");
  }

  async findById(id: number) {
    return this.db("emails").where("id", id).first();
  }

  async update(id: number, updates: Mail) {
    return this.db("emails").where("id", id).update(updates).returning("*");
  }

  async delete(id: number) {
    return this.db("emails").where("id", id).del();
  }
}
