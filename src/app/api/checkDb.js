// pages/index.js
import React from 'react';
import connectToDatabase from '@/db/db'; // Adjust the path as needed

function HomePage() {
  const handleConnect = async () => {
    await connectToDatabase();
  };

  return (
    <div>
      <h1>Welcome to Next.js with MongoDB!</h1>
      <button onClick={handleConnect}>Connect to MongoDB</button>
    </div>
  );
}

export default HomePage;
