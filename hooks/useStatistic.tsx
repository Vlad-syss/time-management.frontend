import { getStatistic } from '@/api/statistic.api'
import { useQuery } from '@tanstack/react-query'

export const useGetStatistic = () => {
	const query = useQuery({
		queryKey: ['statistic'],
		queryFn: getStatistic,
	})

	return query
}
