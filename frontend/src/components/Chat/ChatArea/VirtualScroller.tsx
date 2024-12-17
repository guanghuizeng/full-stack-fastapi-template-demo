import React, { useEffect, useRef, useState } from "react"
import { Box } from "@chakra-ui/react"

interface VirtualScrollerProps<T> {
  items: T[]
  itemHeight: number
  overscan?: number
  onLoadMore?: () => void
  children: (items: T[]) => React.ReactNode
}

function VirtualScroller<T>({
  items,
  itemHeight,
  overscan = 3,
  onLoadMore,
  children,
}: VirtualScrollerProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver((entries) => {
      setContainerHeight(entries[0].contentRect.height)
    })

    resizeObserver.observe(container)
    return () => resizeObserver.disconnect()
  }, [])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    setScrollTop(target.scrollTop)

    // Load more when scrolling near the top
    if (target.scrollTop < itemHeight * 2 && onLoadMore) {
      onLoadMore()
    }
  }

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(
    items.length,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  )

  const visibleItems = items.slice(startIndex, endIndex)
  const paddingTop = startIndex * itemHeight
  const totalHeight = items.length * itemHeight

  return (
    <Box
      ref={containerRef}
      h="100%"
      overflowY="auto"
      position="relative"
      onScroll={handleScroll}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height={totalHeight}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top={paddingTop}
        left={0}
        right={0}
      >
        {children(visibleItems)}
      </Box>
    </Box>
  )
}

export default VirtualScroller 