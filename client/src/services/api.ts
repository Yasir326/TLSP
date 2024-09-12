export const generateLandingPage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('cv', file);

  const response = await fetch('http://localhost:3001/api/generate-landing-page', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to generate landing page');
  }

  return response.text();
};