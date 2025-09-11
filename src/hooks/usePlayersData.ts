import { useState, useEffect } from 'react';
import { type Player } from '../data/mockData';

/**
 * ========== 관리자 전용 설정 ==========
 * 
 * 구글 시트 CSV URL을 아래에 설정하세요:
 * 1. 구글 시트에서 파일 → 공유 → 웹에 게시
 * 2. "쉼표로 구분된 값(.csv)" 형식 선택
 * 3. 생성된 URL을 아래 GOOGLE_SHEETS_CSV_URL에 입력
 * 
 * 필수 컬럼: Name, Goals, Assists, Matches, Photo(선택)
 * 한국어 컬럼도 지원: 이름, 골, 어시스트, 경기, 사진
 */
const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQTgi-RfCmIMm3M38WiIwmymylhqtmQZswpOY8VM18DX5CHEotFNG0gAe-9GV5QW6VFXzZjeduE3ASj/pub?output=csv';

const CACHE_KEY = 'playersDataCache';
const CACHE_TIMESTAMP_KEY = 'playersCacheTimestamp';
const CACHE_DURATION = 5 * 60 * 1000; // 5분

// 기본 빈 선수 데이터 (구글 시트 연결 전까지 표시)
const defaultPlayers: Player[] = [];

export function usePlayersData() {
  const [players, setPlayers] = useState<Player[]>(defaultPlayers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // CSV 파싱 함수
  const parseCSV = (csvText: string): Player[] => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('CSV 파일이 비어있거나 올바르지 않습니다');
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const nameIndex = headers.findIndex(h => h === 'name' || h === '이름');
    const goalsIndex = headers.findIndex(h => h === 'goals' || h === '골');
    const assistsIndex = headers.findIndex(h => h === 'assists' || h === '어시스트');
    const matchesIndex = headers.findIndex(h => h === 'matches' || h === '경기');
    const photoIndex = headers.findIndex(h => h === 'photo' || h === '사진');

    if (nameIndex === -1 || goalsIndex === -1 || assistsIndex === -1 || matchesIndex === -1) {
      throw new Error('필수 컬럼(Name, Goals, Assists, Matches)이 없습니다');
    }

    const parsedPlayers: Player[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      
      if (values.length < 4) continue; // 최소 4개 컬럼 필요

      const name = values[nameIndex];
      const goals = parseInt(values[goalsIndex]) || 0;
      const assists = parseInt(values[assistsIndex]) || 0;
      const matches = parseInt(values[matchesIndex]) || 0;
      const photo = photoIndex !== -1 ? values[photoIndex] : 
        `https://images.unsplash.com/photo-1516981299556-c5b4e1661279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzb2NjZXIlMjBwbGF5ZXIlMjBhY3Rpb258ZW58MXx8fHwxNzU3NTY5MzI3fDA&ixlib=rb-4.1.0&q=80&w=400`;

      if (name) {
        parsedPlayers.push({
          id: i,
          name,
          goals,
          assists,
          matches,
          photo
        });
      }
    }

    return parsedPlayers;
  };

  // 구글 시트에서 데이터 가져오기
  const fetchPlayersData = async (url: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const csvText = await response.text();
      const parsedPlayers = parseCSV(csvText);

      setPlayers(parsedPlayers);
      setLastUpdated(new Date());

      // 캐시에 저장
      localStorage.setItem(CACHE_KEY, JSON.stringify(parsedPlayers));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());

      return parsedPlayers;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '데이터를 가져오는 중 오류가 발생했습니다';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 캐시된 데이터 로드
  const loadCachedData = () => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

      if (cachedData && cacheTimestamp) {
        const age = Date.now() - parseInt(cacheTimestamp);
        if (age < CACHE_DURATION) {
          const parsedData = JSON.parse(cachedData);
          setPlayers(parsedData);
          setLastUpdated(new Date(parseInt(cacheTimestamp)));
          return true;
        }
      }
    } catch (err) {
      console.error('캐시 로드 실패:', err);
    }
    return false;
  };

  // 데이터 새로고침
  const refreshData = async () => {
    if (GOOGLE_SHEETS_CSV_URL && GOOGLE_SHEETS_CSV_URL !== 'https://docs.google.com/spreadsheets/d/your-sheet-id/export?format=csv') {
      try {
        await fetchPlayersData(GOOGLE_SHEETS_CSV_URL);
      } catch (err) {
        console.error('데이터 새로고침 실패:', err);
        throw err;
      }
    } else {
      throw new Error('구글 시트 URL이 설정되지 않았습니다. 관리자에게 문의하세요.');
    }
  };

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    // URL이 설정되어 있으면 자동으로 데이터 로드
    if (GOOGLE_SHEETS_CSV_URL && GOOGLE_SHEETS_CSV_URL !== 'https://docs.google.com/spreadsheets/d/your-sheet-id/export?format=csv') {
      // 캐시된 데이터가 있으면 먼저 로드
      const hasCachedData = loadCachedData();
      
      // 캐시가 없거나 오래되었으면 새로 가져오기
      if (!hasCachedData) {
        fetchPlayersData(GOOGLE_SHEETS_CSV_URL).catch(console.error);
      }
    }
  }, []);

  const getTopScorers = () => {
    if (players.length === 0) return [];
    const maxGoals = Math.max(...players.map(p => p.goals));
    return players.filter(p => p.goals === maxGoals);
  };

  const getTopAssisters = () => {
    if (players.length === 0) return [];
    const maxAssists = Math.max(...players.map(p => p.assists));
    return players.filter(p => p.assists === maxAssists);
  };

  // 기존 함수들은 호환성을 위해 유지 (첫 번째 리더만 반환)
  const getTopScorer = () => {
    const topScorers = getTopScorers();
    return topScorers.length > 0 ? topScorers[0] : null;
  };

  const getTopAssister = () => {
    const topAssisters = getTopAssisters();
    return topAssisters.length > 0 ? topAssisters[0] : null;
  };

  return {
    players,
    loading,
    error,
    lastUpdated,
    refreshData,
    getTopScorer,
    getTopAssister,
    getTopScorers,
    getTopAssisters
  };
}