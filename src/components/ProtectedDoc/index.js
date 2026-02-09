import React, { useEffect, useState } from 'react';
import { FiEye, FiEyeOff, FiLock, FiUnlock } from 'react-icons/fi';
import styles from './styles.module.css';

/**
 * ProtectedDoc Component
 * Protects documentation content with a password/key
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to protect
 * @param {string} props.accessKey - The correct access key/password
 * @param {string} props.storageKey - LocalStorage key for remembering access (optional)
 * @param {string} props.title - Title shown on lock screen (optional)
 * @param {string} props.description - Description shown on lock screen (optional)
 */
export default function ProtectedDoc({
  children,
  accessKey,
  storageKey = 'doc-access',
  title = 'Protected Documentation',
  description = 'This documentation is protected. Please enter the access key to continue.'
}) {
  const [inputKey, setInputKey] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Check if already unlocked in localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem(storageKey);
    if (savedKey === accessKey) {
      setIsUnlocked(true);
    }
    setIsLoading(false);
  }, [accessKey, storageKey]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputKey === accessKey) {
      setIsUnlocked(true);
      setError('');
      // Save to localStorage
      localStorage.setItem(storageKey, inputKey);
    } else {
      setError('Invalid access key. Please try again.');
      setInputKey('');
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setInputKey('');
    setError('');
    localStorage.removeItem(storageKey);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className={styles.lockContainer}>
        <div className={styles.lockCard}>
          <div className={styles.lockIcon}>
            <FiLock />
          </div>

          <h2 className={styles.lockTitle}>{title}</h2>
          <p className={styles.lockDescription}>{description}</p>

          <form onSubmit={handleSubmit} className={styles.lockForm}>
            <div className={styles.inputGroup}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="Enter access key"
                className={styles.input}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.toggleButton}
                aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}

            <button type="submit" className={styles.submitButton}>
              <FiUnlock className={styles.buttonIcon} />
              Unlock Documentation
            </button>
          </form>

          <div className={styles.hint}>
            Contact the administrator if you need access.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.unlockedContainer}>
      <div className={styles.unlockBanner}>
        <div className={styles.unlockInfo}>
          <FiUnlock className={styles.unlockIcon} />
          <span>Documentation Unlocked</span>
        </div>
        <button onClick={handleLock} className={styles.lockButton}>
          <FiLock />
          Lock Again
        </button>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
