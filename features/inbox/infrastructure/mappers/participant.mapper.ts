// infrastructure/mappers/participant.mapper.ts

import { ParticipantDTO } from '../dto/participant.dto'

import {
  Participant,
} from '@/features/inbox/domain/participant/participant.types'

export function mapParticipantDTO(
  dto: ParticipantDTO
): Participant {
  return {
    address: dto.address,

    displayName:
      dto.display_name,

    username:
      dto.username,

    email:
      dto.email,

    phone:
      dto.phone,

    avatarUrl:
      dto.avatar_url,

    label:
      dto.label,
  }
}