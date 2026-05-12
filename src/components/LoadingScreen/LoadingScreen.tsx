import css from './LoadingScreen.module.scss';

export const LoadingScreen = () => (
  <div className={css.overlay}>
    <div className={css.emblem}>
      <div className={css.mark}>
        <div className={css.markOuter} />
        <div className={css.markInner}>CL</div>
      </div>

      <div className={css.wordmark}>
        <span className={css.wordmarkTop}>CHECKOUT</span>
        <span className={css.wordmarkSub}>LAB</span>
      </div>

      <div className={css.dots}>
        <div className={css.dot} />
        <div className={css.dot} />
        <div className={css.dot} />
      </div>
    </div>
  </div>
);
