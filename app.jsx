import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import { AGE } from './constants';

// ── UserPreferenceForm ─────────────────────────────────────────────────────
// Demonstrates:
//   - Local state  : nameInput (controlled text input), submitted (toggle view)
//   - Context state: userName and userAge written to AppContext via setUserName / setUserAge
//   - Props        : AGE values passed as onClick props to each age button
function UserPreferenceForm() {
  const { userName, setUserName, userAge, setUserAge } = useApp();

  // Local state — only this component needs these values
  const [nameInput, setNameInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!nameInput.trim()) return;
    setUserName(nameInput.trim().split(' ')[0]); // save first name to global context
    setSubmitted(true);
  }

  // ── After submitting: show the saved preferences ───────────────────────
  if (submitted) {
    return (
      <div style={{
        maxWidth: 480, margin: '40px auto', padding: '28px 24px',
        background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 16
      }}>
        <p style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 12 }}>
          ✅ Preferences saved!
        </p>
        <p style={{ color: 'var(--text-primary)', marginBottom: 6 }}>
          <strong>Name:</strong> {userName}
        </p>
        <p style={{ color: 'var(--text-primary)', marginBottom: 20 }}>
          <strong>Age group:</strong> {{ kids: 'Kids (Under 13)', teen: 'Teen (13–17)', adult: 'Adult (18+)' }[userAge]}
        </p>
        <button className="confirm-btn" onClick={() => { setSubmitted(false); setNameInput(''); }}>
          Edit preferences
        </button>
      </div>
    );
  }

  // ── Input form ─────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 480, margin: '40px auto', padding: '28px 24px',
        background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 16
      }}
    >
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: 18 }}>
        Lesson 2 — User Preference Input System
      </p>

      {/* Controlled input — value is always in sync with nameInput state */}
      <label style={{ display: 'block', color: 'var(--text-primary)', fontWeight: 600, marginBottom: 8 }}>
        What's your name?
      </label>
      <input
        type="text"
        className="chat-text-input"
        style={{ width: '100%', marginBottom: 20 }}
        placeholder="Type your name..."
        value={nameInput}
        onChange={e => setNameInput(e.target.value)}
        autoComplete="off"
      />

      {/* Age picker — each button receives its value as a prop via onClick */}
      <label style={{ display: 'block', color: 'var(--text-primary)', fontWeight: 600, marginBottom: 10 }}>
        Select your age group:
      </label>
      <div className="choice-row" style={{ marginBottom: 24 }}>
        {[
          [AGE.KIDS,  'Kids',  'Under 13'],
          [AGE.TEEN,  'Teen',  '13–17'  ],
          [AGE.ADULT, 'Adult', '18+'    ],
        ].map(([val, label, sub]) => (
          <button
            key={val}
            type="button"
            className="choice-btn"
            style={{
              background:   userAge === val ? 'var(--accent-glow)' : '',
              borderColor:  userAge === val ? 'var(--accent)'      : '',
            }}
            onClick={() => setUserAge(val)}   // prop: passes val into setUserAge
          >
            {label} <span className="choice-sub">{sub}</span>
          </button>
        ))}
      </div>

      <button type="submit" className="confirm-btn" disabled={!nameInput.trim()}>
        Save my preferences
      </button>
    </form>
  );
}

// ── AppInner ───────────────────────────────────────────────────────────────
// Sits inside AppProvider so it can call useApp() safely
function AppInner() {
  return (
    <div className="app-root">
      <Navbar />               {/* Lesson 2 — now has theme toggle + reset */}
      <UserPreferenceForm />   {/* Lesson 2 — name input + age picker       */}
    </div>
  );
}

// ── App (default export) ───────────────────────────────────────────────────
// AppProvider wraps everything so all child components share the same state
export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
