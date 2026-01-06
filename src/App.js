import React, { useState, useEffect } from 'react';
import teamLogo from './FRC9427-teamloge.jpg'; 
import seasonLogo from './2026FRC-REBUILT-logo.webp'; 

const BOSPHORUS_TEAMS = ["5665", "5773", "5883", "6417", "6431", "6838", "6988", "7632", "7672", "7729", "8169", "8613", "8725", "9001", "9079", "9427", "9441", "9468", "9583", "9610", "10213", "10244", "10261", "10337", "10428", "10911", "10914", "10920", "10932", "11095", "11164", "11166", "11244", "11255", "11266", "11365", "11401"];
const YEDITEPE_TEAMS = ["2905", "4481", "5553", "6014", "6232", "6417", "6431", "6988", "6989", "7444", "7576", "7632", "7742", "8042", "8058", "8079", "8084", "8151", "8169", "8173", "8584", "8613", "8725", "8759", "9079", "9102", "9427", "9519", "9601", "10064", "10216", "10230", "10396", "10907", "11010", "11300"];

function App() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedRegional, setSelectedRegional] = useState(null);
  const [stage, setStage] = useState(null); 
  const [tempStage, setTempStage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const [matchNumber, setMatchNumber] = useState("");
  const [alliancePos, setAlliancePos] = useState(""); 
  const [teamNumber, setTeamNumber] = useState("");
  const [isScoutingStarted, setIsScoutingStarted] = useState(false);

  // --- Scouting 數據區域 ---
  const [autoLeave, setAutoLeave] = useState(false);
  const [autoCoral, setAutoCoral] = useState(0);
  const [autoAlgae, setAutoAlgae] = useState(0);
  const [teleopCoral, setTeleopCoral] = useState(0);
  const [teleopAlgae, setTeleopAlgae] = useState(0);
  const [foulCount, setFoulCount] = useState(0);
  const [defenseRating, setDefenseRating] = useState(0); 
  const [climbStatus, setClimbStatus] = useState("None");
  const [otherNotes, setOtherNotes] = useState("");

  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      document.head.appendChild(meta);
    }
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover';

    const style = document.createElement("style");
    style.innerHTML = `
      html, body { margin: 0; padding: 0; width: 100%; height: 100%; background-color: #000; color: white; }
      #root { min-height: 100%; width: 100%; }
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    `;
    document.head.appendChild(style);
  }, []);

  const handleLogin = () => {
    if (password === "FRC9427") setIsLoggedIn(true);
    else { alert("密碼錯誤！"); setPassword(""); }
  };

  const confirmStage = (region, stageName) => {
    setSelectedRegional(region);
    setTempStage(stageName);
    setTimeout(() => { setStage(stageName); }, 250);
  };

  const isValidTeam = () => {
    const list = selectedRegional === 'Bosphorus' ? BOSPHORUS_TEAMS : YEDITEPE_TEAMS;
    return list.includes(teamNumber);
  };

  const Counter = ({ label, value, setter, color = "#ffde03" }) => (
    <div style={styles.counterRow}>
      <span style={styles.counterLabel}>{label}</span>
      <div style={styles.counterControls}>
        <button onClick={() => setter(Math.max(0, value - 1))} style={styles.minusBtn}>-</button>
        <span style={styles.counterValue}>{value}</span>
        <button onClick={() => setter(value + 1)} style={{...styles.plusBtn, backgroundColor: color}}>+</button>
      </div>
    </div>
  );

  // 1. 登入頁面
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
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeButtonLarge}>
              {showPassword ? (
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              ) : (
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              )}
            </button>
          </div>
          <button onClick={handleLogin} style={styles.startButtonLarge}>Log in</button>
        </div>
      </div>
    );
  }

  // 2. 賽區選擇
  if (!stage) {
    return (
      <div style={styles.container}>
        <div style={styles.brandTitleContainer}><img src={seasonLogo} alt="2026 Logo" style={styles.seasonLogoSmall} /></div>
        <div style={styles.selectionArea}>
          <h2 style={styles.mainSelectionTitle}>REGION SELECTION</h2>
          <div style={styles.accordionBox}>
            <button onClick={() => setSelectedRegional(selectedRegional === 'Bosphorus' ? null : 'Bosphorus')} style={selectedRegional === 'Bosphorus' ? styles.bigTechButtonActive : styles.bigTechButton}>Bosphorus Regional {selectedRegional === 'Bosphorus' ? '▲' : '▼'}</button>
            {selectedRegional === 'Bosphorus' && (
              <div style={styles.subLineArea}>
                <button onClick={() => confirmStage('Bosphorus', 'Bosphorus Quals')} style={tempStage === 'Bosphorus Quals' ? styles.subButtonActive : styles.subButton}>Qualifications</button>
                <button onClick={() => confirmStage('Bosphorus', 'Bosphorus Practice')} style={tempStage === 'Bosphorus Practice' ? styles.subButtonActive : styles.subButton}>Practice</button>
              </div>
            )}
          </div>
          <div style={styles.accordionBox}>
            <button onClick={() => setSelectedRegional(selectedRegional === 'Yeditepe' ? null : 'Yeditepe')} style={selectedRegional === 'Yeditepe' ? styles.bigTechButtonActive : styles.bigTechButton}>Yeditepe Regional {selectedRegional === 'Yeditepe' ? '▲' : '▼'}</button>
            {selectedRegional === 'Yeditepe' && (
              <div style={styles.subLineArea}>
                <button onClick={() => confirmStage('Yeditepe', 'Yeditepe Quals')} style={tempStage === 'Yeditepe Quals' ? styles.subButtonActive : styles.subButton}>Qualifications</button>
                <button onClick={() => confirmStage('Yeditepe', 'Yeditepe Practice')} style={tempStage === 'Yeditepe Practice' ? styles.subButtonActive : styles.subButton}>Practice</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. Setup (整合防呆機制)
  if (!isScoutingStarted) {
    const isTeamValid = isValidTeam();
    const isTeamEmpty = teamNumber === "";
    const isMatchEmpty = matchNumber === "";
    const isPosEmpty = alliancePos === "";

    return (
      <div style={styles.container}>
        <div style={styles.setupBox}>
          <h2 style={{color: '#ffde03', fontSize: '28px', marginBottom: '30px'}}>{stage} Setup</h2>
          
          {/* 1. Match Number */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>1. Match Number</label>
            <input 
              type="number" 
              placeholder="Enter Match No." 
              value={matchNumber} 
              onChange={(e)=>setMatchNumber(e.target.value)} 
              style={{
                ...styles.inputMini, 
                borderColor: (isMatchEmpty && teamNumber !== "") ? '#ff4d4d' : '#ffde03' 
              }} 
            />
            {isMatchEmpty && teamNumber !== "" && <div style={styles.errorText}>* 必須填寫場次</div>}
          </div>

          {/* 2. Alliance Position */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>2. Alliance Position</label>
            <div style={styles.grid6}>
              {['Red1', 'Red2', 'Red3', 'Blue1', 'Blue2', 'Blue3'].map(pos => (
                <button key={pos} onClick={() => setAlliancePos(pos)} style={{
                  ...styles.posBtn,
                  backgroundColor: alliancePos === pos ? (pos.includes('Red') ? '#ff4d4d' : '#4d94ff') : '#333',
                  borderColor: pos.includes('Red') ? '#ff4d4d' : '#4d94ff',
                  opacity: (alliancePos && alliancePos !== pos) ? 0.5 : 1
                }}>{pos}</button>
              ))}
            </div>
            {isPosEmpty && !isTeamEmpty && <div style={styles.errorText}>* 必須選擇位置</div>}
          </div>

          {/* 3. Team Number */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>3. Team Number</label>
            <div style={{position: 'relative'}}>
              <input 
                type="text" 
                placeholder="Team #" 
                value={teamNumber} 
                onChange={(e)=>setTeamNumber(e.target.value)} 
                style={{
                  ...styles.inputMini, 
                  borderColor: (!isTeamValid && !isTeamEmpty) ? '#ff4d4d' : (isTeamValid ? '#4CAF50' : '#ffde03')
                }} 
              />
              {isTeamValid && <span style={{position: 'absolute', right: '15px', top: '15px'}}>✅</span>}
            </div>
            {!isTeamValid && !isTeamEmpty && (
              <div style={styles.errorText}>⚠️ 此隊伍不屬於 {selectedRegional} 賽區</div>
            )}
            {isTeamEmpty && !isMatchEmpty && <div style={styles.errorText}>* 請輸入參賽隊伍號碼</div>}
          </div>

          <button 
            disabled={!matchNumber || !alliancePos || !isTeamValid} 
            onClick={() => setIsScoutingStarted(true)} 
            style={{
              ...styles.startButtonLarge, 
              marginTop:'20px',
              backgroundColor: (!matchNumber || !alliancePos || !isTeamValid) ? '#444' : '#ffde03',
              color: (!matchNumber || !alliancePos || !isTeamValid) ? '#888' : '#000',
              cursor: (!matchNumber || !alliancePos || !isTeamValid) ? 'not-allowed' : 'pointer',
              width: '100%',
              borderRadius: '12px'
            }}
          >
            {!matchNumber || !alliancePos || !isTeamValid ? "請完成上方資訊" : "Start Scouting"}
          </button>
          
          <button onClick={() => {setStage(null); setTempStage(null);}} style={{...styles.backButtonBox, border:'none', marginTop:'15px', width:'100%'}}>← Back to Regions</button>
        </div>
      </div>
    );
  }

  // 4. Scouting Content Area
  return (
    <div style={styles.scoutingPage}>
      <div style={styles.scoutingHeader}>
        <div style={{color: alliancePos.includes('Red') ? '#ff4d4d' : '#4d94ff', fontWeight:'900', fontSize:'20px'}}>{alliancePos}</div>
        <div style={{fontSize:'18px', fontWeight:'700'}}>Match {matchNumber}</div>
        <div style={{color:'#ffde03', fontWeight:'900', fontSize:'20px'}}>Team {teamNumber}</div>
      </div>

      <div style={styles.scrollContent}>
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>--- AUTO ---</h3>
          <div style={styles.toggleRow}>
            <span>Leave Line</span>
            <button onClick={() => setAutoLeave(!autoLeave)} style={{...styles.switchBtn, backgroundColor: autoLeave ? '#4CAF50' : '#444'}}>{autoLeave ? "YES" : "NO"}</button>
          </div>
          <Counter label="Auto Coral" value={autoCoral} setter={setAutoCoral} />
          <Counter label="Auto Algae" value={autoAlgae} setter={setAutoAlgae} />
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>--- TELEOP ---</h3>
          <Counter label="Teleop Coral" value={teleopCoral} setter={setTeleopCoral} />
          <Counter label="Teleop Algae" value={teleopAlgae} setter={setTeleopAlgae} />
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>--- PERFORMANCE ---</h3>
          <Counter label="Fouls (犯規)" value={foulCount} setter={setFoulCount} color="#ff4d4d" />
          <div style={{marginTop:'20px'}}>
            <label style={styles.inputLabel}>Defense Rating (防守表現 1-5)</label>
            <div style={styles.ratingGrid}>
              {[1, 2, 3, 4, 5].map(num => (
                <button key={num} onClick={() => setDefenseRating(num)} style={{
                  ...styles.ratingBtn,
                  backgroundColor: defenseRating === num ? '#ffde03' : '#222',
                  color: defenseRating === num ? '#000' : '#fff'
                }}>{num}</button>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>--- ENDGAME ---</h3>
          <div style={styles.gridClimb}>
            {["None", "Park", "Shallow", "Deep"].map(s => (
              <button key={s} onClick={() => setClimbStatus(s)} style={{
                ...styles.climbBtn,
                backgroundColor: climbStatus === s ? '#ffde03' : '#222',
                color: climbStatus === s ? '#000' : '#fff'
              }}>{s}</button>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>--- OTHER NOTES ---</h3>
          <textarea 
            placeholder="機器出現無法行動、損壞、掉卡或其他特殊狀況..." 
            value={otherNotes}
            onChange={(e) => setOtherNotes(e.target.value)}
            style={styles.textArea}
          />
        </section>

        <div style={{padding: '40px 0', display:'flex', flexDirection:'column', gap:'15px'}}>
          <button style={styles.submitBtn} onClick={() => alert("數據已暫存！")}>Submit Scouting Data</button>
          <button onClick={() => { if(window.confirm("確定要重置並返回 Setup 嗎？資料將不會被保存。")) setIsScoutingStarted(false) }} style={styles.resetBtn}>← Edit Info (Reset)</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { textAlign: 'center', backgroundColor: '#000', height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', position: 'relative' },
  header: { marginBottom: '40px' },
  mainLogoLarge: { width: '180px', height: 'auto', marginBottom: '20px' },
  mainTeamNameLarge: { fontSize: '50px', margin: '0', color: '#fff', letterSpacing: '8px', fontWeight: '900' },
  loginBoxLarge: { width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' },
  mainTeamNumberLarge: { color: '#ffde03', fontSize: '36px', fontWeight: '900' },
  inputLarge: { padding: '18px', paddingRight: '60px', fontSize: '20px', borderRadius: '12px', border: '3px solid #ffde03', width: '100%', textAlign: 'center', backgroundColor: '#0a0a0a', color: '#fff' },
  passwordContainerLarge: { position: 'relative', width: '100%', maxWidth: '400px', display: 'flex', alignItems: 'center' },
  eyeButtonLarge: { position: 'absolute', right: '15px', background: 'transparent', border: 'none', cursor: 'pointer' },
  startButtonLarge: { width: '240px', height: '65px', fontSize: '22px', fontWeight: 'bold', backgroundColor: '#ffde03', color: 'black', borderRadius: '35px', border: 'none', cursor: 'pointer' },
  brandTitleContainer: { position: 'absolute', top: '20px', left: '20px' },
  seasonLogoSmall: { width: '100px', height: 'auto' },
  selectionArea: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' },
  mainSelectionTitle: { color: '#fff', marginBottom: '30px', fontSize: '32px', fontWeight: 'bold' },
  accordionBox: { width: '100%', maxWidth: '350px' },
  bigTechButton: { width: '100%', padding: '20px', fontSize: '18px', fontWeight: '900', color: '#00d4ff', border: '2px solid #00d4ff', backgroundColor: 'transparent', borderRadius: '12px' },
  bigTechButtonActive: { width: '100%', padding: '20px', fontSize: '18px', fontWeight: '900', backgroundColor: '#00d4ff', color: '#000', borderRadius: '12px 12px 0 0' },
  subLineArea: { display: 'flex', justifyContent: 'space-around', padding: '20px', border: '2px solid #00d4ff', borderTop: 'none', borderRadius: '0 0 12px 12px', gap: '10px' },
  subButton: { flex: 1, padding: '12px', backgroundColor: '#1a1a1a', color: '#00d4ff', border: '1px solid #00d4ff', borderRadius: '8px' },
  subButtonActive: { flex: 1, padding: '12px', backgroundColor: '#00d4ff', color: '#000', borderRadius: '8px', fontWeight: 'bold' },
  setupBox: { width: '90%', maxWidth: '400px', backgroundColor: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #333' },
  fieldGroup: { marginBottom: '20px', textAlign: 'left' },
  label: { display: 'block', marginBottom: '10px', fontSize: '16px', color: '#ccc' },
  inputMini: { width: '100%', padding: '15px', borderRadius: '10px', border: '2px solid #ffde03', backgroundColor: '#000', color: '#fff', fontSize: '18px' },
  errorText: { color: '#ff4d4d', fontSize: '13px', marginTop: '5px', fontWeight: 'bold' },
  grid6: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' },
  posBtn: { padding: '12px 5px', borderRadius: '8px', border: '2px solid', color: '#fff', fontWeight: 'bold' },
  backButtonBox: { padding: '12px 25px', backgroundColor: 'transparent', color: '#888', borderRadius: '10px', fontSize: '15px' },
  scoutingPage: { backgroundColor: '#000', minHeight: '100vh', width: '100%' },
  scoutingHeader: { position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#111', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #222' },
  scrollContent: { padding: '20px' },
  section: { marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #222' },
  sectionTitle: { color: '#666', fontSize: '14px', textAlign: 'center', letterSpacing: '4px', marginBottom: '25px' },
  toggleRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', fontSize: '18px', fontWeight: '600' },
  switchBtn: { padding: '10px 30px', borderRadius: '8px', border: 'none', color: '#fff', fontWeight: '900' },
  counterRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' },
  counterLabel: { fontSize: '18px', fontWeight: '600' },
  counterControls: { display: 'flex', alignItems: 'center', gap: '15px' },
  minusBtn: { width: '50px', height: '50px', borderRadius: '12px', border: 'none', backgroundColor: '#333', color: '#fff', fontSize: '24px' },
  plusBtn: { width: '50px', height: '50px', borderRadius: '12px', border: 'none', color: '#000', fontSize: '24px', fontWeight: '900' },
  counterValue: { fontSize: '26px', fontWeight: '900', minWidth: '40px', textAlign: 'center' },
  inputLabel: { display: 'block', marginBottom: '15px', color: '#888', fontSize: '15px' },
  ratingGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' },
  ratingBtn: { padding: '15px 0', borderRadius: '10px', border: 'none', fontSize: '18px', fontWeight: 'bold' },
  gridClimb: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  climbBtn: { padding: '18px', borderRadius: '12px', border: 'none', fontSize: '16px', fontWeight: 'bold' },
  textArea: { width: '100%', height: '120px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px', color: '#fff', padding: '15px', fontSize: '16px', outline: 'none' },
  submitBtn: { width: '100%', padding: '20px', backgroundColor: '#4CAF50', color: '#fff', borderRadius: '15px', border: 'none', fontSize: '18px', fontWeight: '900' },
  resetBtn: { background: 'none', color: '#666', border: 'none', fontSize: '14px', width: '100%', cursor: 'pointer' }
};

export default App;