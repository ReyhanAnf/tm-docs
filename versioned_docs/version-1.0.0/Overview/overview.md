---
sidebar_position: 1
title: Talents Mapping Overview
description: Comprehensive overview of Technical Specifications, Architecture, and Legacy System
slug: /talents-mapping/overview
---

import FeatureCard from '@site/src/components/FeatureCard';
import { FiLayers, FiCpu, FiDatabase, FiActivity, FiServer, FiArchive } from 'react-icons/fi';

# Talents Mapping Documentation

Selamat datang di pusat dokumentasi teknis Talents Mapping. Dokumentasi ini terbagi menjadi dua era utama: Sistem Legacy (Existing) dan Rencana Transformasi 2026.

:::note Confidential
Seluruh dokumentasi dalam folder ini bersifat **Confidential**.
:::

## Existing System (Legacy)

Dokumentasi untuk sistem yang sedang berjalan saat ini (Production).

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <FeatureCard
      icon={FiServer}
      title="Legacy Overview"
      description="Central hub for current system architecture, database, and API documentation."
      link="/docs/talents-mapping/existing-system/overview"
    />
  </div>
  <div className="col col--6 margin-bottom--lg">
    <FeatureCard
      icon={FiArchive}
      title="System Architecture"
      description="Monolith architecture topology and server configuration."
      link="/docs/talents-mapping/existing-system/system-architecture"
    />
  </div>
</div>

---

## 2026 Transformation Plan

Rencana transformasi arsitektur menuju Service-Oriented (Modular Monolith) untuk Q1 2026.

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <FeatureCard
      icon={FiLayers}
      title="Blueprint & Roadmap"
      description="The grand plan: From Monolith to Modular. Gap analysis and migration strategy."
      link="/docs/talents-mapping/2026-q1-technical-specification-document/blueprint-transformasi-arsitektur-sistem-retai"
    />
  </div>
  <div className="col col--6 margin-bottom--lg">
    <FeatureCard
      icon={FiCpu}
      title="Architecture Design (SAD)"
      description="High-level design, context diagrams, and technology stack for 2026."
      link="/docs/talents-mapping/2026-q1-technical-specification-document/system-architecture-design-sad"
    />
  </div>
  <div className="col col--6 margin-bottom--lg">
    <FeatureCard
      icon={FiDatabase}
      title="Pricing & Commission"
      description="New Pricing Engine logic and Dynamic Commission Rules matrix."
      link="/docs/talents-mapping/2026-q1-technical-specification-document/functional-spesification-document-fsd"
    />
  </div>
  <div className="col col--6 margin-bottom--lg">
    <FeatureCard
      icon={FiActivity}
      title="GAP Analysis"
      description="Detailed breakdown of problems in the current system and proposed solutions."
      link="/docs/talents-mapping/2026-q1-technical-specification-document/Arsitektur/GAP/%5BProduk%5D%20GAP%20Arstektur%20Sistem%20Lama%20dan%20Baru"
    />
  </div>
</div>
