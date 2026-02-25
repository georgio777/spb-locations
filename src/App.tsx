import './App.css'
import { useTheme } from './hooks/useTheme';
import { useIsMobile } from './hooks/useIsMobile';
import { Route, Routes } from 'react-router';
import { MainPage } from './pages/MainPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Включаем Suspense глобально, чтобы не писать в каждом хуке
      retry: 1, // количество попыток при ошибке
      staleTime: 1000 * 60 * 5, // данные "свежие" 5 минут
    },
  },
});

function App() {
  useTheme();
  useIsMobile();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/:slug?/:id?" element={<MainPage/>} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
