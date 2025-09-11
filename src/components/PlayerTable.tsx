import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronUp, ChevronDown, Users, RefreshCw } from 'lucide-react';
import { usePlayersData } from '../hooks/usePlayersData';
import { type Player } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

type SortField = 'goals' | 'assists' | 'name' | 'matches';
type SortDirection = 'asc' | 'desc';

export function PlayerTable() {
  const [sortField, setSortField] = useState<SortField>('goals');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const { players, loading, error, lastUpdated, refreshData } = usePlayersData();

  const handleRefresh = async () => {
    try {
      await refreshData();
      toast.success('데이터가 업데이트되었습니다!');
    } catch (err) {
      toast.error('데이터 업데이트에 실패했습니다');
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedPlayers = [...players].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'goals':
        aValue = a.goals;
        bValue = b.goals;
        break;
      case 'assists':
        aValue = a.assists;
        bValue = b.assists;
        break;
      case 'matches':
        aValue = a.matches;
        bValue = b.matches;
        break;
      default:
        return 0;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-2 hover:text-white transition-colors group w-full text-left"
    >
      {children}
      <div className="flex flex-col">
        <ChevronUp 
          className={`w-3 h-3 transition-colors ${
            sortField === field && sortDirection === 'asc' 
              ? 'text-green-400' 
              : 'text-gray-600 group-hover:text-gray-400'
          }`} 
        />
        <ChevronDown 
          className={`w-3 h-3 -mt-1 transition-colors ${
            sortField === field && sortDirection === 'desc' 
              ? 'text-green-400' 
              : 'text-gray-600 group-hover:text-gray-400'
          }`} 
        />
      </div>
    </button>
  );

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Users className="w-8 h-8 text-blue-400" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">현재 순위표</h2>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="ml-4 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg transition-colors"
            title="데이터 새로고침"
          >
            <RefreshCw className={`w-5 h-5 text-white ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          퀀스의 치열한 득점왕, 도움왕 경쟁을 확인해보세요!
        </p>
        {lastUpdated && (
          <p className="text-sm text-gray-500 mt-2">
            마지막 업데이트: {lastUpdated.toLocaleString('ko-KR')}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 p-6 border-b border-gray-800 bg-gray-900/80">
            <div className="col-span-2">
              <SortButton field="name">
                <span className="font-medium text-gray-300">선수</span>
              </SortButton>
            </div>
            <div>
              <SortButton field="goals">
                <span className="font-medium text-green-400">골</span>
              </SortButton>
            </div>
            <div>
              <SortButton field="assists">
                <span className="font-medium text-blue-400">어시스트</span>
              </SortButton>
            </div>
            <div>
              <SortButton field="matches">
                <span className="font-medium text-gray-300">경기</span>
              </SortButton>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-800">
            {players.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-400 text-lg">
                  선수 데이터를 불러오는 중입니다...
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  관리자가 구글 시트 URL을 설정해야 합니다.
                </p>
              </div>
            ) : (
              sortedPlayers.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="grid grid-cols-5 gap-4 p-6 hover:bg-gray-800/50 transition-colors group"
              >
                <div className="col-span-2 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700 group-hover:border-gray-600 transition-colors">
                    <ImageWithFallback
                      src={player.photo}
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-white group-hover:text-green-400 transition-colors">
                      {player.name}
                    </h4>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 font-bold text-lg">{player.goals}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-400 font-bold text-lg">{player.assists}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-white font-medium">{player.matches}</span>
                </div>
              </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-8 mt-8 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="text-gray-400">득점</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span className="text-gray-400">어시스트</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-gray-400">출전 경기</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}