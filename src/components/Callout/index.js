import clsx from 'clsx';
import { FiAlertTriangle, FiCheckCircle, FiInfo, FiXCircle, FiZap } from 'react-icons/fi';
import styles from './styles.module.css';

const iconMap = {
  info: FiInfo,
  warning: FiAlertTriangle,
  success: FiCheckCircle,
  error: FiXCircle,
  tip: FiZap,
};

export default function Callout({ type = 'info', title, children }) {
  const Icon = iconMap[type] || FiInfo;

  return (
    <div className={clsx(styles.callout, styles[type])}>
      <div className={styles.header}>
        <Icon className={styles.icon} />
        {title && <strong className={styles.title}>{title}</strong>}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
