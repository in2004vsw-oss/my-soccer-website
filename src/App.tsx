import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { PlayerTable } from './components/PlayerTable';
import { usePlayersData } from './hooks/usePlayersData';
import { Toaster } from 'sonner@2.0.3';

export default function App() {
  const { error, loading } = usePlayersData();

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <StatsSection />
      <PlayerTable />
      
      {/* 로딩 상태 표시 */}
      {loading && (
        <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-40">
          데이터를 불러오는 중...
        </div>
      )}
      
      {/* 에러 상태 표시 */}
      {error && (
        <div className="fixed bottom-6 right-6 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-40">
          {error}
        </div>
      )}

      {/* Toast 알림 */}
      <Toaster 
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgb(17 24 39)',
            border: '1px solid rgb(55 65 81)',
            color: 'white',
          },
        }}
      />
    </div>
  );
}