import React, { useState } from 'react';
import teamLogo from './FRC9427-teamloge.jpg'; 
import seasonLogo from './2026FRC-REBUILT-logo.webp'; 

function App() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedRegional, setSelectedRegional] = useState(null);
  const [stage, setStage] = useState(null); // 最終確定的階段
  const [tempStage, setTempStage] = useState(null); // 用來追蹤「當前點選」的高亮狀態
  const [showPassword, setShowPassword] = useState(false);
  const TEAM_PASSWORD = "FRC9427";

  const handleLogin = () => {
    if (password === TEAM_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert("密碼錯誤！");
      setPassword("");
    }
  };

  // 點擊子選項時的處理邏輯
  const confirmStage = (stageName) => {
    setTempStage(stageName); // 立即觸發高亮顏色變化
    setTimeout(() => {
        setStage(stageName); // 延遲跳轉，讓使用者看清選擇
    }, 250);
  };

  // 第一層：登入畫面
  if (!isLoggedIn) {
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <img src={teamLogo} alt="Team Logo" style={styles.mainLogoLarge} />
          <h1 style={styles.mainTeamNameLarge}>IDEER</h1>
        </header>

        <div style={styles.loginBoxLarge}>
          <h2 style={styles.mainTeamNumberLarge}>Team 9427</h2>
          <div style={styles.passwordContainerLarge}>
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="請輸入隊員密碼" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.inputLarge}
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              style={styles.eyeButtonLarge}
            >
              {/* 眼睛圖案：確保 path 完整，並根據 showPassword 切換 */}
              {showPassword ? (
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </button>
          </div>
          <button onClick={handleLogin} style={styles.startButtonLarge}>Log in</button>
        </div>
      </div>
    );
  }

  // 第二層：賽事選擇 (包含高亮邏輯)
  if (!stage) {
    return (
      <div style={styles.container}>
        <div style={styles.brandTitleContainer}>
            <img src={seasonLogo} alt="2026 Logo" style={styles.seasonLogoSmall} />
        </div>

        <div style={styles.selectionArea}>
          <h2 style={styles.mainSelectionTitle}>REGION SELECTION</h2>
          
          {/* Bosphorus 區域 */}
          <div style={styles.accordionBox}>
            <button 
              onClick={() => setSelectedRegional(selectedRegional === 'Bosphorus' ? null : 'Bosphorus')} 
              style={selectedRegional === 'Bosphorus' ? styles.bigTechButtonActive : styles.bigTechButton}
            >
              Bosphorus Regional {selectedRegional === 'Bosphorus' ? '▲' : '▼'}
            </button>
            {selectedRegional === 'Bosphorus' && (
              <div style={styles.subLineArea}>
                <button 
                    onClick={() => confirmStage('Bosphorus Quals')} 
                    style={tempStage === 'Bosphorus Quals' ? styles.subButtonActive : styles.subButton}
                >
                    Qualifications
                </button>
                <button 
                    onClick={() => confirmStage('Bosphorus Semis')} 
                    style={tempStage === 'Bosphorus Semis' ? styles.subButtonActive : styles.subButton}
                >
                    Semifinals
                </button>
              </div>
            )}
          </div>

          {/* Yeditepe 區域 */}
          <div style={styles.accordionBox}>
            <button 
              onClick={() => setSelectedRegional(selectedRegional === 'Yeditepe' ? null : 'Yeditepe')} 
              style={selectedRegional === 'Yeditepe' ? styles.bigTechButtonActive : styles.bigTechButton}
            >
              Yeditepe Regional {selectedRegional === 'Yeditepe' ? '▲' : '▼'}
            </button>
            {selectedRegional === 'Yeditepe' && (
              <div style={styles.subLineArea}>
                <button 
                    onClick={() => confirmStage('Yeditepe Quals')} 
                    style={tempStage === 'Yeditepe Quals' ? styles.subButtonActive : styles.subButton}
                >
                    Qualifications
                </button>
                <button 
                    onClick={() => confirmStage('Yeditepe Semis')} 
                    style={tempStage === 'Yeditepe Semis' ? styles.subButtonActive : styles.subButton}
                >
                    Semifinals
                </button>
              </div>
            )}
          </div>
          <button onClick={() => {setIsLoggedIn(false); setTempStage(null);}} style={styles.logoutButton}>Log Out</button>
        </div>
      </div>
    );
  }

  // 第三層：計分畫面
  return (
    <div style={styles.container}>
      <div style={styles.brandTitleContainer}>
          <img src={seasonLogo} alt="2026 Logo" style={styles.seasonLogoSmall} />
      </div>
      <div style={styles.selectionArea}>
        <h2 style={{ color: '#FFD700', fontSize: '32px', marginBottom: '10px' }}>{stage}</h2>
        <div style={styles.scoreControl}>
          <p style={{ fontSize: '28px', fontWeight: 'bold' }}>Score: {score}</p>
          <button onClick={() => setScore(score + 1)} style={styles.scoreCircle}>+1</button>
          <br/><br/>
          <button onClick={() => setScore(0)} style={styles.backButton}>Reset</button>
        </div>
        <button onClick={() => {setStage(null); setTempStage(null);}} style={styles.backButton}>← Back to Menu</button>
      </div>
    </div>
  );
}

const styles = {
  container: { textAlign: 'center', backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'Arial', padding: '20px', position: 'relative' },
  header: { marginBottom: '40px' },
  mainLogoLarge: { width: '220px', height: 'auto', marginBottom: '20px', filter: 'drop-shadow(0px 0px 20px rgba(255, 222, 3, 0.4))' },
  mainTeamNameLarge: { fontSize: '64px', margin: '0', color: '#fff', letterSpacing: '12px', fontWeight: '900' },
  loginBoxLarge: { width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' },
  mainTeamNumberLarge: { color: '#ffde03', fontSize: '48px', fontWeight: '900', letterSpacing: '5px' },
  inputLarge: { padding: '22px', paddingRight: '60px', fontSize: '24px', borderRadius: '15px', border: '3px solid #ffde03', width: '100%', textAlign: 'center', backgroundColor: '#0a0a0a', color: '#fff', outline: 'none' },
  passwordContainerLarge: { position: 'relative', width: '100%', display: 'flex', alignItems: 'center' },
  eyeButtonLarge: { position: 'absolute', right: '20px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  startButtonLarge: { width: '260px', height: '75px', fontSize: '26px', fontWeight: 'bold', backgroundColor: '#ffde03', color: 'black', borderRadius: '40px', border: 'none', cursor: 'pointer' },
  brandTitleContainer: { position: 'absolute', top: '20px', left: '20px', zIndex: 10 },
  seasonLogoSmall: { width: '120px', height: 'auto' },
  selectionArea: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' },
  mainSelectionTitle: { color: '#fff', marginBottom: '40px', fontSize: '38px', fontWeight: 'bold' },
  accordionBox: { width: '380px' },
  bigTechButton: { width: '100%', padding: '25px 20px', fontSize: '20px', fontWeight: '900', color: '#00d4ff', border: '2px solid #00d4ff', backgroundColor: 'transparent', borderRadius: '15px' },
  bigTechButtonActive: { width: '100%', padding: '25px 20px', fontSize: '20px', fontWeight: '900', backgroundColor: '#00d4ff', color: '#000', borderRadius: '15px 15px 0 0' },
  subLineArea: { display: 'flex', justifyContent: 'space-around', padding: '25px 15px', backgroundColor: 'rgba(0, 212, 255, 0.05)', border: '2px solid #00d4ff', borderTop: 'none', borderRadius: '0 0 15px 15px', gap: '10px' },
  
  // 普通子按鈕
  subButton: { flex: 1, padding: '15px 10px', backgroundColor: '#1a1a1a', color: '#00d4ff', border: '1px solid #00d4ff', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold' },
  
  // 被點選時的高亮按鈕
  subButtonActive: { flex: 1, padding: '15px 10px', backgroundColor: '#00d4ff', color: '#000', border: '1px solid #fff', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', boxShadow: '0px 0px 15px #00d4ff' },
  
  scoreCircle: { width: '130px', height: '130px', borderRadius: '50%', backgroundColor: '#ffde03', color: 'black', fontSize: '36px', fontWeight: 'bold', border: 'none' },
  backButton: { backgroundColor: 'transparent', color: '#888', border: 'none', marginTop: '20px', cursor: 'pointer' },
  logoutButton: { marginTop: '50px', backgroundColor: 'transparent', color: '#888', border: '1px solid #888', padding: '10px 25px', borderRadius: '5px' }
};

export default App;