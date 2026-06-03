import {
  Participant,
  ParticipantTransportRole,
  ParticipantIdentityRole,
} from './participant.types'

export function getPrimaryParticipant(
  participants: Participant[]
): Participant | undefined {
  return participants?.[0]
}

export function getParticipantLabel(
  participant?: Participant
): string {
  return (
    participant?.label ??
    participant?.displayName ??
    participant?.username ??
    participant?.email ??
    participant?.phone ??
    participant?.address ??
    'Unknown'
  )
}

export function getParticipantName(
  participant: Participant
): string {
  return getParticipantLabel(participant)
}

/* ---------------------------
 role helpers
--------------------------- */

export function isFromParticipant(
  p: Participant
): boolean {
  return (
    p.role ===
    ParticipantTransportRole.FROM
  )
}

export function isAgentParticipant(
  p: Participant
): boolean {
  return (
    p.role ===
    ParticipantIdentityRole.AGENT
  )
}

export function isCustomerParticipant(
  p: Participant
): boolean {
  return (
    p.role ===
    ParticipantIdentityRole.CUSTOMER
  )
}