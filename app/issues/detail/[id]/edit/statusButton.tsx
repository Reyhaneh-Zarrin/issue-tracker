'use client'
import { DropdownMenu, Button } from '@radix-ui/themes'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const StatusButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusChange = async (status: string) => {
    setIsLoading(true)
    try {
      await axios.patch(`/api/issues/${issueId}/status`, { status })
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft" disabled={isLoading}>
          {isLoading ? "Changing..." : "Change Status"}
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item color="red" onClick={() => handleStatusChange("OPEN")}>
          Open
        </DropdownMenu.Item>
        <DropdownMenu.Item color="green" onClick={() => handleStatusChange("CLOSED")}>
          Closed
        </DropdownMenu.Item>
        <DropdownMenu.Item color="purple" onClick={() => handleStatusChange("IN_PROGRESS")}>
          In Progress
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default StatusButton
