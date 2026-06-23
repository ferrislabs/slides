import { useEffect } from "react";
import type {
  DesignSystem,
  Page,
  SlideMeta,
  SlideTransition,
} from "@open-slide/core";
import {
  ImagePlaceholder,
  Step,
  Steps,
  useSlidePageNumber,
} from "@open-slide/core";

// ----------------------------------------------------------------------------
// Direction artistique — style maison FerrisKey (light, accent rouille).
// ----------------------------------------------------------------------------

export const design: DesignSystem = {
  palette: { bg: "#FBFAF7", text: "#211C16", accent: "#E2561E" },
  fonts: {
    display: '"Space Grotesk", system-ui, -apple-system, sans-serif',
    body: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
  },
  typeScale: { hero: 132, body: 36 },
  radius: 8,
};

const mono = '"JetBrains Mono", "SF Mono", Menlo, Consolas, monospace';
const surface = "#FFFFFF";
const muted = "#6F665B";
const hairline = "#EBE5DB";
const rustSoft = "#FBE9DF";
const rustInk = "#9E3A12";

// ----------------------------------------------------------------------------
// Transitions — une seule DNA : fade + léger glissement vers le haut.
// ----------------------------------------------------------------------------

const EASE_OUT = "cubic-bezier(0, 0, 0.2, 1)";
const EASE_IN = "cubic-bezier(0.4, 0, 1, 1)";

export const transition: SlideTransition = {
  duration: 220,
  exit: {
    duration: 150,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(-4px)" },
    ],
  },
  enter: {
    duration: 220,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: "translateY(6px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
  },
};

const coverTransition: SlideTransition = {
  duration: 300,
  exit: {
    duration: 160,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(-6px)" },
    ],
  },
  enter: {
    duration: 300,
    delay: 100,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: "translateY(12px)", filter: "blur(4px)" },
      { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
    ],
  },
};

// ----------------------------------------------------------------------------
// Polices Google (Space Grotesk · Inter · JetBrains Mono).
// ----------------------------------------------------------------------------

const ensureFonts = () => {
  if (typeof document === "undefined") return;
  if (document.getElementById("osd-iam-fonts")) return;
  const link = document.createElement("link");
  link.id = "osd-iam-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap";
  document.head.appendChild(link);
};

const Fonts = () => {
  useEffect(ensureFonts, []);
  return null;
};

// ----------------------------------------------------------------------------
// Primitives partagées.
// ----------------------------------------------------------------------------

const fill = {
  width: "100%",
  height: "100%",
  background: "var(--osd-bg)",
  color: "var(--osd-text)",
  fontFamily: "var(--osd-font-body)",
  position: "relative" as const,
  overflow: "hidden" as const,
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 14,
      fontFamily: mono,
      fontSize: 20,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--osd-accent)",
    }}
  >
    <span
      style={{
        width: 28,
        height: 3,
        background: "var(--osd-accent)",
        borderRadius: 2,
      }}
    />
    {children}
  </div>
);

const Rule = ({ width = 96 }: { width?: number }) => (
  <div
    style={{
      width,
      height: 3,
      background: "var(--osd-accent)",
      borderRadius: 2,
      margin: "28px 0",
    }}
  />
);

const Arrow = () => (
  <span style={{ color: "var(--osd-accent)", fontFamily: mono }}>→</span>
);

const Accent = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "var(--osd-accent)" }}>{children}</span>
);

const Footer = ({ label = "REPENSER L'IAM" }: { label?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: "absolute",
        bottom: 48,
        left: 120,
        right: 120,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: mono,
        fontSize: 17,
        color: "#A8A096",
        letterSpacing: "0.12em",
        zIndex: 2,
      }}
    >
      <span>{label} · ASYNCONF 2026</span>
      <span style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ color: muted }}>{String(current).padStart(2, "0")}</span>
        <span style={{ width: 24, height: 1, background: "#CFC8BD" }} />
        <span>{String(total).padStart(2, "0")}</span>
      </span>
    </div>
  );
};

const GridBackdrop = () => (
  <div
    aria-hidden
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `linear-gradient(${hairline} 1px, transparent 1px), linear-gradient(90deg, ${hairline} 1px, transparent 1px)`,
      backgroundSize: "96px 96px",
      opacity: 0.6,
      maskImage:
        "radial-gradient(ellipse at center, black 25%, transparent 78%)",
      WebkitMaskImage:
        "radial-gradient(ellipse at center, black 25%, transparent 78%)",
    }}
  />
);

// Silhouette Ferris (le crabe) — watermark géométrique discret.
const CrabMark = ({
  size = 540,
  opacity = 0.05,
  right = -70,
  bottom = -90,
}: {
  size?: number;
  opacity?: number;
  right?: number;
  bottom?: number;
}) => (
  <svg
    aria-hidden
    viewBox="0 0 240 170"
    width={size}
    style={{ position: "absolute", right, bottom, opacity, zIndex: 0 }}
  >
    <g fill="var(--osd-accent)">
      <rect x="86" y="34" width="9" height="46" rx="4" />
      <rect x="145" y="34" width="9" height="46" rx="4" />
      <circle cx="90" cy="34" r="12" />
      <circle cx="150" cy="34" r="12" />
      <ellipse cx="120" cy="104" rx="78" ry="46" />
      <circle cx="34" cy="96" r="24" />
      <circle cx="206" cy="96" r="24" />
      <rect x="40" y="138" width="34" height="9" rx="4" transform="rotate(28 57 142)" />
      <rect x="72" y="146" width="34" height="9" rx="4" transform="rotate(14 89 150)" />
      <rect x="134" y="146" width="34" height="9" rx="4" transform="rotate(-14 151 150)" />
      <rect x="166" y="138" width="34" height="9" rx="4" transform="rotate(-28 183 142)" />
    </g>
  </svg>
);

const Stage = ({
  children,
  justify = "flex-start",
  pad = "92px 120px 120px",
  grid = false,
  mark = false,
  footerLabel,
}: {
  children: React.ReactNode;
  justify?: "flex-start" | "center";
  pad?: string;
  grid?: boolean;
  mark?: boolean;
  footerLabel?: string;
}) => (
  <div
    style={{
      ...fill,
      padding: pad,
      display: "flex",
      flexDirection: "column",
      justifyContent: justify,
    }}
  >
    <Fonts />
    {grid && <GridBackdrop />}
    {mark && <CrabMark />}
    <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
      {children}
    </div>
    <Footer label={footerLabel} />
  </div>
);

const display = (size: number, weight = 600) => ({
  fontFamily: "var(--osd-font-display)",
  fontSize: size,
  fontWeight: weight,
  lineHeight: 1.05,
  letterSpacing: "-0.015em",
  margin: 0,
});

// Carte « surface » à filet d'accent en haut — réutilisée sur tout le deck.
const TopCard = ({
  tag,
  title,
  children,
  minHeight,
}: {
  tag?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  minHeight?: number;
}) => (
  <div
    style={{
      background: surface,
      border: `1px solid ${hairline}`,
      borderTop: `3px solid var(--osd-accent)`,
      borderRadius: "var(--osd-radius)",
      padding: "26px 30px",
      display: "flex",
      flexDirection: "column",
      minHeight,
    }}
  >
    {tag && (
      <div
        style={{
          fontFamily: mono,
          fontSize: 17,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--osd-accent)",
        }}
      >
        {tag}
      </div>
    )}
    {title && (
      <div
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 34,
          fontWeight: 600,
          margin: tag ? "12px 0 0" : 0,
        }}
      >
        {title}
      </div>
    )}
    {children && <div style={{ marginTop: 16 }}>{children}</div>}
  </div>
);

const Li = ({ children }: { children: React.ReactNode }) => (
  <li style={{ fontSize: 23, color: muted, lineHeight: 1.5, marginBottom: 6 }}>
    {children}
  </li>
);

const Bullets = ({ children }: { children: React.ReactNode }) => (
  <ul style={{ margin: 0, paddingLeft: 22 }}>{children}</ul>
);

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      fontSize: 30,
      padding: "14px 26px",
      background: surface,
      border: `1px solid ${hairline}`,
      borderRadius: "var(--osd-radius)",
      color: "var(--osd-text)",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

const FlowNode = ({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) => (
  <span
    style={{
      fontFamily: mono,
      fontSize: 26,
      padding: "16px 24px",
      borderRadius: "var(--osd-radius)",
      background: accent ? rustSoft : surface,
      border: `1px solid ${accent ? "var(--osd-accent)" : hairline}`,
      color: accent ? rustInk : "var(--osd-text)",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

const FlowArrow = () => (
  <span style={{ color: "var(--osd-accent)", fontFamily: mono, fontSize: 30 }}>
    →
  </span>
);

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ ...display(68), margin: "24px 0 36px", maxWidth: 1560 }}>
    {children}
  </h2>
);

// ----------------------------------------------------------------------------
// 01 — Couverture
// ----------------------------------------------------------------------------

const Cover: Page = () => (
  <div
    style={{
      ...fill,
      padding: "0 140px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Fonts />
    <GridBackdrop />
    <CrabMark />
    <div style={{ position: "relative", zIndex: 1 }}>
      <Eyebrow>Asynconf · 27 juin 2026 · Paris La Défense</Eyebrow>
      <h1 style={{ ...display(128, 600), marginTop: 36 }}>
        Repenser l&apos;<Accent>IAM</Accent>
      </h1>
      <Rule width={120} />
      <p
        style={{
          fontSize: 38,
          lineHeight: 1.4,
          color: muted,
          margin: 0,
          maxWidth: 1320,
        }}
      >
        pour les plateformes modernes : vers un IAM{" "}
        <span style={{ color: "var(--osd-text)" }}>
          cloud-native, distribué et orienté décision
        </span>
        .
      </p>
    </div>

    <div
      style={{
        position: "absolute",
        left: 140,
        right: 140,
        bottom: 56,
        zIndex: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: mono,
            fontSize: 18,
            letterSpacing: "0.14em",
            color: "var(--osd-accent)",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          FerrisKey · co-créateurs
        </div>
        <div style={{ fontSize: 28, color: "var(--osd-text)", fontWeight: 500 }}>
          Nathael Bonnal &nbsp;·&nbsp; Baptiste Parmantier
        </div>
      </div>
      <div style={{ fontFamily: mono, fontSize: 22, color: muted }}>
        <span style={{ color: "var(--osd-accent)" }}>// </span>
        IAM 100% open source, en Rust
      </div>
    </div>
  </div>
);
Cover.transition = coverTransition;

// ----------------------------------------------------------------------------
// 02 — Agenda
// ----------------------------------------------------------------------------

const AgendaRow = ({
  num,
  title,
  note,
  dur,
}: {
  num: string;
  title: string;
  note: string;
  dur: string;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      alignItems: "center",
      columnGap: 36,
      padding: "26px 0",
      borderTop: `1px solid ${hairline}`,
    }}
  >
    <span
      style={{
        fontFamily: mono,
        fontSize: 24,
        color: "var(--osd-accent)",
        letterSpacing: "0.08em",
      }}
    >
      {num}
    </span>
    <span>
      <span
        style={{
          fontFamily: "var(--osd-font-display)",
          fontSize: 46,
          fontWeight: 600,
        }}
      >
        {title}
      </span>
      <span style={{ fontSize: 24, color: muted, marginLeft: 18 }}>{note}</span>
    </span>
    <span
      style={{
        fontFamily: mono,
        fontSize: 22,
        color: muted,
        background: surface,
        border: `1px solid ${hairline}`,
        borderRadius: 999,
        padding: "6px 16px",
      }}
    >
      {dur}
    </span>
  </div>
);

const Agenda: Page = () => (
  <Stage footerLabel="AGENDA">
    <Eyebrow>Au programme</Eyebrow>
    <Heading>Quatre temps, quarante minutes.</Heading>
    <div>
      <AgendaRow num="01" title="Fondamentaux IAM" note="le vocabulaire commun" dur="12 min" />
      <AgendaRow num="02" title="WIAM / CIAM & écosystème" note="le paysage open source" dur="8 min" />
      <AgendaRow num="03" title="FerrisKey" note="vision, features, distribution" dur="12 min" />
      <AgendaRow num="04" title="IAM pour l'ère agent" note="ce qui vient" dur="6 min" />
    </div>
  </Stage>
);

// ----------------------------------------------------------------------------
// 03 — Qu'est-ce qu'une identité ?
// ----------------------------------------------------------------------------

const Identity: Page = () => (
  <Stage pad="80px 120px 120px" footerLabel="FONDAMENTAUX · IDENTITÉ">
    <Eyebrow>Fondamentaux</Eyebrow>
    <h2 style={{ ...display(62), margin: "22px 0 32px" }}>
      Qu&apos;est-ce qu&apos;une <Accent>identité</Accent> ?
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
      <TopCard tag="humaine" title="Humain" minHeight={300}>
        <Bullets>
          <Li>compte &amp; attributs</Li>
          <Li>sessions</Li>
          <Li>MFA</Li>
        </Bullets>
      </TopCard>
      <TopCard tag="machine" title="Service Account" minHeight={300}>
        <Bullets>
          <Li>client credentials</Li>
          <Li>rotation de secrets</Li>
          <Li>scopes réduits</Li>
        </Bullets>
      </TopCard>
      <TopCard tag="éphémère" title="Agent" minHeight={300}>
        <Bullets>
          <Li>durée de vie bornée</Li>
          <Li>least privilege</Li>
          <Li>révocabilité instantanée</Li>
        </Bullets>
      </TopCard>
    </div>
    <p style={{ ...display(44, 500), marginTop: 34, color: "var(--osd-text)" }}>
      En 2026, une identité n&apos;est plus forcément <Accent>humaine</Accent>.
    </p>
  </Stage>
);

// ----------------------------------------------------------------------------
// 04 — Authentification vs Autorisation
// ----------------------------------------------------------------------------

const AuthCol = ({
  tag,
  question,
  children,
}: {
  tag: string;
  question: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      background: surface,
      border: `1px solid ${hairline}`,
      borderTop: `3px solid var(--osd-accent)`,
      borderRadius: "var(--osd-radius)",
      padding: "34px 38px",
    }}
  >
    <div
      style={{
        fontFamily: mono,
        fontSize: 18,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--osd-accent)",
      }}
    >
      {tag}
    </div>
    <div style={{ ...display(54), margin: "14px 0 26px" }}>
      «&nbsp;{question}&nbsp;»
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {children}
    </div>
  </div>
);

const Flow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30 }}>
    <Arrow />
    <span>{children}</span>
  </div>
);

const AuthNZ: Page = () => (
  <Stage footerLabel="FONDAMENTAUX · AUTHN / AUTHZ">
    <Eyebrow>Fondamentaux</Eyebrow>
    <h2 style={{ ...display(64), margin: "22px 0 34px" }}>
      Authentification <Accent>vs</Accent> Autorisation.
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26 }}>
      <AuthCol tag="AuthN · qui es-tu" question="Qui es-tu ?">
        <Flow>vérifie l&apos;identité</Flow>
        <Flow>produit un token</Flow>
      </AuthCol>
      <AuthCol tag="AuthZ · qu'as-tu le droit" question="Qu'as-tu le droit de faire ?">
        <Flow>vérifie les permissions</Flow>
        <Flow>accès accordé ou refusé</Flow>
      </AuthCol>
    </div>
    <div style={{ marginTop: 30, fontFamily: mono, fontSize: 24, color: muted }}>
      <Accent>//</Accent> les mélanger = dette technique. Un IAM moderne les{" "}
      <span style={{ color: "var(--osd-text)" }}>découple</span>.
    </div>
  </Stage>
);

// ----------------------------------------------------------------------------
// 05 — OAuth2 / OIDC / Scopes
// ----------------------------------------------------------------------------

const ConceptRow = ({
  term,
  desc,
}: {
  term: React.ReactNode;
  desc: React.ReactNode;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "300px 1fr",
      columnGap: 36,
      alignItems: "baseline",
      padding: "20px 0",
      borderTop: `1px solid ${hairline}`,
    }}
  >
    <div
      style={{
        fontFamily: "var(--osd-font-display)",
        fontSize: 38,
        fontWeight: 600,
        color: "var(--osd-accent)",
      }}
    >
      {term}
    </div>
    <div style={{ fontSize: 28, color: muted, lineHeight: 1.45 }}>{desc}</div>
  </div>
);

const Oauth: Page = () => (
  <Stage footerLabel="FONDAMENTAUX · OAUTH2 / OIDC">
    <Eyebrow>Fondamentaux</Eyebrow>
    <h2 style={{ ...display(60), margin: "20px 0 26px" }}>
      OAuth2 · OIDC · <Accent>Scopes</Accent>.
    </h2>
    <div>
      <ConceptRow
        term="OAuth2"
        desc={<>Agir au nom d&apos;un utilisateur sans jamais voir son mot de passe.</>}
      />
      <ConceptRow
        term="OIDC"
        desc={<>La couche d&apos;identité posée sur OAuth2. L&apos;id_token est un JWT standardisé.</>}
      />
      <ConceptRow
        term="Scopes"
        desc={<>Le grain des accès : openid, email, profile, offline_access…</>}
      />
    </div>
    <div
      style={{
        marginTop: 34,
        display: "flex",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <FlowNode>User</FlowNode>
      <FlowArrow />
      <FlowNode>App</FlowNode>
      <FlowArrow />
      <FlowNode accent>IdP</FlowNode>
      <FlowArrow />
      <FlowNode>Token</FlowNode>
      <FlowArrow />
      <FlowNode>Resource</FlowNode>
    </div>
  </Stage>
);

// ----------------------------------------------------------------------------
// 06 — IdP, Fédération, SSO
// ----------------------------------------------------------------------------

const IdpFedSso: Page = () => (
  <Stage pad="80px 120px 120px" footerLabel="FONDAMENTAUX · IDP / SSO">
    <Eyebrow>Fondamentaux</Eyebrow>
    <h2 style={{ ...display(62), margin: "22px 0 32px" }}>
      IdP · Fédération · <Accent>SSO</Accent>.
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
      <TopCard tag="01" title="IdP" minHeight={290}>
        <p style={{ fontSize: 25, color: muted, lineHeight: 1.5, margin: 0 }}>
          source de vérité des identités. C&apos;est lui qui émet les tokens.
        </p>
      </TopCard>
      <TopCard tag="02" title="Fédération" minHeight={290}>
        <p style={{ fontSize: 25, color: muted, lineHeight: 1.5, margin: 0 }}>
          Se connecter via un IdP externe (Google, GitHub, SAML, LDAP) sans
          recréer de compte.
        </p>
      </TopCard>
      <TopCard tag="03" title="SSO" minHeight={290}>
        <p style={{ fontSize: 25, color: muted, lineHeight: 1.5, margin: 0 }}>
          une seule auth, valide sur plusieurs apps. Révocation centralisée.
        </p>
      </TopCard>
    </div>
  </Stage>
);

// ----------------------------------------------------------------------------
// 07 — La règle d'or
// ----------------------------------------------------------------------------

const GoldenRule: Page = () => (
  <Stage justify="center" pad="0 150px" mark footerLabel="LA RÈGLE D'OR">
    <Eyebrow>La règle d&apos;or</Eyebrow>
    <p style={{ ...display(96, 600), margin: "34px 0 0", maxWidth: 1560, lineHeight: 1.1 }}>
      Tu n&apos;es pas dans le business de l&apos;auth.
      <br />
      <Accent>Délègue-le.</Accent>
    </p>
    <div style={{ marginTop: 44, fontFamily: mono, fontSize: 22, color: muted, marginBottom: 22 }}>
      <Accent>//</Accent> ce qu&apos;un IdP te donne sans une ligne de code :
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      <Chip>MFA</Chip>
      <Chip>OIDC</Chip>
      <Chip>Fédération</Chip>
      <Chip>Audit logs</Chip>
      <Chip>Conformité RGPD</Chip>
    </div>
  </Stage>
);

// ----------------------------------------------------------------------------
// 08 — WIAM vs CIAM
// ----------------------------------------------------------------------------

const WiamCiam: Page = () => (
  <Stage pad="80px 120px 120px" footerLabel="ÉCOSYSTÈME · WIAM / CIAM">
    <Eyebrow>Deux mondes</Eyebrow>
    <h2 style={{ ...display(62), margin: "22px 0 30px" }}>
      WIAM <Accent>vs</Accent> CIAM.
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26 }}>
      <TopCard tag="collaborateurs · internes" title="WIAM">
        <Bullets>
          <Li>employés &amp; contractors</Li>
          <Li>volume limité</Li>
          <Li>priorité conformité &amp; audit</Li>
          <Li>intégration AD / LDAP</Li>
        </Bullets>
      </TopCard>
      <TopCard tag="clients finaux · externes" title="CIAM">
        <Bullets>
          <Li>clients finaux</Li>
          <Li>volume massif</Li>
          <Li>priorité UX &amp; conversion</Li>
          <Li>consentement RGPD · self-service</Li>
        </Bullets>
      </TopCard>
    </div>
    <div style={{ marginTop: 28, fontFamily: mono, fontSize: 23, color: muted }}>
      <Accent>//</Accent> la plupart des solutions sont WIAM-first ou CIAM-only.{" "}
      <span style={{ color: "var(--osd-text)" }}>Rarement les deux.</span>
    </div>
  </Stage>
);

// ----------------------------------------------------------------------------
// 09 — Panorama open source
// ----------------------------------------------------------------------------

const SolutionCard = ({
  name,
  critique,
}: {
  name: string;
  critique: React.ReactNode;
}) => (
  <div
    style={{
      background: surface,
      border: `1px solid ${hairline}`,
      borderLeft: `3px solid var(--osd-accent)`,
      borderRadius: "var(--osd-radius)",
      padding: "24px 28px",
    }}
  >
    <div
      style={{
        fontFamily: "var(--osd-font-display)",
        fontSize: 34,
        fontWeight: 600,
        marginBottom: 8,
      }}
    >
      {name}
    </div>
    <div style={{ fontSize: 24, color: muted, lineHeight: 1.45 }}>{critique}</div>
  </div>
);

const Panorama: Page = () => (
  <Stage pad="78px 120px 120px" footerLabel="ÉCOSYSTÈME · PANORAMA">
    <Eyebrow>Le paysage open source</Eyebrow>
    <h2 style={{ ...display(58), margin: "18px 0 26px" }}>
      Panorama des <Accent>solutions</Accent>.
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
      <SolutionCard
        name="Keycloak"
        critique={<>mature et complet, mais lourd (JVM) et complexe à opérer.</>}
      />
      <SolutionCard
        name="Zitadel"
        critique={<>Go, API-first, bonne DX, mais les features avancées restent derrière le cloud.</>}
      />
      <SolutionCard
        name="Authentik"
        critique={<>excellent en WIAM &amp; proxy auth, moins adapté au CIAM à grande échelle.</>}
      />
      <SolutionCard
        name="Ory"
        critique={<>très flexible et modulaire, mais rien de clé en main : tout est à assembler.</>}
      />
    </div>
    <div style={{ marginTop: 26, fontFamily: mono, fontSize: 23, color: muted }}>
      <Accent>//</Accent> gap commun : complexité opérationnelle élevée,{" "}
      <span style={{ color: "var(--osd-text)" }}>déploiement K8s non natif</span>.
    </div>
  </Stage>
);

// ----------------------------------------------------------------------------
// 10 — FerrisKey : vision & positionnement
// ----------------------------------------------------------------------------

const AxisCard = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      background: surface,
      border: `1px solid ${hairline}`,
      borderTop: `3px solid var(--osd-accent)`,
      borderRadius: "var(--osd-radius)",
      padding: "26px 28px",
      fontFamily: "var(--osd-font-display)",
      fontSize: 32,
      fontWeight: 600,
      lineHeight: 1.2,
    }}
  >
    {children}
  </div>
);

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div style={{ ...display(64), color: "var(--osd-accent)" }}>{value}</div>
    <div style={{ fontSize: 24, color: muted, marginTop: 6 }}>{label}</div>
  </div>
);

const Vision: Page = () => (
  <Stage pad="80px 120px 120px" mark footerLabel="FERRISKEY · VISION">
    <Eyebrow>FerrisKey</Eyebrow>
    <h2 style={{ ...display(60), margin: "20px 0 22px" }}>
      Vision &amp; <Accent>positionnement</Accent>.
    </h2>
    <p style={{ fontSize: 34, color: muted, lineHeight: 1.45, margin: "0 0 30px", maxWidth: 1500 }}>
      Né d&apos;une frustration : les IAM existants sont trop{" "}
      <span style={{ color: "var(--osd-text)" }}>complexes</span>, trop{" "}
      <span style={{ color: "var(--osd-text)" }}>fermés</span>, trop{" "}
      <span style={{ color: "var(--osd-text)" }}>gourmands</span>.
    </p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
      <AxisCard>Simplicité d&apos;apprentissage</AxisCard>
      <AxisCard>Simplicité de distribution</AxisCard>
      <AxisCard>Performance Rust</AxisCard>
    </div>
    <div style={{ display: "flex", gap: 90, marginTop: 36 }}>
      <Stat value="~40" label="contributeurs" />
      <Stat value="100%" label="open source · Apache 2.0" />
    </div>
  </Stage>
);

// ----------------------------------------------------------------------------
// 11 — Features clés
// ----------------------------------------------------------------------------

const Features: Page = () => (
  <Stage justify="center" mark footerLabel="FERRISKEY · FEATURES">
    <Eyebrow>FerrisKey</Eyebrow>
    <h2 style={{ ...display(66), margin: "22px 0 40px" }}>
      Features <Accent>clés</Accent>.
    </h2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, maxWidth: 1620 }}>
      <Chip>Passkeys</Chip>
      <Chip>Magic Link</Chip>
      <Chip>Organizations · multi-tenant</Chip>
      <Chip>Email Builder</Chip>
      <Chip>Extensible User Attributes</Chip>
      <Chip>OpenTelemetry</Chip>
      <Chip>OIDC complet</Chip>
      <Chip>MFA · TOTP + WebAuthn</Chip>
      <Chip>Maintenance Mode</Chip>
    </div>
  </Stage>
);

// ----------------------------------------------------------------------------
// 12 — Distribution cloud-native
// ----------------------------------------------------------------------------

const DistCard = ({
  tag,
  title,
  desc,
}: {
  tag: string;
  title: string;
  desc: React.ReactNode;
}) => (
  <TopCard tag={tag} title={title}>
    <p style={{ fontSize: 24, color: muted, lineHeight: 1.45, margin: 0 }}>{desc}</p>
  </TopCard>
);

const Distribution: Page = () => (
  <Stage pad="80px 120px 120px" footerLabel="FERRISKEY · DISTRIBUTION">
    <Eyebrow>FerrisKey</Eyebrow>
    <h2 style={{ ...display(60), margin: "20px 0 28px" }}>
      Distribution <Accent>cloud-native</Accent>.
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
      <DistCard tag="helm" title="Helm Chart" desc="déploiement K8s en une commande, production-ready." />
      <DistCard tag="operator" title="Opérateur Kubernetes" desc="gestion déclarative via CRDs." />
      <DistCard tag="cli" title="CLI" desc="bootstrap, import / export, GitOps-friendly." />
      <DistCard tag="terraform" title="Terraform Provider" desc="realms, clients, scopes versionnés en IaC." />
    </div>
    <div style={{ marginTop: 26, fontFamily: mono, fontSize: 23, color: muted }}>
      <Accent>//</Accent> ton IAM entre dans ton GitOps workflow comme{" "}
      <span style={{ color: "var(--osd-text)" }}>n&apos;importe quelle autre infra</span>.
    </div>
  </Stage>
);

// ----------------------------------------------------------------------------
// 13 — Pourquoi Rust ?
// ----------------------------------------------------------------------------

const RustCard = ({
  title,
  consequence,
}: {
  title: string;
  consequence: React.ReactNode;
}) => (
  <div
    style={{
      background: surface,
      border: `1px solid ${hairline}`,
      borderTop: `3px solid var(--osd-accent)`,
      borderRadius: "var(--osd-radius)",
      padding: "26px 30px",
    }}
  >
    <div
      style={{
        fontFamily: "var(--osd-font-display)",
        fontSize: 32,
        fontWeight: 600,
        marginBottom: 12,
      }}
    >
      {title}
    </div>
    <div style={{ fontSize: 25, color: muted, lineHeight: 1.45 }}>
      <Accent>→ </Accent>
      {consequence}
    </div>
  </div>
);

const WhyRust: Page = () => (
  <Stage pad="78px 120px 120px" footerLabel="FERRISKEY · POURQUOI RUST">
    <Eyebrow>FerrisKey</Eyebrow>
    <h2 style={{ ...display(62), margin: "20px 0 28px" }}>
      Pourquoi <Accent>Rust</Accent> ?
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
      <Steps>
        <Step>
          <RustCard title="Pas de GC" consequence="latence P99 maîtrisée, pas de pauses imprévisibles." />
        </Step>
        <Step>
          <RustCard title="Sécurité mémoire" consequence="buffer overflow et use-after-free éliminés à la compilation." />
        </Step>
        <Step>
          <RustCard title="Empreinte faible" consequence="container léger, démarrage rapide, moins de ressources." />
        </Step>
        <Step>
          <RustCard title="Architecture hexagonale" consequence="logique métier isolée, testabilité maximale." />
        </Step>
      </Steps>
    </div>
  </Stage>
);

// ----------------------------------------------------------------------------
// 14 — IAM pour l'ère agent
// ----------------------------------------------------------------------------

const AgentEra: Page = () => (
  <Stage pad="80px 120px 120px" mark footerLabel="ÈRE AGENT · NOUVEAU PARADIGME">
    <Eyebrow>L&apos;ère agent</Eyebrow>
    <h2 style={{ ...display(58), margin: "20px 0 24px" }}>
      Un nouveau <Accent>paradigme</Accent>.
    </h2>
    <p style={{ fontSize: 32, color: muted, lineHeight: 1.5, margin: "0 0 26px", maxWidth: 1560 }}>
      Un agent LLM appelle des APIs en ton nom, délègue à des sous-agents, opère
      headless pendant des heures, agit dans plusieurs domaines de sécurité.
    </p>
    <div
      style={{
        alignSelf: "flex-start",
        background: rustSoft,
        border: `1px solid var(--osd-accent)`,
        borderRadius: "var(--osd-radius)",
        padding: "20px 30px",
        fontFamily: "var(--osd-font-display)",
        fontSize: 38,
        fontWeight: 500,
        color: rustInk,
        marginBottom: 30,
      }}
    >
      Le modèle «&nbsp;compte permanent + mot de passe&nbsp;» ne tient plus.
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
      <Chip>identités éphémères</Chip>
      <Chip>durée de vie bornée</Chip>
      <Chip>scope minimal</Chip>
      <Chip>révocabilité instantanée</Chip>
    </div>
  </Stage>
);

// ----------------------------------------------------------------------------
// 15 — Token Exchange & délégation
// ----------------------------------------------------------------------------

const TokenExchange: Page = () => (
  <Stage justify="center" footerLabel="ÈRE AGENT · TOKEN EXCHANGE">
    <Eyebrow>Délégation · RFC 8693</Eyebrow>
    <h2 style={{ ...display(60), margin: "22px 0 24px", maxWidth: 1560 }}>
      Token Exchange &amp; <Accent>délégation</Accent>.
    </h2>
    <p style={{ fontSize: 32, color: muted, lineHeight: 1.45, margin: "0 0 40px", maxWidth: 1500 }}>
      Un agent échange un token parent contre un token fils aux droits réduits.
    </p>
    <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
      <FlowNode>Agent parent</FlowNode>
      <FlowArrow />
      <FlowNode accent>Token Exchange</FlowNode>
      <FlowArrow />
      <FlowNode>Token fils · scope réduit · TTL court</FlowNode>
      <FlowArrow />
      <FlowNode>Appel API</FlowNode>
    </div>
    <div style={{ marginTop: 40, fontFamily: mono, fontSize: 24, color: muted }}>
      <Accent>//</Accent> c&apos;est exactement ce qu&apos;on construit{" "}
      <span style={{ color: "var(--osd-text)" }}>nativement</span> dans FerrisKey.
    </div>
  </Stage>
);

// ----------------------------------------------------------------------------
// 16 — XAA, W3C VC 2.0, eIDAS 2.0
// ----------------------------------------------------------------------------

const StandardCard = ({
  tag,
  title,
  desc,
}: {
  tag: string;
  title: string;
  desc: React.ReactNode;
}) => (
  <TopCard tag={tag} title={title} minHeight={320}>
    <p style={{ fontSize: 24, color: muted, lineHeight: 1.5, margin: 0 }}>{desc}</p>
  </TopCard>
);

const Standards: Page = () => (
  <Stage pad="78px 120px 120px" footerLabel="ÈRE AGENT · STANDARDS">
    <Eyebrow>Les standards qui arrivent</Eyebrow>
    <h2 style={{ ...display(54), margin: "18px 0 26px" }}>
      XAA · W3C VC 2.0 · <Accent>eIDAS 2.0</Accent>.
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
      <StandardCard
        tag="XAA"
        title="Cross-Domain Authz"
        desc="faire traverser une identité entre organisations, de façon sécurisée."
      />
      <StandardCard
        tag="W3C VC 2.0"
        title="Verifiable Credentials"
        desc="attestations cryptographiques portées par l'utilisateur, vérifiables sans appel centralisé."
      />
      <StandardCard
        tag="eIDAS 2.0"
        title="Wallets d'identité"
        desc="wallets d'identité numériques obligatoires pour les États membres de l'UE."
      />
    </div>
    <div style={{ marginTop: 24, fontFamily: mono, fontSize: 22, color: muted }}>
      <Accent>//</Accent> en prod d&apos;ici 2-3 ans. On construit FerrisKey{" "}
      <span style={{ color: "var(--osd-text)" }}>aujourd&apos;hui</span> pour être prêts le jour où ils débarquent.
    </div>
  </Stage>
);

// ----------------------------------------------------------------------------
// 17 — Conclusion & CTA
// ----------------------------------------------------------------------------

const CtaRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "200px 1fr",
      columnGap: 28,
      alignItems: "baseline",
      padding: "18px 0",
      borderTop: `1px solid ${hairline}`,
    }}
  >
    <div
      style={{
        fontFamily: mono,
        fontSize: 18,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--osd-accent)",
      }}
    >
      {label}
    </div>
    <div style={{ fontFamily: mono, fontSize: 28, color: "var(--osd-text)" }}>
      {value}
    </div>
  </div>
);

const Conclusion: Page = () => (
  <div
    style={{
      ...fill,
      padding: "0 140px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Fonts />
    <GridBackdrop />
    <CrabMark />
    <div
      style={{
        position: "relative",
        zIndex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 360px",
        columnGap: 80,
        alignItems: "center",
      }}
    >
      <div>
        <Eyebrow>Conclusion</Eyebrow>
        <h2 style={{ ...display(72), margin: "28px 0 14px", maxWidth: 1100 }}>
          Un <Accent>STS</Accent> natif de l&apos;ère agent.
        </h2>
        <p style={{ fontSize: 30, color: muted, lineHeight: 1.45, margin: "0 0 26px", maxWidth: 1040 }}>
          Pas un IAM classique qu&apos;on rafistole. Pensé pour ça dès le départ.
        </p>
        <div>
          <CtaRow label="GitHub" value="github.com/ferriskey/ferriskey" />
          <CtaRow
            label="Code AsynConf"
            value={
              <span
                style={{
                  background: rustSoft,
                  border: `1px solid var(--osd-accent)`,
                  borderRadius: 6,
                  padding: "4px 14px",
                  color: rustInk,
                }}
              >
                FERRIS15
              </span>
            }
          />
        </div>
      </div>
      <div
        style={{
          background: surface,
          border: `1px solid ${hairline}`,
          borderRadius: "var(--osd-radius)",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <ImagePlaceholder hint="QR code → docs.ferriskey.rs / Discord / GitHub" width={300} height={300} />
        <div style={{ fontFamily: mono, fontSize: 18, color: muted, letterSpacing: "0.08em" }}>
          docs · Discord · GitHub
        </div>
      </div>
    </div>

    <div
      style={{
        position: "absolute",
        left: 140,
        right: 140,
        bottom: 56,
        zIndex: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: mono,
        fontSize: 22,
        color: muted,
      }}
    >
      <span>Nathael Bonnal · Baptiste Parmantier · FerrisKey</span>
      <span>
        <span style={{ color: "var(--osd-accent)" }}>// </span>
        Merci. Questions ?
      </span>
    </div>
  </div>
);
Conclusion.transition = coverTransition;

// ----------------------------------------------------------------------------

export const meta: SlideMeta = {
  title: "Repenser l'IAM · FerrisKey · Asynconf",
  createdAt: "2026-06-23T21:59:13.564Z",
};

export default [
  Cover,
  Agenda,
  Identity,
  AuthNZ,
  Oauth,
  IdpFedSso,
  GoldenRule,
  WiamCiam,
  Panorama,
  Vision,
  Features,
  Distribution,
  WhyRust,
  AgentEra,
  TokenExchange,
  Standards,
  Conclusion,
] satisfies Page[];
