import {
 DeliveryStatus
} from './message.types'

export function isDelivered(
 status:DeliveryStatus
):boolean{

 return (

  status===DeliveryStatus.DELIVERED ||

  status===DeliveryStatus.READ

 )

}

export function isFailed(
 status:DeliveryStatus
):boolean{

 return status===DeliveryStatus.FAILED

}

export function isPending(
 status:DeliveryStatus
):boolean{

 return status===DeliveryStatus.PENDING

}

export function canRetry(
 status:DeliveryStatus
):boolean{

 return status===DeliveryStatus.FAILED

}

export function isRead(
 status:DeliveryStatus
):boolean{

 return status===DeliveryStatus.READ

}

export function isSent(
 status:DeliveryStatus
):boolean{

 return (

  status===DeliveryStatus.SENT ||

  status===DeliveryStatus.DELIVERED ||

  status===DeliveryStatus.READ

 )

}