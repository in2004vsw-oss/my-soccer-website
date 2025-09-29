export interface Player {
  id: number;
  name: string;
  goals: number;
  assists: number;
  matches: number;
  photo: string;
}

export interface ManOfTheMatch {
  id: number;
  player: Player;
  week: string;
  description: string;
  image: string;
}

// 기본 플레이어 데이터 - Man of the Match 히어로 섹션을 위한 샘플 선수들
const samplePlayers: Player[] = [
  {
    id: 1,
    name: "김선빈",
    goals: 9,
    assists: 4,
    matches: 1,
    photo: "https://images.unsplash.com/photo-1516981299556-c5b4e1661279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzb2NjZXIlMjBwbGF5ZXIlMjBhY3Rpb258ZW58MXx8fHwxNzU3NTY5MzI3fDA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: 2,
    name: "박지원",
    goals: 0,
    assists: 0,
    matches: 0,
    photo: "https://images.unsplash.com/photo-1674941063377-69c61db07740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBtaWRmaWVsZGVyJTIwcGFzc2luZ3xlbnwxfHx8fDE3NTc1NTc0Mzl8MA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: 3,
    name: "이다혜",
    goals: 0,
    assists: 0,
    matches: 0,
    photo: "https://images.unsplash.com/photo-1650501890232-886c08e79a27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBzb2NjZXIlMjBkZWZlbmRlcnxlbnwxfHx8fDE3NTc1NjkzMzR8MA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: 4,
    name: "정현우",
    goals: 0,
    assists: 0,
    matches: 0,
    photo: "https://images.unsplash.com/photo-1730816447853-192e89120832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0cmlrZXIlMjBnb2FsfGVufDF8fHx8MTc1NzU1NzQzOHww&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: 5,
    name: "최서연",
    goals: 0,
    assists: 0,
    matches: 0,
    photo: "https://images.unsplash.com/photo-1551390415-0de411440ca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjB0ZWFtJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzU3NDc5MTk5fDA&ixlib=rb-4.1.0&q=80&w=400"
  }
];



export const manOfTheMatchHistory: ManOfTheMatch[] = [
  {
    id: 1,
    player: samplePlayers[0], // 김선빈
    week: "2주차",
    description: "최고령임에도 불구하고 놀라운 경기력을 보여주며 팀의 승리를 이끌었습니다.",
    image: "images/motm_week2.jpeg"
  },

];

// 사용하지 않는 함수들 제거 - usePlayersData 훅에서 처리