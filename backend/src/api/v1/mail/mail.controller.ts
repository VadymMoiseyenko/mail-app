import {
  CreateMailRequest,
  MailParams,
  SearchParams,
  UpdateMailRequest,
} from "../../../../../common";
import { FastifyReply, FastifyRequest } from "fastify";

export async function listMails(
  request: FastifyRequest<{ Querystring: SearchParams }>,
  reply: FastifyReply
) {
  try {
    const { search } = request.query || {};
    const emails = await request.server.db.emails.list(search);

    reply.send({
      success: true,
      data: emails,
      count: emails.length,
    });
  } catch (error) {
    reply.code(500).send({
      success: false,
      error: "Failed to retrieve emails",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function createMail(
  request: FastifyRequest<{ Body: CreateMailRequest }>,
  reply: FastifyReply
) {
  try {
    // Body is already validated by fastify-type-provider-zod
    const emailData = request.body;
    const [createdEmail] = await request.server.db.emails.create(emailData);

    reply.code(201).send({
      success: true,
      data: createdEmail,
      message: "Email saved successfully",
    });
  } catch (error) {
    reply.code(500).send({
      success: false,
      error: "Failed to save email",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function getMail(
  request: FastifyRequest<{ Params: MailParams }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;

    const email = await request.server.db.emails.findById(id);

    if (!email) {
      reply.code(404).send({
        success: false,
        error: "Email not found",
        details: `Email with ID ${id} does not exist`,
      });
      return;
    }

    reply.send({
      success: true,
      data: email,
    });
  } catch (error) {
    reply.code(500).send({
      success: false,
      error: "Failed to retrieve email",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function updateMail(
  request: FastifyRequest<{
    Params: MailParams;
    Body: UpdateMailRequest;
  }>,
  reply: FastifyReply
) {
  try {
    // Both params and body are already validated by fastify-type-provider-zod
    const { id } = request.params;
    const updateData = { ...request.body, id }; // Add the id to updateData
    console.log("______Update Mail Request ID:", id);

    // Check if email exists
    const existingEmail = await request.server.db.emails.findById(id);
    if (!existingEmail) {
      reply.code(404).send({
        success: false,
        error: "Email not found",
        details: `Email with ID ${id} does not exist`,
      });
      return;
    }

    // Update the email
    const [updatedEmail] = await request.server.db.emails.update(
      id,
      updateData
    );

    reply.send({
      success: true,
      data: updatedEmail,
      message: "Email updated successfully",
    });
  } catch (error) {
    reply.code(500).send({
      success: false,
      error: "Failed to update email",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function deleteMail(
  request: FastifyRequest<{ Params: MailParams }>,
  reply: FastifyReply
) {
  try {
    // Params are already validated and transformed by fastify-type-provider-zod
    const { id } = request.params;

    // Check if email exists
    const existingEmail = await request.server.db.emails.findById(id);
    if (!existingEmail) {
      reply.code(404).send({
        success: false,
        error: "Email not found",
        details: `Email with ID ${id} does not exist`,
      });
      return;
    }

    // Delete the email
    await request.server.db.emails.delete(id);

    reply.code(200).send();
  } catch (error) {
    reply.code(500).send({
      success: false,
      error: "Failed to delete email",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
