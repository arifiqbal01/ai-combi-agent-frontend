'use client'

import { useState } from 'react'
import { Channel } from '../../../domain/channel.types'
import {
  Inline,
  Button,
  toast,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/ui'
import {
  useEnableChannel,
  useDisableChannel,
  useSyncChannel,
  useTestConnection,
  useConnectChannel, // ✅ NEW
} from '../../../application/mutations'
import { getChannelState } from './channelItem.helpers'
import { ManualConnectDialog } from './ManualConnectDialog'

export function ChannelActions({ channel }: { channel: Channel }) {
  const enable = useEnableChannel()
  const disable = useDisableChannel()
  const sync = useSyncChannel()
  const test = useTestConnection()

  const connect = useConnectChannel()

  const [manualOpen, setManualOpen] = useState(false)

  const { isConnected, isDisconnected, isError } =
    getChannelState(channel)

  const showReconnect = isConnected || isError
  const showConnect = isDisconnected

  const handleConnect = () => {
    connect.mutate(
      { id: channel.id },
      {
        onSuccess: (res) => {
          if (res.status === 'manual_required') {
            setManualOpen(true)
          }

          if (res.status === 'connected') {
            toast.success('Connected')
          }
        },
        onError: () => {
          toast.error('Connection failed')
        },
      }
    )
  }

  return (
    <>
      <Inline gap="sm" className="flex-wrap">

        {/* CONNECT / RECONNECT */}
        {(showReconnect || showConnect) && (
          <Button
            size="sm"
            onClick={handleConnect}
            loading={connect.isPending}
            variant={showReconnect ? 'outline' : 'default'}
          >
            {showReconnect ? 'Reconnect' : 'Connect'}
          </Button>
        )}

        {/* ENABLE / DISABLE */}
        {channel.isActive ? (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => disable.mutate(channel.id)}
          >
            Disable
          </Button>
        ) : isConnected ? (
          <Button
            size="sm"
            onClick={() => enable.mutate(channel.id)}
          >
            Enable
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button size="sm" disabled>
                  Enable
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              Connect channel first
            </TooltipContent>
          </Tooltip>
        )}

        {/* SECONDARY */}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => sync.mutate(channel.id)}
          disabled={!isConnected}
          loading={sync.isPending && sync.variables === channel.id}
        >
          Sync
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => test.mutate(channel.id)}
          disabled={!isConnected}
          loading={test.isPending && test.variables === channel.id}
        >
          Test
        </Button>

      </Inline>

      {/* 🔥 Manual flow handled by UI */}
      <ManualConnectDialog
        open={manualOpen}
        onOpenChange={setManualOpen}
        channelId={channel.id}
      />
    </>
  )
}