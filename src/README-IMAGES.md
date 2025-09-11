# 이미지 설정 가이드

이 웹사이트는 로컬 이미지 파일을 사용하도록 설정되어 있습니다. 현재는 Unsplash 이미지를 임시로 사용하고 있지만, 실제 환경에서는 다음과 같이 로컬 이미지를 설정할 수 있습니다.

## 디렉토리 구조

```
public/
├── images/
│   ├── players/          # 선수 개인 사진
│   │   ├── kim-minsu.jpg
│   │   ├── park-jiwon.jpg
│   │   ├── lee-dahye.jpg
│   │   ├── jung-hyunwoo.jpg
│   │   ├── choi-seoyeon.jpg
│   │   ├── han-taeyoung.jpg
│   │   ├── oh-seungmin.jpg
│   │   └── yoon-sungho.jpg
│   └── mom/              # Man of the Match 이미지
│       ├── kim-minsu-mom.jpg
│       ├── park-jiwon-mom.jpg
│       ├── jung-hyunwoo-mom.jpg
│       ├── oh-seungmin-mom.jpg
│       └── choi-seoyeon-mom.jpg
```

## 설정 방법

1. 프로젝트의 `public` 디렉토리에 `images` 폴더를 생성합니다.
2. `images` 안에 `players`와 `mom` 폴더를 생성합니다.
3. 각 선수의 사진을 해당 파일명으로 저장합니다.
4. `/data/mockData.ts` 파일에서 이미지 경로를 다음과 같이 수정합니다:

```typescript
// 예시:
photo: "/images/players/kim-minsu.jpg"
image: "/images/mom/kim-minsu-mom.jpg"
```

## 이미지 권장 사양

- **선수 프로필 사진**: 400x400px, JPG/PNG
- **Man of the Match 이미지**: 1920x1080px, JPG/PNG
- 파일 크기: 각 이미지당 500KB 이하 권장

## 현재 상태

현재는 Unsplash API를 통해 임시 이미지를 사용하고 있습니다. 실제 프로덕션 환경에서는 위의 디렉토리 구조에 따라 로컬 이미지를 배치하고 `mockData.ts` 파일의 이미지 경로를 수정해주세요.