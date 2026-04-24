import {
 MessageKind
} from './message.types'

export function isHumanKind(
 kind:MessageKind
):boolean{

 return kind===MessageKind.HUMAN

}

export function isAIKind(
 kind:MessageKind
):boolean{

 return kind===MessageKind.AI

}

export function isSystemKind(
 kind:MessageKind
):boolean{

 return kind===MessageKind.SYSTEM

}

export function isAutoKind(
 kind:MessageKind
):boolean{

 return kind===MessageKind.AUTO

}