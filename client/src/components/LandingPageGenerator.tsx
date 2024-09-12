import React, { useState } from 'react';
import { generateLandingPage } from '../services/api';
import { shootConfetti } from '../utils/confetti';

const LandingPageGenerator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [landingPage, setLandingPage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      const result = await generateLandingPage(file);
      setLandingPage(result);
      shootConfetti();
    } catch (error) {
      console.error('Error generating landing page:', error);
      alert('An error occurred while generating the landing page.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" style={{ display: 'none' }} id="cv-upload" />
        <label htmlFor="cv-upload" style={{ 
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          cursor: 'pointer',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          Choose CV File
        </label>
        <div>{file && file.name}</div>
        <button type="submit" disabled={!file || loading} style={{
          padding: '15px 30px',
          fontSize: '18px',
          backgroundColor: '#1da1f2',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}>
          Generate Landing Page
        </button>
      </form>
      {loading && <p>Generating your landing page...</p>}
      {landingPage && (
        <div>
          <h2>Your Tweet Sized Landing Page:</h2>
          <div dangerouslySetInnerHTML={{ __html: landingPage }} />
        </div>
      )}
    </div>
  );
};

export default LandingPageGenerator;