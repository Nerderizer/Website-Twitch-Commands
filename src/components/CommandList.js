import React, { useEffect, useState } from 'react';

export default function CommandList() {
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    async function fetchCommands() {
      try {
        const res = await fetch('https://Nerderizer.github.io/Website-Twitch-Commands/commands.json');
        const data = await res.json();
        setCommands(data);
      } catch (err) {
        console.error("Failed to fetch commands:", err);
      }
    }

    fetchCommands();
    const interval = setInterval(fetchCommands, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  return (
    <table>
      <thead>
        <tr><th>Action Name</th><th>ID</th></tr>
      </thead>
      <tbody>
        {commands.map((c) => (
          <tr key={c.Id}><td>{c.Name}</td><td>{c.Id}</td></tr>
        ))}
      </tbody>
    </table>
  );
}
