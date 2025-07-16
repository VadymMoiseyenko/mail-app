import { FastifyReply, FastifyRequest } from "fastify";
import {
  SearchParams,
  CreateMailRequest,
  UpdateMailRequest,
} from "./mail.types";

export async function listMails(
  request: FastifyRequest<{ Querystring: SearchParams }>,
  reply: FastifyReply
) {
  try {
    const { search } = request.query;
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
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const emailId = parseInt(id, 10);

    if (isNaN(emailId)) {
      reply.code(400).send({
        success: false,
        error: "Invalid email ID",
        details: "ID must be a valid number",
      });
      return;
    }

    const email = await request.server.db.emails.findById(emailId);

    if (!email) {
      reply.code(404).send({
        success: false,
        error: "Email not found",
        details: `Email with ID ${emailId} does not exist`,
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
  request: FastifyRequest<{ Params: { id: string }; Body: UpdateMailRequest }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const emailId = parseInt(id, 10);

    if (isNaN(emailId)) {
      reply.code(400).send({
        success: false,
        error: "Invalid email ID",
        details: "ID must be a valid number",
      });
      return;
    }

    const updateData = request.body;

    // Check if email exists
    const existingEmail = await request.server.db.emails.findById(emailId);
    if (!existingEmail) {
      reply.code(404).send({
        success: false,
        error: "Email not found",
        details: `Email with ID ${emailId} does not exist`,
      });
      return;
    }

    // Update the email
    const [updatedEmail] = await request.server.db.emails.update(
      emailId,
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
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const emailId = parseInt(id, 10);

    if (isNaN(emailId)) {
      reply.code(400).send({
        success: false,
        error: "Invalid email ID",
        details: "ID must be a valid number",
      });
      return;
    }

    // Check if email exists
    const existingEmail = await request.server.db.emails.findById(emailId);
    if (!existingEmail) {
      reply.code(404).send({
        success: false,
        error: "Email not found",
        details: `Email with ID ${emailId} does not exist`,
      });
      return;
    }

    // Delete the email
    await request.server.db.emails.delete(emailId);

    reply.code(204).send();
  } catch (error) {
    reply.code(500).send({
      success: false,
      error: "Failed to delete email",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
