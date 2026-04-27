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

  // ✅ FIXED: define handler again (minimal responsibility)
  const handleConnect = () => {
    connect.mutate(
      { id: channel.id },
      {
        onSuccess: (res) => {
          if (res.status === 'manual_required') {
            setManualOpen(true)
          }
          // ❌ no toast here anymore (handled in hook)
        },
      }
    )
  }

  return (
    <>
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

        {/* ENABLE / DISABLE */}
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
                <Button size="sm" className="h-8 text-sm" disabled>
                  Enable
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              Connect channel first
            </TooltipContent>
          </Tooltip>
        )}

        {/* SYNC */}
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="shrink-0">
              <Button
                size="xs"
                variant="ghost"
                className="h-7"
                onClick={() => sync.mutate(channel.id)}
                disabled={!isConnected}
                loading={sync.isPending}
              >
                <Icon size="sm">
                  <RefreshCw />
                </Icon>
                <Text size="xs">Sync</Text>
              </Button>
            </span>
          </TooltipTrigger>
          {!isConnected && (
            <TooltipContent>
              Connect channel to sync
            </TooltipContent>
          )}
        </Tooltip>

        {/* TEST */}
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="shrink-0">
              <Button
                size="xs"
                variant="ghost"
                className="h-7"
                onClick={() => test.mutate(channel.id)}
                disabled={!isConnected}
                loading={test.isPending}
              >
                <Icon size="sm">
                  <FlaskConical />
                </Icon>
                <Text size="xs">Test</Text>
              </Button>
            </span>
          </TooltipTrigger>
          {!isConnected && (
            <TooltipContent>
              Connect channel to test connection
            </TooltipContent>
          )}
        </Tooltip>
      </div>

      <ManualConnectDialog
        open={manualOpen}
        onOpenChange={setManualOpen}
        channelId={channel.id}
      />
    </>
  )
}