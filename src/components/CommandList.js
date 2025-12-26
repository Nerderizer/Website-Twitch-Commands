import React, { useEffect, useState } from 'react';

export default function CommandList() {
  const [commands, setCommands] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCommands() {
      try {
        const res = await fetch('https://Nerderizer.github.io/Website-Twitch-Commands/commands.json');
        if (!res.ok) throw new Error("Failed to fetch JSON");
        const data = await res.json();
        setCommands(data);
        setError(false);
      } catch (err) {
        console.error("Failed to fetch commands:", err);
        setError(true);
      }
    }

    fetchCommands();
    const interval = setInterval(fetchCommands, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>Unable to load commands. Please try again later.</p>;
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #444', padding: '8px', backgroundColor: '#333' }}>Action Name</th>
            <th style={{ border: '1px solid #444', padding: '8px', backgroundColor: '#333' }}>ID</th>
          </tr>
        </thead>
        <tbody>
          {commands.map((c) => (
            <tr key={c.Id} style={{ backgroundColor: '#1e1e1e' }}>
              <td style={{ border: '1px solid #444', padding: '8px' }}>{c.Name}</td>
              <td style={{ border: '1px solid #444', padding: '8px' }}>{c.Id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
