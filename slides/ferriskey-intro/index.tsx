import type {
  DesignSystem,
  Page,
  SlideMeta,
  SlideTransition,
} from "@open-slide/core";
import { useSlidePageNumber } from "@open-slide/core";

export const design: DesignSystem = {
  palette: { bg: "#fafaf9", text: "#1c1917", accent: "#ea580c" },
  fonts: {
    display: '"JetBrains Mono", "SF Mono", Menlo, Consolas, monospace',
    body: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
  },
  typeScale: { hero: 152, body: 30 },
  radius: 4,
};

const muted = "#57534e";
const dim = "#a8a29e";
const border = "#d6d3d1";
const surface = "#f5f5f4";

const EASE_OUT = "cubic-bezier(0, 0, 0.2, 1)";
const EASE_IN = "cubic-bezier(0.4, 0, 1, 1)";

export const transition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(-4px)" },
    ],
  },
  enter: {
    duration: 200,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: "translateY(6px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
  },
};

const fill = {
  width: "100%",
  height: "100%",
  background: "var(--osd-bg)",
  color: "var(--osd-text)",
  fontFamily: "var(--osd-font-body)",
  position: "relative" as const,
};

const monoLabel = {
  fontFamily: "var(--osd-font-display)",
  fontSize: 20,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "var(--osd-accent)",
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div style={monoLabel}>{children}</div>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: "absolute",
        bottom: 48,
        left: 100,
        right: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "var(--osd-font-display)",
        fontSize: 18,
        color: dim,
        letterSpacing: "0.12em",
      }}
    >
      <span>FERRISKEY · INTRODUCTION</span>
      <span style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ color: muted }}>{String(current).padStart(2, "0")}</span>
        <span style={{ width: 24, height: 1, background: dim }} />
        <span>{String(total).padStart(2, "0")}</span>
      </span>
    </div>
  );
};

// ---------- Background grid (decorative) ----------

const GridBackdrop = () => (
  <div
    aria-hidden
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `
        linear-gradient(${border} 1px, transparent 1px),
        linear-gradient(90deg, ${border} 1px, transparent 1px)
      `,
      backgroundSize: "80px 80px",
      opacity: 0.55,
      maskImage:
        "radial-gradient(ellipse at center, black 30%, transparent 80%)",
      WebkitMaskImage:
        "radial-gradient(ellipse at center, black 30%, transparent 80%)",
    }}
  />
);

// ---------- Page 1: Cover ----------

const Cover: Page = () => (
  <div
    style={{
      ...fill,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 120px",
      overflow: "hidden",
    }}
  >
    <GridBackdrop />

    <div style={{ position: "relative", zIndex: 1 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          marginBottom: 56,
        }}
      >
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: "var(--osd-accent)",
            boxShadow: "0 0 18px rgba(234,88,12,0.45)",
          }}
        />
        <Eyebrow>FerrisKey · v0.6.1 · Juin 2026</Eyebrow>
      </div>

      <h1
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: "var(--osd-size-hero)",
          fontWeight: 700,
          lineHeight: 0.95,
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        Identity <span style={{ color: "var(--osd-accent)" }}>&amp;</span>
        <br />
        Access Management
      </h1>

      <div
        style={{
          marginTop: 56,
          display: "flex",
          alignItems: "flex-start",
          gap: 48,
          maxWidth: 1400,
        }}
      >
        <div
          style={{
            width: 4,
            alignSelf: "stretch",
            background: "var(--osd-accent)",
            opacity: 0.7,
          }}
        />
        <p
          style={{
            fontSize: 36,
            lineHeight: 1.45,
            color: muted,
            margin: 0,
            fontWeight: 400,
          }}
        >
          Une introduction aux fondamentaux de l’IAM, et un tour d’horizon de
          <span style={{ color: "var(--osd-text)" }}> FerrisKey</span> — la
          plateforme open-source bâtie en Rust, pensée pour les architectures
          cloud-native modernes.
        </p>
      </div>
    </div>

    <div
      style={{
        position: "absolute",
        bottom: 48,
        left: 120,
        right: 120,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "var(--osd-font-display)",
        fontSize: 18,
        color: dim,
        letterSpacing: "0.12em",
      }}
    >
      <span>github.com/ferriskey/ferriskey</span>
      <span>APACHE 2.0 · 628 ★</span>
    </div>
  </div>
);

Cover.transition = {
  duration: 280,
  exit: {
    duration: 160,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(-6px)" },
    ],
  },
  enter: {
    duration: 280,
    delay: 100,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: "translateY(12px)", filter: "blur(4px)" },
      { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
    ],
  },
};

// ---------- Page 2: Qu'est-ce qu'un IAM ----------

const ConceptRow = ({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "64px 1fr",
      columnGap: 32,
      paddingTop: 18,
      paddingBottom: 18,
      borderTop: `1px solid ${border}`,
    }}
  >
    <div
      style={{
        fontFamily: "var(--osd-font-display)",
        fontSize: 18,
        color: "var(--osd-accent)",
        paddingTop: 6,
      }}
    >
      {num}
    </div>
    <div>
      <div
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 26,
          fontWeight: 600,
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 22, lineHeight: 1.55, color: muted }}>{desc}</div>
    </div>
  </div>
);

const WhatIsIAM: Page = () => (
  <div
    style={{
      ...fill,
      padding: "100px 120px 120px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      columnGap: 96,
    }}
  >
    <div>
      <Eyebrow>01 — Fondamentaux</Eyebrow>
      <h2
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 72,
          fontWeight: 700,
          lineHeight: 1.05,
          margin: "24px 0 32px",
          letterSpacing: "-0.01em",
        }}
      >
        Qu’est-ce
        <br />
        qu’un IAM ?
      </h2>
      <p style={{ fontSize: 26, lineHeight: 1.55, color: muted, margin: 0 }}>
        Un{" "}
        <span style={{ color: "var(--osd-text)" }}>
          Identity &amp; Access Management
        </span>{" "}
        est le système qui répond, pour chaque requête entrante dans votre
        infrastructure, à deux questions fondamentales :{" "}
        <em style={{ color: "var(--osd-text)" }}>qui</em> est l’appelant, et{" "}
        <em style={{ color: "var(--osd-text)" }}>quoi</em> a-t-il le droit de
        faire.
      </p>
      <p style={{ fontSize: 22, lineHeight: 1.55, color: dim, marginTop: 24 }}>
        Un IAM centralise l’authentification, l’autorisation, la gestion du
        cycle de vie des identités et l’audit — là où chaque service aurait
        sinon réinventé sa propre couche de sécurité, partiellement et avec des
        failles.
      </p>
    </div>

    <div style={{ paddingTop: 60 }}>
      <ConceptRow
        num="01"
        title="Authentification"
        desc="Vérifier l’identité — mots de passe, OIDC, OAuth2, magic links, MFA, WebAuthn."
      />
      <ConceptRow
        num="02"
        title="Autorisation"
        desc="Décider ce que l’identité peut faire — rôles, permissions, scopes, claims."
      />
      <ConceptRow
        num="03"
        title="Fédération &amp; SSO"
        desc="Déléguer l’auth à un IdP de confiance, unifier les sessions inter-applications."
      />
      <ConceptRow
        num="04"
        title="Cycle de vie"
        desc="Provisionner, suspendre, révoquer — utilisateurs humains comme service accounts."
      />
      <ConceptRow
        num="05"
        title="Audit &amp; observabilité"
        desc="Tracer chaque décision d’accès — conformité, forensics, détection d’anomalies."
      />
    </div>

    <Footer />
  </div>
);

// ---------- Page 3: Pourquoi FerrisKey ----------

const ValueProp = ({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) => (
  <div
    style={{
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: "var(--osd-radius)",
      padding: "28px 32px",
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 16,
          color: "var(--osd-accent)",
        }}
      >
        {num}
      </span>
      <span
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 24,
          fontWeight: 600,
        }}
      >
        {title}
      </span>
    </div>
    <p style={{ fontSize: 22, lineHeight: 1.5, color: muted, margin: 0 }}>
      {body}
    </p>
  </div>
);

const WhyFerrisKey: Page = () => (
  <div style={{ ...fill, padding: "100px 120px 120px" }}>
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 32,
      }}
    >
      <div>
        <Eyebrow>02 — Positionnement</Eyebrow>
        <h2
          style={{
            fontFamily: "var(--osd-font-display)",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            margin: "24px 0 0",
            letterSpacing: "-0.01em",
          }}
        >
          Pourquoi <span style={{ color: "var(--osd-accent)" }}>FerrisKey</span>{" "}
          ?
        </h2>
      </div>
      <div
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 18,
          color: dim,
          textAlign: "right",
          maxWidth: 360,
          lineHeight: 1.5,
        }}
      >
        Une alternative sérieuse
        <br />
        aux IAM lourds, pensée
        <br />
        pour l’ère cloud-native.
      </div>
    </div>

    <p
      style={{
        fontSize: 26,
        lineHeight: 1.55,
        color: muted,
        margin: "32px 0 40px",
        maxWidth: 1500,
      }}
    >
      Les IAM historiques — Keycloak, WSO2, Gluu — ont prouvé leur valeur, mais
      traînent l’héritage JVM, des temps de démarrage en dizaines de secondes et
      une empreinte mémoire qui mal s’accommode des déploiements éphémères en
      Kubernetes. FerrisKey reprend ces standards, et les exécute sur une stack{" "}
      <span style={{ color: "var(--osd-text)" }}>Rust async</span> conçue pour
      la densité.
    </p>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 24,
      }}
    >
      <ValueProp
        num="→ 01"
        title="Performance native"
        body="Async I/O Rust de bout en bout : démarrage en millisecondes, latence p99 faible, empreinte mémoire d’un binaire statique."
      />
      <ValueProp
        num="→ 02"
        title="Architecture hexagonale"
        body="Domaine isolé des adaptateurs HTTP / DB / OIDC. Modules natifs pour MFA, audit, webhooks — extensibles sans patcher le cœur."
      />
      <ValueProp
        num="→ 03"
        title="Cloud-native par défaut"
        body="Chart Helm officiel, métriques Prometheus, dashboards Grafana, déploiement Kubernetes pensé dès le premier commit."
      />
      <ValueProp
        num="→ 04"
        title="Open source, sans paywall"
        body="Apache 2.0, intégralité du code et des fonctionnalités sur GitHub. Pas de tier Enterprise verrouillé en SaaS."
      />
    </div>

    <Footer />
  </div>
);

// ---------- Page 4: Comparaison ----------

const ComparisonRow = ({
  num,
  criterion,
  subtitle,
  keycloak,
  ferriskey,
}: {
  num: string;
  criterion: string;
  subtitle: string;
  keycloak: string;
  ferriskey: string;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "280px 1fr 1fr",
      columnGap: 32,
      padding: "22px 0",
      borderTop: `1px solid ${border}`,
      alignItems: "flex-start",
    }}
  >
    <div>
      <div
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 14,
          color: "var(--osd-accent)",
          letterSpacing: "0.18em",
        }}
      >
        {num}
      </div>
      <div
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 28,
          fontWeight: 700,
          marginTop: 8,
          letterSpacing: "-0.01em",
        }}
      >
        {criterion}
      </div>
      <div
        style={{
          fontSize: 16,
          color: dim,
          marginTop: 6,
          lineHeight: 1.35,
        }}
      >
        {subtitle}
      </div>
    </div>
    <div
      style={{
        fontSize: 21,
        lineHeight: 1.5,
        color: muted,
        paddingRight: 16,
      }}
    >
      {keycloak}
    </div>
    <div
      style={{
        fontSize: 21,
        lineHeight: 1.5,
        color: "var(--osd-text)",
        borderLeft: `2px solid var(--osd-accent)`,
        paddingLeft: 24,
      }}
    >
      {ferriskey}
    </div>
  </div>
);

const Comparison: Page = () => (
  <div style={{ ...fill, padding: "90px 120px 120px" }}>
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 24,
      }}
    >
      <div>
        <Eyebrow>03 — Comparaison</Eyebrow>
        <h2
          style={{
            fontFamily: "var(--osd-font-display)",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.05,
            margin: "20px 0 0",
            letterSpacing: "-0.01em",
          }}
        >
          FerrisKey <span style={{ color: dim }}>vs</span>{" "}
          <span style={{ color: muted }}>Keycloak</span>
        </h2>
      </div>
      <div
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 18,
          color: dim,
          textAlign: "right",
          lineHeight: 1.5,
          maxWidth: 340,
        }}
      >
        Simplicité · Connectivité · Modularité
        <br />
        là où les architectures divergent
      </div>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr 1fr",
        columnGap: 32,
        paddingBottom: 14,
        marginTop: 16,
      }}
    >
      <div />
      <div
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 14,
          color: dim,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        Keycloak · référence historique
      </div>
      <div
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 14,
          color: "var(--osd-accent)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          paddingLeft: 24,
        }}
      >
        FerrisKey · alternative cloud-native
      </div>
    </div>

    <div>
      <ComparisonRow
        num="01"
        criterion="Simplicité"
        subtitle="Empreinte & modèle de déploiement"
        keycloak="JVM (Quarkus), démarrage en secondes, plusieurs centaines de Mo en mémoire, GC à tuner — autant de surprises que le SRE doit apprivoiser en production."
        ferriskey="Pas de JVM, pas de GC. Rust optimise la mémoire par design : binaire statique léger, démarrage en millisecondes, comportement prévisible en prod."
      />
      <ComparisonRow
        num="02"
        criterion="Connectivité"
        subtitle="API first & déclarative dès la conception"
        keycloak="REST héritée centrée sur l’objet. Modifier un champ impose un GET complet, un merge local, puis un PUT — pénible à automatiser sans écraser le reste."
        ferriskey="API déclarative dès l’origine. Patch granulaire, provider Terraform direct, intégrations natives — un IAM réellement scriptable et extensible aux services externes."
      />
      <ComparisonRow
        num="03"
        criterion="Modularité"
        subtitle="Cœur DDD & observabilité native"
        keycloak="SPI Java et classpath partagé. Chaque extension touche au cœur et exige une recompilation — adopter un nouveau standard coûte cher."
        ferriskey="Modules isolés par bounded context (DDD). AuthZen, Webhooks, Orgs, XAA — chaque brique se branche sans patcher le core, observabilité native par module."
      />
    </div>

    <Footer />
  </div>
);

// ---------- Page 5: Architecture ----------

const StackLayer = ({
  tag,
  title,
  body,
  meta,
}: {
  tag: string;
  title: string;
  body: string;
  meta: string;
}) => (
  <div
    style={{
      border: `1px solid ${border}`,
      borderLeft: `3px solid var(--osd-accent)`,
      background: surface,
      borderRadius: "var(--osd-radius)",
      padding: "18px 28px",
      display: "grid",
      gridTemplateColumns: "140px 1fr 220px",
      columnGap: 32,
      alignItems: "center",
    }}
  >
    <span
      style={{
        fontFamily: "var(--osd-font-display)",
        fontSize: 16,
        color: "var(--osd-accent)",
        letterSpacing: "0.12em",
      }}
    >
      {tag}
    </span>
    <div>
      <div
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 24,
          fontWeight: 600,
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 20, lineHeight: 1.45, color: muted }}>{body}</div>
    </div>
    <span
      style={{
        fontFamily: "var(--osd-font-display)",
        fontSize: 15,
        color: dim,
        textAlign: "right",
      }}
    >
      {meta}
    </span>
  </div>
);

const Architecture: Page = () => (
  <div style={{ ...fill, padding: "90px 120px 120px" }}>
    <Eyebrow>04 — Sous le capot</Eyebrow>
    <h2
      style={{
        fontFamily: "var(--osd-font-display)",
        fontSize: 64,
        fontWeight: 700,
        lineHeight: 1.05,
        margin: "20px 0 24px",
        letterSpacing: "-0.01em",
      }}
    >
      Architecture &amp; stack
    </h2>

    <p
      style={{
        fontSize: 22,
        lineHeight: 1.5,
        color: muted,
        margin: "0 0 32px",
        maxWidth: 1500,
      }}
    >
      Une séparation stricte domaine / infrastructure (hexagonale), un cœur Rust
      qui ne connaît ni Postgres ni HTTP, et des adaptateurs isolés que l’on
      peut remplacer sans toucher à la logique métier.
    </p>

    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <StackLayer
        tag="↳ UI"
        title="Console d’administration"
        body="React + TypeScript. Gestion des realms, clients, utilisateurs, rôles, sessions actives, audit en temps réel."
        meta="TypeScript · React · Vite"
      />
      <StackLayer
        tag="↳ API"
        title="Couche HTTP & OIDC"
        body="Endpoints OIDC / OAuth2 conformes, REST d’administration, webhooks sortants. Adaptateur fin au-dessus du domaine."
        meta="Axum · Tower · async"
      />
      <StackLayer
        tag="↳ CORE"
        title="Domaine hexagonal"
        body="Entités identités, realms, sessions, policies. Pure logique Rust, sans IO, testée en isolation."
        meta="Rust 2024 · hexagonal"
      />
      <StackLayer
        tag="↳ DATA"
        title="Persistance & observabilité"
        body="Postgres pour l’état durable, Prometheus pour les métriques, dashboards Grafana fournis dans le repo."
        meta="PostgreSQL · Prometheus"
      />
    </div>

    <Footer />
  </div>
);

// ---------- Page 6: Features ----------

const FeatureCard = ({
  num,
  name,
  desc,
}: {
  num: string;
  name: string;
  desc: string;
}) => (
  <div
    style={{
      border: `1px solid ${border}`,
      borderRadius: "var(--osd-radius)",
      background: surface,
      padding: "18px 22px",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      minHeight: 170,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 14,
          color: dim,
          letterSpacing: "0.14em",
        }}
      >
        {num}
      </span>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: "var(--osd-accent)",
        }}
      />
    </div>
    <div
      style={{
        fontFamily: "var(--osd-font-display)",
        fontSize: 22,
        fontWeight: 600,
        marginTop: 2,
      }}
    >
      {name}
    </div>
    <div style={{ fontSize: 17, lineHeight: 1.45, color: muted }}>{desc}</div>
  </div>
);

const ModuleCard = ({
  num,
  name,
  desc,
}: {
  num: string;
  name: string;
  desc: string;
}) => (
  <div
    style={{
      border: `1px solid ${border}`,
      borderTop: `2px solid var(--osd-accent)`,
      borderRadius: "var(--osd-radius)",
      background: surface,
      padding: "16px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      gridColumn: "span 2",
      minHeight: 170,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 13,
          color: "var(--osd-accent)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        ↳ Module compagnon · {num}
      </span>
      <span
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 13,
          color: dim,
          letterSpacing: "0.12em",
        }}
      >
        v0.6 · stable
      </span>
    </div>
    <div
      style={{
        fontFamily: "var(--osd-font-display)",
        fontSize: 26,
        fontWeight: 600,
        marginTop: 4,
      }}
    >
      {name}
    </div>
    <div style={{ fontSize: 18, lineHeight: 1.5, color: muted }}>{desc}</div>
  </div>
);

const Features: Page = () => (
  <div style={{ ...fill, padding: "90px 120px 120px" }}>
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 24,
      }}
    >
      <div>
        <Eyebrow>05 — Capacités</Eyebrow>
        <h2
          style={{
            fontFamily: "var(--osd-font-display)",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.05,
            margin: "20px 0 0",
            letterSpacing: "-0.01em",
          }}
        >
          Features clés
        </h2>
      </div>
      <div
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 18,
          color: dim,
        }}
      >
        10 modules · couverture v0.6
      </div>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridAutoRows: "minmax(170px, auto)",
        gap: 16,
        marginTop: 24,
      }}
    >
      <FeatureCard
        num="01"
        name="OIDC & OAuth2"
        desc="Flux Authorization Code (+ PKCE), Client Credentials, Refresh Token. Discovery et JWKS conformes."
      />
      <FeatureCard
        num="02"
        name="MFA pluggable"
        desc="TOTP en standard, stratégies de sécurité enfichables. WebAuthn et passkeys au roadmap."
      />
      <FeatureCard
        num="03"
        name="LDAP"
        desc="Fédération d’annuaires d’entreprise — synchronisation utilisateurs et groupes Active Directory."
      />
      <FeatureCard
        num="04"
        name="Realms multi-tenants"
        desc="Isolation logique d’utilisateurs, rôles, clients et thèmes. Un realm par tenant ou environnement."
      />
      <FeatureCard
        num="05"
        name="Service accounts"
        desc="Identités machine first-class avec mapping de rôles bitwise — autorisation O(1) sur le chemin chaud."
      />
      <FeatureCard
        num="06"
        name="Webhooks"
        desc="Souscription aux événements internes de FerrisKey. Externaliser les events, synchroniser plusieurs services."
      />
      <FeatureCard
        num="07"
        name="Observabilité"
        desc="Métriques Prometheus par défaut, dashboards Grafana versionnés, audit log structuré JSON."
      />
      <FeatureCard
        num="08"
        name="Cloud-native"
        desc="Chart Helm officiel, image Docker distroless, config 12-factor, prêt pour GitOps et Argo CD."
      />
      <ModuleCard
        num="09"
        name="SeaWatch"
        desc="Audit & security events. Trails interrogeables depuis la console, exportables en streaming pour intégration SIEM ou analyse à froid."
      />
      <ModuleCard
        num="10"
        name="Compass"
        desc="Moteur de flux d’authentification. Orchestration de scénarios conditionnels et step-up auth — adapter la sécurité au contexte de chaque requête."
      />
    </div>

    <Footer />
  </div>
);

// ---------- Page 7: Roadmap ----------

const RoadmapCard = ({
  tag,
  name,
  desc,
}: {
  tag: string;
  name: string;
  desc: string;
}) => (
  <div
    style={{
      border: `1px dashed ${border}`,
      borderRadius: "var(--osd-radius)",
      background: surface,
      padding: "24px 28px",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      minHeight: 200,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 13,
          color: "var(--osd-accent)",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          padding: "4px 10px",
          border: `1px solid var(--osd-accent)`,
          borderRadius: 4,
        }}
      >
        {tag}
      </span>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: 999,
          border: `2px solid var(--osd-accent)`,
        }}
      />
    </div>
    <div
      style={{
        fontFamily: "var(--osd-font-display)",
        fontSize: 24,
        fontWeight: 600,
        marginTop: 4,
      }}
    >
      {name}
    </div>
    <div style={{ fontSize: 20, lineHeight: 1.5, color: muted }}>{desc}</div>
  </div>
);

const Roadmap: Page = () => (
  <div style={{ ...fill, padding: "100px 120px 120px" }}>
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 24,
      }}
    >
      <div>
        <Eyebrow>06 — À venir</Eyebrow>
        <h2
          style={{
            fontFamily: "var(--osd-font-display)",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            margin: "24px 0 0",
            letterSpacing: "-0.01em",
          }}
        >
          Projets <span style={{ color: "var(--osd-accent)" }}>à venir</span>
        </h2>
      </div>
      <div
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 18,
          color: dim,
          textAlign: "right",
          lineHeight: 1.5,
        }}
      >
        6 chantiers
        <br />
        horizon 2026
      </div>
    </div>

    <p
      style={{
        fontSize: 22,
        lineHeight: 1.5,
        color: muted,
        margin: "0 0 28px",
        maxWidth: 1500,
      }}
    >
      Au-delà des fondations OIDC, FerrisKey explore les standards émergents de
      l’IAM moderne — autorisation déléguée, flux pour appareils sans
      navigateur, conformité européenne, et un socle i18n pour s’adresser à
      toutes les équipes.
    </p>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: 20,
      }}
    >
      <RoadmapCard
        tag="↗ v0.7"
        name="AuthZen → MCP"
        desc="Bridge entre le standard d’autorisation AuthZen et le Model Context Protocol — exposer les décisions IAM aux agents LLM de manière standardisée."
      />
      <RoadmapCard
        tag="↗ v0.7"
        name="Device & Code flow"
        desc="OAuth 2.0 Device Authorization Grant (RFC 8628) — auth sur TVs, CLIs, IoT et tout appareil dépourvu de navigateur web."
      />
      <RoadmapCard
        tag="↗ v0.8"
        name="PDP externalisé"
        desc="Policy Decision Point dédié — découpler les règles d’autorisation du runtime applicatif, dans l’esprit XACML et Open Policy Agent."
      />
      <RoadmapCard
        tag="↗ v0.8"
        name="Pipelines d’import"
        desc="Migrations clé-en-main depuis Keycloak, Auth0 et Okta — utilisateurs, realms, rôles, sessions et hashes de mots de passe préservés."
      />
      <RoadmapCard
        tag="↗ v0.9"
        name="Conformité RGPD"
        desc="Tooling natif : droit à l’oubli, portabilité des données, journal de traitement, résidence configurable par realm."
      />
      <RoadmapCard
        tag="↗ v0.9"
        name="Multi-langue"
        desc="Console d’administration et templates email entièrement i18n — démarrage avec FR, EN, DE, ES, JA, ZH."
      />
    </div>

    <Footer />
  </div>
);

// ---------- Page 8: Écosystème & open source ----------

const StatBlock = ({ value, label }: { value: string; label: string }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 8,
      borderLeft: `2px solid var(--osd-accent)`,
      paddingLeft: 24,
    }}
  >
    <span
      style={{
        fontFamily: "var(--osd-font-display)",
        fontSize: 64,
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: "-0.02em",
      }}
    >
      {value}
    </span>
    <span
      style={{
        fontFamily: "var(--osd-font-display)",
        fontSize: 16,
        color: muted,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
  </div>
);

const ResourceRow = ({ cmd, label }: { cmd: string; label: string }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      columnGap: 32,
      padding: "20px 0",
      borderTop: `1px solid ${border}`,
      alignItems: "center",
    }}
  >
    <div
      style={{
        fontFamily: "var(--osd-font-display)",
        fontSize: 24,
        color: "var(--osd-text)",
      }}
    >
      <span style={{ color: "var(--osd-accent)" }}>→ </span>
      {cmd}
    </div>
    <div style={{ fontSize: 22, color: muted, lineHeight: 1.5 }}>{label}</div>
  </div>
);

const Ecosystem: Page = () => (
  <div style={{ ...fill, padding: "100px 120px 120px" }}>
    <div>
      <Eyebrow>07 — Écosystème</Eyebrow>
      <h2
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 72,
          fontWeight: 700,
          lineHeight: 1.05,
          margin: "24px 0 40px",
          letterSpacing: "-0.01em",
        }}
      >
        Open source,{" "}
        <span style={{ color: "var(--osd-accent)" }}>
          prêt pour la production
        </span>
        .
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 32,
          marginBottom: 56,
        }}
      >
        <StatBlock value="628" label="GitHub stars" />
        <StatBlock value="v0.6.1" label="Dernière release" />
        <StatBlock value="26" label="Versions publiées" />
        <StatBlock value="Apache 2.0" label="Licence" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 64,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--osd-font-display)",
              fontSize: 20,
              color: "var(--osd-accent)",
              letterSpacing: "0.18em",
              marginBottom: 16,
            }}
          >
            DÉMARRER
          </div>
          <ResourceRow
            cmd="helm install ferriskey ferriskey/ferriskey"
            label="Déploiement Kubernetes en une commande"
          />
          <ResourceRow
            cmd="docker run ghcr.io/ferriskey/ferriskey"
            label="Test local sur poste de développement"
          />
          <ResourceRow
            cmd="cargo run -p ferriskey-server"
            label="Build from source, hack sur le core Rust"
          />
        </div>

        <div>
          <div
            style={{
              fontFamily: "var(--osd-font-display)",
              fontSize: 20,
              color: "var(--osd-accent)",
              letterSpacing: "0.18em",
              marginBottom: 16,
            }}
          >
            CONTRIBUER
          </div>
          <ResourceRow
            cmd="github.com/ferriskey/ferriskey"
            label="Code source, issues, PRs, roadmap publique"
          />
          <ResourceRow
            cmd="docs.ferriskey.rs"
            label="Documentation, guides d’intégration OIDC"
          />
          <ResourceRow
            cmd="Discord · @ferriskey"
            label="Communauté active, support et discussions"
          />
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export const meta: SlideMeta = {
  title: "Introduction aux IAM — FerrisKey",
  createdAt: "2026-06-09T07:45:31.937Z",
};

export default [
  Cover,
  WhatIsIAM,
  WhyFerrisKey,
  Comparison,
  Architecture,
  Features,
  Roadmap,
  Ecosystem,
] satisfies Page[];
