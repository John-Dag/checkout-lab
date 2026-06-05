import { useEffect, useRef, useState } from 'react';
import { Button, Textarea } from '@mantine/core';
import { useSupport } from '../../hooks/useSupport';
import css from './Support.module.scss';

export const Support = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState<Array<{ q: string; a: string }>>([]);
  const { mutateAsync: ask, isPending, isError } = useSupport();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, open, isPending]);

  const handleSubmit = async () => {
    const q = question.trim();
    if (!q || isPending) return;
    try {
      const { answer } = await ask(q);
      setHistory((h) => [...h, { q, a: answer }]);
      setQuestion('');
    } catch {
      setHistory((h) => [...h, { q, a: 'Sorry, something went wrong. Please try again.' }]);
    }
  };

  if (!open) {
    return (
      <button className={css.fab} onClick={() => setOpen(true)} aria-label="Open checkout support">
        Ask Claude
      </button>
    );
  }

  return (
    <div className={css.panel} role="dialog" aria-label="Checkout Lab Support">
      <div className={css.header}>
        <div className={css.title}>Checkout Lab Support</div>
        <button className={css.close} onClick={() => setOpen(false)} aria-label="Close">
          ×
        </button>
      </div>
      <div className={css.thread}>
        {history.length === 0 && !isPending && (
          <div className={css.empty}>
            Ask about the products, pricing, or how the checkout works.
          </div>
        )}
        {history.map((turn, i) => (
          <div key={i} className={css.turn}>
            <div className={css.userBubble}>{turn.q}</div>
            <div ref={bottomRef} className={css.botBubble}>
              {turn.a}
            </div>
          </div>
        ))}
        {isPending && (
          <div ref={bottomRef} className={css.userBubble}>
            {question}
          </div>
        )}
        {isPending && (
          <div ref={bottomRef} className={css.botBubble}>
            {' '}
            <div className={css.bouncingLoader}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        {isError && history.length === 0 && (
          <div className={css.botBubble}>Couldn't reach the assistant. Try again in a moment.</div>
        )}
      </div>
      <div className={css.inputRow}>
        <Textarea
          placeholder="Ask a question"
          value={question}
          onChange={(e) => setQuestion(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          autosize
          minRows={1}
          maxRows={3}
          className={css.input}
          disabled={isPending}
        />
        <Button onClick={handleSubmit} loading={isPending} disabled={!question.trim()}>
          Ask
        </Button>
      </div>
    </div>
  );
};
