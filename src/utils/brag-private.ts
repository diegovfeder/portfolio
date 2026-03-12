import {
  privateBragEntries as fallbackPrivateBragEntries,
  privateSummaries as fallbackPrivateSummaries,
} from '~/data/brag/private'
import type {
  BragEntry,
  BragSummary,
  PrivateBragModule,
} from '~/types/brag'

type PrivateLoadMode = 'disabled' | 'local' | 'fallback'

export interface PrivateBragData {
  entries: BragEntry[]
  summaries: BragSummary[]
  mode: PrivateLoadMode
  warning?: string
}

interface LoadPrivateBragDataOptions {
  isDev?: boolean
  localLoaders?: Record<string, () => Promise<PrivateBragModule>>
  fallbackModule?: PrivateBragModule
}

const getLocalPrivateModuleLoaders = (): Record<
  string,
  () => Promise<PrivateBragModule>
> => {
  const glob = (
    import.meta as ImportMeta & {
      glob?: <T>(pattern: string) => Record<string, () => Promise<T>>
    }
  ).glob

  if (typeof glob !== 'function') {
    return {}
  }

  return glob<PrivateBragModule>('/src/data/brag/private.local.ts')
}

const asEntryArray = (entries?: BragEntry[]) =>
  Array.isArray(entries) ? entries : []

const asSummaryArray = (summaries?: BragSummary[]) =>
  Array.isArray(summaries) ? summaries : []

export async function loadPrivateBragData({
  isDev = import.meta.env.DEV,
  localLoaders = getLocalPrivateModuleLoaders(),
  fallbackModule = {
    privateBragEntries: fallbackPrivateBragEntries,
    privateSummaries: fallbackPrivateSummaries,
  },
}: LoadPrivateBragDataOptions = {}): Promise<PrivateBragData> {
  if (!isDev) {
    return { entries: [], summaries: [], mode: 'disabled' }
  }

  const localModulePath = Object.keys(localLoaders)[0]

  if (localModulePath) {
    try {
      const moduleData = await localLoaders[localModulePath]()
      return {
        entries: asEntryArray(moduleData.privateBragEntries),
        summaries: asSummaryArray(moduleData.privateSummaries),
        mode: 'local',
      }
    } catch (error) {
      console.warn('Failed to load local private brag module:', error)
      return {
        entries: asEntryArray(fallbackModule.privateBragEntries),
        summaries: asSummaryArray(fallbackModule.privateSummaries),
        mode: 'fallback',
        warning:
          'Local private module failed to load. Falling back to production-safe defaults.',
      }
    }
  }

  return {
    entries: asEntryArray(fallbackModule.privateBragEntries),
    summaries: asSummaryArray(fallbackModule.privateSummaries),
    mode: 'fallback',
  }
}
