import { FastifyReply, FastifyRequest } from "fastify";
import { SearchParams } from "./mail.types";

export async function listMails(
  request: FastifyRequest<{ Querystring: SearchParams }>,
  reply: FastifyReply
) {
  const { search } = request.query;

  if (search) {
    return reply.send("list of filtered mails");
  }

  reply.send("list of mails");
}

export async function createMail(request: FastifyRequest, reply: FastifyReply) {
  reply.code(201).send("created mail");
}

export async function updateMail(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  reply.code(200).send("updated mail with id " + id);
}

export async function deleteMail(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  reply.code(204).send("deleted mail with id " + id);
}
