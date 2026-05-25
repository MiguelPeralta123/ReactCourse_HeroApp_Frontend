import { RouterProvider } from 'react-router'
import { appRouter } from './router/app.router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FavoritesProvider } from './heroes/context/favorites.context';

const queryClient = new QueryClient();

export const HeroesApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <RouterProvider router={appRouter} />
        <ReactQueryDevtools initialIsOpen={false} />
      </FavoritesProvider>
    </QueryClientProvider>
  )
}
