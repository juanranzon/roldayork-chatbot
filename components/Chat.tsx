
import { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy el Asistente Roldayork 🌄 ¿Planeas visitar Roldanillo o ya estás aquí? ¿Te interesa volar en parapente, conocer sitios culturales o necesitas información sobre alojamiento y gastronomía?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    });

    const data = await response.json();
    setMessages([...newMessages, { role: 'assistant', content: data.response }]);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Asistente Roldayork 🪂</h1>
      <div style={{ border: '1px solid #ccc', padding: 10, height: 400, overflowY: 'scroll', marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <p><strong>{msg.role === 'user' ? 'Tú' : 'Asistente'}:</strong> {msg.content}</p>
          </div>
        ))}
        {loading && <p>Escribiendo...</p>}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Haz una pregunta sobre Roldanillo..."
        style={{ width: '80%', padding: 8 }}
      />
      <button onClick={sendMessage} style={{ padding: 8, marginLeft: 10 }}>Enviar</button>
    </div>
  );
};

export default Chat;
