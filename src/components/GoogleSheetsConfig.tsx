import { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, ExternalLink, Info } from 'lucide-react';

interface GoogleSheetsConfigProps {
  onUrlChange: (url: string) => void;
  currentUrl?: string;
}

export function GoogleSheetsConfig({ onUrlChange, currentUrl }: GoogleSheetsConfigProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState(currentUrl || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUrlChange(url);
    setIsOpen(false);
  };

  const sampleUrl = "https://docs.google.com/spreadsheets/d/your-sheet-id/export?format=csv";

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition-colors z-50"
        title="Google Sheets 설정"
      >
        <Settings className="w-6 h-6 text-white" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-2xl border border-gray-800 p-6 max-w-2xl w-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Google Sheets 설정</h3>
            </div>

            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-200">
                  <p className="font-medium mb-2">설정 방법:</p>
                  <ol className="list-decimal list-inside space-y-1 text-blue-300">
                    <li>선수 데이터가 포함된 Google 스프레드시트를 엽니다</li>
                    <li>컬럼에 다음이 포함되어야 합니다: Name, Goals, Assists, Matches (Photo는 선택사항)</li>
                    <li>파일 → 공유 → 웹에 게시로 이동합니다</li>
                    <li>"쉼표로 구분된 값(.csv)" 형식을 선택합니다</li>
                    <li>생성된 URL을 복사하여 아래에 붙여넣습니다</li>
                  </ol>
                  <div className="mt-3 p-2 bg-yellow-900/30 border border-yellow-700 rounded text-yellow-200 text-xs">
                    <strong>중요:</strong> 스프레드시트가 "공개적으로 웹에서 볼 수 있음"으로 설정되어야 합니다.
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Google Sheets CSV URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={sampleUrl}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="text-xs text-gray-400">
                <p className="mb-2">스프레드시트 구성 예시:</p>
                <div className="bg-gray-800 p-3 rounded text-green-400 font-mono text-xs">
                  <div className="mb-2">첫 번째 행 (헤더):</div>
                  <div className="text-yellow-400 mb-1">Name,Goals,Assists,Matches,Photo</div>
                  <div className="mb-2 text-gray-400">두 번째 행부터 (데이터):</div>
                  <div className="text-blue-300">김민수,15,8,20,https://example.com/photo1.jpg</div>
                  <div className="text-blue-300">박지원,12,15,22,https://example.com/photo2.jpg</div>
                  <div className="text-blue-300">이다혜,9,6,18,https://example.com/photo3.jpg</div>
                </div>
                <div className="mt-2 text-xs">
                  <p className="text-yellow-400">필수 컬럼:</p>
                  <ul className="text-gray-300 ml-4 list-disc">
                    <li><strong>Name</strong>: 선수 이름</li>
                    <li><strong>Goals</strong>: 골 수 (숫자)</li>
                    <li><strong>Assists</strong>: 어시스트 수 (숫자)</li>
                    <li><strong>Matches</strong>: 경기 수 (숫자)</li>
                    <li><strong>Photo</strong>: 사진 URL (선택사항)</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <a
                  href="https://support.google.com/docs/answer/183965"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Google Sheets 도움말
                </a>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    설정 저장
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}