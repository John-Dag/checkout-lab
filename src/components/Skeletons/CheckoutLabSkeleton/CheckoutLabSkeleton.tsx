import css from './CheckoutLabSkeleton.module.scss';

export const CheckoutLabSkeleton = () => (
  <div className={css.grid}>
    <div className={css.left}>
      <div className={css.invoiceSkeleton}>
        <div className={css.skeletonLogo} />
        <div className={css.skeletonMerchant} />
        <div className={css.skeletonTotal} />
        <div className={css.skeletonDivider} />
        <div className={css.skeletonRow} />
        <div className={css.skeletonRow} />
        <div className={css.skeletonRow} />
      </div>
    </div>
    <div className={css.right}>
      <div className={css.formSkeleton}>
        <div className={css.skeletonTitle} />
        <div className={css.skeletonField} />
        <div className={css.skeletonField} />
        <div className={css.skeletonField} />
        <div className={css.skeletonFieldRow}>
          <div className={css.skeletonFieldHalf} />
          <div className={css.skeletonFieldHalf} />
          <div className={css.skeletonFieldHalf} />
        </div>
        <div className={css.skeletonField} />
        <div className={css.skeletonFieldRow}>
          <div className={css.skeletonFieldHalf} />
          <div className={css.skeletonFieldHalf} />
        </div>
        <div className={css.skeletonButton} />
      </div>
    </div>
  </div>
);
