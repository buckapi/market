
import { gql } from 'apollo-angular';

export const TICKET_UPDATED = gql`
  subscription TicketUpdated($id: ID!) {
    ticketUpdated(id: $id) {
      id
      status
      support {
        id
        username
      }
    }
  }
`;

export const MESSAGE_ADDED = gql`
  subscription MessageAdded($ticketId: ID!) {
    messageAdded(ticketId: $ticketId) {
      id
      text
      sender {
        id
        username
      }
      createdAt
    }
  }
`;