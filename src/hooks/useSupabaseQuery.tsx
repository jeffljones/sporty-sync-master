import { useQuery, QueryKey, UseQueryOptions } from '@tanstack/react-query'
import { PostgrestError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

/**
 * A custom hook that combines React Query with Supabase queries
 */
export function useSupabaseQuery<T>(
  key: QueryKey,
  queryFn: () => any, // This simplifies the typing while still working functionally
  options?: Omit<UseQueryOptions<T, PostgrestError, T, QueryKey>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T, PostgrestError>({
    queryKey: key,
    queryFn: async () => {
      const { data, error } = await queryFn()
      
      if (error) {
        throw error
      }
      
      if (data === null) {
        throw new Error('No data returned')
      }
      
      return data as T
    },
    ...options,
  })
}

/**
 * Example usage for fetching competitions
 */
export function useCompetitions() {
  return useSupabaseQuery<any[]>(
    ['competitions'],
    () => supabase.from('competitions').select('*')
  )
}

/**
 * Example usage for fetching a single competition by ID
 */
export function useCompetition(id: string) {
  return useSupabaseQuery<any>(
    ['competition', id],
    () => supabase.from('competitions').select('*').eq('competition_id', id).single()
  )
}

/**
 * Example usage for fetching teams by competition ID
 */
export function useTeamsByCompetition(competitionId: string) {
  return useSupabaseQuery<any[]>(
    ['teams', competitionId],
    () => supabase.from('teams').select('*').eq('competition_id', competitionId)
  )
} 