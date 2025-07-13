import HydrateClient from '@/utils/hydrate-client';
import Overview from '@/components/history/Overview';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getSingleReport } from '@/hooks/react-query';
import Report from '@/components/history/Report';
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['report', id],
    queryFn: () => getSingleReport(id),
    retry: false,
  });
  const deHydrateState = dehydrate(queryClient);
  return (
    <HydrateClient state={deHydrateState}>
      <Report id={id} />
    </HydrateClient>
  );
}
