import React, { useState } from 'react';
import teamLogo from './FRC9427-teamloge.jpg'; 
import seasonLogo from './2026FRC-REBUILT-logo.webp'; 

const BOSPHORUS_TEAMS = ["5665", "5773", "5883", "6417", "6431", "6838", "6988", "7632", "7672", "7729", "8169", "8613", "8725", "9001", "9079", "9427", "9441", "9468", "9583", "9610", "10213", "10244", "10261", "10337", "10428", "10911", "10914", "10920", "10932", "11095", "11164", "11166", "11244", "11255", "11266", "11365", "11401"];
const YEDITEPE_TEAMS = ["2905", "4481", "5553", "6014", "6232", "6417", "6431", "6988", "6989", "7444", "7576", "7632", "7742", "8042", "8058", "8079", "8151", "8169", "8173", "8584", "8613", "8725", "8759", "9079", "9102", "9427", "9519", "9601", "10064", "10216", "10230", "10396", "10907", "11010", "11300"];

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

  const TEAM_PASSWORD = "FRC9427";

  const handleLogin = () => {
    if (password === TEAM_PASSWORD) setIsLoggedIn(true);
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
            <input type={showPassword ? "text" : "password"} placeholder="請輸入隊員密碼" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.inputLarge} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeButtonLarge}>
              {showPassword ? <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> : <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>}
            </button>
          </div>
          <button onClick={handleLogin} style={styles.startButtonLarge}>Log in</button>
        </div>
      </div>
    );
  }

  if (!stage) {
    return (
      <div style={styles.container}>
        <div style={styles.brandTitleContainer}><img src={seasonLogo} alt="2026 Logo" style={styles.seasonLogoSmall} /></div>
        <div style={styles.selectionArea}>
          <h2 style={styles.mainSelectionTitle}>REGION SELECTION</h2>
          
          <div style={styles.accordionBox}>
            <button onClick={() => setSelectedRegional(selectedRegional === 'Bosphorus' ? null : 'Bosphorus')} style={selectedRegional === 'Bosphorus' ? styles.bigTechButtonActive : styles.bigTechButton}>
              Bosphorus Regional {selectedRegional === 'Bosphorus' ? '▲' : '▼'}
            </button>
            {selectedRegional === 'Bosphorus' && (
              <div style={styles.subLineArea}>
                <button onClick={() => confirmStage('Bosphorus', 'Bosphorus Quals')} style={tempStage === 'Bosphorus Quals' ? styles.subButtonActive : styles.subButton}>Qualifications</button>
                <button onClick={() => confirmStage('Bosphorus', 'Bosphorus Practice')} style={tempStage === 'Bosphorus Practice' ? styles.subButtonActive : styles.subButton}>Practice</button>
              </div>
            )}
          </div>

          <div style={styles.accordionBox}>
            <button onClick={() => setSelectedRegional(selectedRegional === 'Yeditepe' ? null : 'Yeditepe')} style={selectedRegional === 'Yeditepe' ? styles.bigTechButtonActive : styles.bigTechButton}>
              Yeditepe Regional {selectedRegional === 'Yeditepe' ? '▲' : '▼'}
            </button>
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

  if (!isScoutingStarted) {
    return (
      <div style={styles.container}>
        <div style={styles.brandTitleContainer}><img src={seasonLogo} alt="2026 Logo" style={styles.seasonLogoSmall} /></div>
        <div style={styles.setupBox}>
          <h2 style={{color: '#ffde03', fontSize: '28px'}}>{stage} Setup</h2>
          
          <div style={styles.fieldGroup}>
            <label style={styles.label}>1. Match Number</label>
            <input type="number" placeholder="Enter Match #" value={matchNumber} onChange={(e)=>setMatchNumber(e.target.value)} style={styles.inputSmall} />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>2. Alliance Position</label>
            <div style={styles.grid6}>
              {['Red1', 'Red2', 'Red3', 'Blue1', 'Blue2', 'Blue3'].map(pos => (
                <button key={pos} onClick={() => setAlliancePos(pos)} style={{
                  ...styles.posBtn,
                  backgroundColor: alliancePos === pos ? (pos.includes('Red') ? '#ff4d4d' : '#4d94ff') : '#333',
                  borderColor: pos.includes('Red') ? '#ff4d4d' : '#4d94ff'
                }}>{pos}</button>
              ))}
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>3. Team Number</label>
            <input type="text" placeholder="Enter Team #" value={teamNumber} onChange={(e)=>setTeamNumber(e.target.value)} style={{...styles.inputSmall, borderColor: (teamNumber && !isValidTeam()) ? 'red' : '#ffde03'}} />
            {teamNumber && !isValidTeam() && <p style={{color: 'red', fontSize: '12px', marginTop: '5px'}}>⚠️ 不在 {selectedRegional} 參賽名單中</p>}
          </div>

          <div style={{marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
            <button 
              disabled={!matchNumber || !alliancePos || !isValidTeam()} 
              onClick={() => setIsScoutingStarted(true)} 
              style={{...styles.startButtonLarge, opacity: (!matchNumber || !alliancePos || !isValidTeam()) ? 0.5 : 1}}
            >
              Start Scouting
            </button>
            <button onClick={() => {setStage(null); setTempStage(null);}} style={styles.backButtonBox}>
              ← Back to Regions
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.brandTitleContainer}><img src={seasonLogo} alt="2026 Logo" style={styles.seasonLogoSmall} /></div>
      <h2 style={{color: '#FFD700', fontSize: '32px'}}>{stage}</h2>
      <div style={styles.infoBanner}>
        <p>Match: <b>{matchNumber}</b> | {alliancePos} | Team: <b>{teamNumber}</b></p>
      </div>
      <p style={{marginTop: '40px', color: '#888'}}>Scouting Content Area...</p>
      <button onClick={() => setIsScoutingStarted(false)} style={{...styles.backButtonBox, marginTop: '50px'}}>← Reset Info</button>
    </div>
  );
}

const styles = {
  container: { textAlign: 'center', backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '20px', position: 'relative' },
  header: { marginBottom: '40px' },
  mainLogoLarge: { width: '180px', height: 'auto', marginBottom: '20px' },
  mainTeamNameLarge: { fontSize: '50px', margin: '0', color: '#fff', letterSpacing: '8px', fontWeight: '900' },
  loginBoxLarge: { width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' },
  mainTeamNumberLarge: { color: '#ffde03', fontSize: '36px', fontWeight: '900' },
  inputLarge: { padding: '18px', paddingRight: '60px', fontSize: '20px', borderRadius: '12px', border: '3px solid #ffde03', width: '100%', textAlign: 'center', backgroundColor: '#0a0a0a', color: '#fff' },
  passwordContainerLarge: { position: 'relative', width: '100%', display: 'flex', alignItems: 'center' },
  eyeButtonLarge: { position: 'absolute', right: '15px', background: 'transparent', border: 'none', cursor: 'pointer' },
  startButtonLarge: { width: '240px', height: '65px', fontSize: '22px', fontWeight: 'bold', backgroundColor: '#ffde03', color: 'black', borderRadius: '35px', border: 'none', cursor: 'pointer' },
  brandTitleContainer: { position: 'absolute', top: '20px', left: '20px' },
  seasonLogoSmall: { width: '100px', height: 'auto' },
  selectionArea: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' },
  mainSelectionTitle: { color: '#fff', marginBottom: '30px', fontSize: '32px', fontWeight: 'bold' },
  accordionBox: { width: '350px' },
  bigTechButton: { width: '100%', padding: '20px', fontSize: '18px', fontWeight: '900', color: '#00d4ff', border: '2px solid #00d4ff', backgroundColor: 'transparent', borderRadius: '12px' },
  bigTechButtonActive: { width: '100%', padding: '20px', fontSize: '18px', fontWeight: '900', backgroundColor: '#00d4ff', color: '#000', borderRadius: '12px 12px 0 0' },
  subLineArea: { display: 'flex', justifyContent: 'space-around', padding: '20px', border: '2px solid #00d4ff', borderTop: 'none', borderRadius: '0 0 12px 12px', gap: '10px' },
  subButton: { flex: 1, padding: '12px', backgroundColor: '#1a1a1a', color: '#00d4ff', border: '1px solid #00d4ff', borderRadius: '8px' },
  subButtonActive: { flex: 1, padding: '12px', backgroundColor: '#00d4ff', color: '#000', borderRadius: '8px', fontWeight: 'bold' },
  setupBox: { width: '100%', maxWidth: '400px', backgroundColor: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #333' },
  fieldGroup: { marginBottom: '25px', textAlign: 'left' },
  label: { display: 'block', marginBottom: '10px', fontSize: '18px', color: '#ccc', fontWeight: '600' },
  inputSmall: { width: '100%', padding: '14px', borderRadius: '10px', border: '2px solid #ffde03', backgroundColor: '#000', color: '#fff', fontSize: '18px', outline: 'none' },
  grid6: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' },
  posBtn: { padding: '12px 5px', borderRadius: '8px', border: '2px solid', color: '#fff', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' },
  backButtonBox: { padding: '12px 25px', backgroundColor: 'transparent', color: '#888', border: '1px solid #444', borderRadius: '10px', fontSize: '15px', cursor: 'pointer' },
  infoBanner: { backgroundColor: '#1a1a1a', padding: '15px 30px', borderRadius: '40px', border: '1px solid #333', marginTop: '20px' }
};

export default App;