import { Ticket, TicketJson } from "./tickets.models";
import * as messagesHelper from "../messages/messages.helper";

export function convertJsonToModel(ticketJson: TicketJson): Ticket {
  return {
    ticketId: ticketJson.ticket_id,
    statusId: ticketJson.status_id,
    authorUserId: ticketJson.author_user_id,
    title: ticketJson.title,
    content: ticketJson.content,
    messages: []
  };
}

export function convertModelsToJson(tickets: Ticket[]): TicketJson[] {
  return tickets.map(convertModelToJson);
}

export function convertModelToJson(ticket: Ticket): TicketJson {
  return {
    ticket_id: ticket.ticketId,
    status_id: ticket.statusId,
    author_user_id: ticket.authorUserId,
    title: ticket.title,
    content: ticket.content,
    messages: messagesHelper.convertModelsToJson(ticket.messages)
  };
}
