import { useState, useRef, useEffect } from 'react';
import { h } from '../../constants';
import { usePageTitle } from '../../hooks/usePageTitle';
import { sports } from '../../data/sports';
import { sendMessage } from '../../services/anthropic';

const SUGGESTIONS = [
  'What is offside?',
  'Explain LBW',
  'Cricket vs Baseball',
  'How F1 works',
  "What's a googly?",
  'Tennis tiebreak',
  'NBA shot clock',
  'MMA weight classes',
];

const dotKeyframes = `
@keyframes dotPulse {
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1); }
}
`;

export default function ChatPage() {
  usePageTitle('AI Sports Tutor');
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: `Hey! I'm your AI Sports Tutor. Ask me anything about rules, strategies, or history across ${sports.length}+ sports.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, busy]);

  async function handleSend(text) {
    const msg = (text || input).trim();
    if (!msg || busy) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: msg }]);
    setBusy(true);

    try {
      const reply = await sendMessage(msg);
      setMessages((prev) => [...prev, { role: 'ai', text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: `Sorry, something went wrong: ${err.message}. Please try again.` },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const showSuggestions = messages.length <= 1;
  const hasInput = input.trim().length > 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxWidth: 600,
        margin: '0 auto',
        ...h,
      }}
    >
      <style>{dotKeyframes}</style>

      {/* ── Header ── */}
      <div
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderBottom: '1.5px solid #ede8e0',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          {'\u{1F916}'}
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800 }}>AI Sports Tutor</div>
          <div style={{ fontSize: 10, color: '#888' }}>
            Powered by Claude &middot; {sports.length} sports covered
          </div>
        </div>
      </div>

      {/* ── Messages ── */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 16px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}

        {busy && <LoadingDots />}

        {/* Suggestion chips */}
        {showSuggestions && !busy && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginTop: 8,
            }}
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 20,
                  border: '1.5px solid #e2ddd5',
                  background: '#fff',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all .15s',
                  ...h,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* ── Input ── */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1.5px solid #ede8e0',
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask about any sport..."
          disabled={busy}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 12,
            border: '1.5px solid #e2ddd5',
            background: '#fff',
            fontSize: 13,
            fontWeight: 500,
            outline: 'none',
            ...h,
          }}
        />
        <button
          onClick={() => handleSend()}
          disabled={busy || !hasInput}
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            border: 'none',
            background: hasInput ? '#16a34a' : '#d4d4d4',
            color: '#fff',
            fontSize: 18,
            fontWeight: 700,
            cursor: hasInput ? 'pointer' : 'default',
            transition: 'background .15s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {'\u2191'}
        </button>
      </div>
    </div>
  );
}

function MessageBubble({ message: m }) {
  const isUser = m.role === 'user';

  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div
        style={{
          maxWidth: '80%',
          padding: '10px 14px',
          borderRadius: 16,
          borderTopRightRadius: isUser ? 4 : 16,
          borderTopLeftRadius: isUser ? 16 : 4,
          background: isUser ? '#16a34a' : '#fff',
          color: isUser ? '#fff' : '#222',
          border: isUser ? 'none' : '1.5px solid #ede8e0',
          fontSize: 13,
          fontWeight: 500,
          lineHeight: 1.5,
          whiteSpace: 'pre-wrap',
          ...h,
        }}
      >
        {m.text}
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <div
        style={{
          padding: '10px 18px',
          borderRadius: 16,
          borderTopLeftRadius: 4,
          background: '#fff',
          border: '1.5px solid #ede8e0',
          display: 'flex',
          gap: 5,
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#999',
              display: 'inline-block',
              animation: 'dotPulse 1.2s infinite ease-in-out',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
