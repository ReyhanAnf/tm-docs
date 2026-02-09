import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import { FiBook, FiClock, FiShield } from 'react-icons/fi';
import TalentGame from '../components/TalentGame';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroBackground}></div>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            Talents Mapping
          </Heading>
          <p className={styles.heroSubtitle}>
            The single source of truth for Talents Mapping.<br/>
            Architectural blueprints, API specifications, and migration strategies for the 2026 transformation.
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/category/system-overview">
              <FiBook className={styles.buttonIcon} />
              Latest Version
            </Link>
            <Link
              className="button button--primary button--lg"
              to="/docs/next">
              <FiClock className={styles.buttonIcon} />
              Next Development (2026 Vision)
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function FeatureSection() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--4')}>
            <div className="text--center">
              <FiShield size={48} color="var(--ifm-color-primary)" />
            </div>
            <div className="text--center padding-horiz--md">
              <Heading as="h3">Secure & Private</Heading>
              <p>Protected access ensuring sensitive technical details remain confidential.</p>
            </div>
          </div>
          <div className={clsx('col col--4')}>
            <div className="text--center">
              <FiClock size={48} color="var(--ifm-color-primary)" />
            </div>
            <div className="text--center padding-horiz--md">
              <Heading as="h3">Version Controlled</Heading>
              <p>Full history of changes with legacy documentation snapshots preserved.</p>
            </div>
          </div>
          <div className={clsx('col col--4')}>
            <div className="text--center">
              <FiBook size={48} color="var(--ifm-color-primary)" />
            </div>
            <div className="text--center padding-horiz--md">
              <Heading as="h3">Comprehensive</Heading>
              <p>Detailed specifications from business logic to technical implementation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Documentation"
      description="Talents Mapping Official Documentation">
      <HomepageHeader />
      <main>
        <FeatureSection />
        <TalentGame />
      </main>
    </Layout>
  );
}
