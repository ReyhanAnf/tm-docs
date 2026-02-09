import clsx from 'clsx';
import styles from './styles.module.css';

export default function FeatureCard({ icon: Icon, title, description, link }) {
  const CardContent = (
    <>
      {Icon && (
        <div className={styles.icon}>
          <Icon />
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </>
  );

  if (link) {
    return (
      <a href={link} className={clsx('card', styles.featureCard, styles.clickable)}>
        {CardContent}
      </a>
    );
  }

  return (
    <div className={clsx('card', styles.featureCard)}>
      {CardContent}
    </div>
  );
}
