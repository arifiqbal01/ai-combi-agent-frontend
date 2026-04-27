'use client'

import { useState } from 'react'
import { Channel } from '../../../domain/channel.types'
import {
  Button,
  Icon,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Text,
  toast,
} from '@/ui'

import {
  useEnableChannel,
  useDisableChannel,
  useSyncChannel,
  useTestConnection,
  useConnectChannel,
} from '../../../application/mutations'

import { getChannelState } from './channelItem.helpers'
import { ManualConnectDialog } from './ManualConnectDialog'

import { RefreshCw, FlaskConical } from 'lucide-react'

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
      {/* 🔥 SINGLE ROW ACTION BAR */}
      <div
        className="
          flex items-center gap-4
          overflow-x-auto
          no-scrollbar
          pt-1
        "
      >
        {(showReconnect || showConnect) && (
          <Button
            size="sm"
            className="h-8 text-sm shrink-0"
            onClick={handleConnect}
            loading={connect.isPending}
            {...(showReconnect && { variant: 'secondary' as const })}
          >
            {showReconnect ? 'Reconnect' : 'Connect'}
          </Button>
        )}

        {channel.isActive ? (
          <Button
            size="sm"
            variant="secondary"
            className="h-8 text-sm shrink-0"
            onClick={() => disable.mutate(channel.id)}
          >
            Disable
          </Button>
        ) : isConnected ? (
          <Button
            size="sm"
            className="h-8 text-sm shrink-0"
            onClick={() => enable.mutate(channel.id)}
          >
            Enable
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="shrink-0">
                <Button
                  size="sm"
                  className="h-8 text-sm"
                  disabled
                >
                  Enable
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              Connect channel first
            </TooltipContent>
          </Tooltip>
        )}

        {/* Secondary actions inline */}
        <button
          className="
            flex items-center gap-1
            text-text-muted text-xs
            hover:text-text-primary
            transition
            shrink-0
          "
          onClick={() => sync.mutate(channel.id)}
          disabled={!isConnected}
        >
          <Icon size="sm">
            <RefreshCw />
          </Icon>
          <Text size="xs">Sync</Text>
        </button>

        <button
          className="
            flex items-center gap-1
            text-text-muted text-xs
            hover:text-text-primary
            transition
            shrink-0
          "
          onClick={() => test.mutate(channel.id)}
          disabled={!isConnected}
        >
          <Icon size="sm">
            <FlaskConical />
          </Icon>
          <Text size="xs">Test</Text>
        </button>
      </div>

      <ManualConnectDialog
        open={manualOpen}
        onOpenChange={setManualOpen}
        channelId={channel.id}
      />
    </>
  )
}