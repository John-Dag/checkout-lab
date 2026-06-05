export const askSupport = async (question: string): Promise<{ answer: string }> => {
  const res = await fetch('/api/support', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error('Failed to get support response');
  return res.json();
};
