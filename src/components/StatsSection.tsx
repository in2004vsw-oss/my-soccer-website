import { motion } from 'motion/react';
import { Trophy, Target, Award } from 'lucide-react';
import { usePlayersData } from '../hooks/usePlayersData';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function StatsSection() {
  const { getTopScorers, getTopAssisters, loading, players } = usePlayersData();
  const topScorers = getTopScorers();
  const topAssisters = getTopAssisters();

  // 데이터가 없으면 섹션을 숨김
  if (players.length === 0) {
    return (
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-8 h-8 text-yellow-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">퀀스의 왕들</h2>
          </div>
          <p className="text-xl text-gray-400">
            선수 데이터를 불러오는 중입니다...
          </p>
        </motion.div>
      </section>
    );
  }

  const StatCard = ({ 
    players, 
    statValue, 
    statLabel, 
    color, 
    icon: Icon 
  }: { 
    players: any[]; 
    statValue: number; 
    statLabel: string; 
    color: string; 
    icon: any;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-colors group"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${color === 'green' ? 'bg-green-500/20' : 'bg-blue-500/20'}`}>
            <Icon className={`w-6 h-6 ${color === 'green' ? 'text-green-400' : 'text-blue-400'}`} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {statLabel === '골' ? '득점왕' : '도움왕'}
            </h3>
            <p className="text-gray-400 text-sm">
              퀀스의 왕들 {players.length > 1 && `(${players.length}명 동점)`}
            </p>
          </div>
        </div>
        <div className={`text-3xl font-bold ${color === 'green' ? 'text-green-400' : 'text-blue-400'}`}>
          {statValue}
        </div>
      </div>

      <div className="space-y-4">
        {players.map((player, index) => (
          <div key={player.id} className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-700 group-hover:border-gray-600 transition-colors">
              <ImageWithFallback
                src={player.photo}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-white mb-1">{player.name}</h4>
              <div className="flex gap-4 text-sm mt-2">
                <span className="text-green-400">{player.goals}G</span>
                <span className="text-blue-400">{player.assists}A</span>
                <span className="text-gray-300">{player.matches}M</span>
              </div>
            </div>
            {players.length > 1 && index === 0 && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-500/30">
                <Trophy className="w-4 h-4 text-yellow-400" />
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
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
          <Award className="w-8 h-8 text-yellow-400" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">퀀스의 왕들</h2>
        </div>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          퀀스를 이끌고 있는 이들의 환상적인 기록을 감상하세요.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <StatCard
          players={topScorers}
          statValue={topScorers[0]?.goals || 0}
          statLabel="골"
          color="green"
          icon={Target}
        />
        <StatCard
          players={topAssisters}
          statValue={topAssisters[0]?.assists || 0}
          statLabel="어시스트"
          color="blue"
          icon={Trophy}
        />
      </div>
    </section>
  );
}