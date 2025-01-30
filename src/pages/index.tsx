import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import CompatOverview from "@site/src/components/CompatOverview";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/material";
import { faFaceSmileWink } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

const LINKS = [
  { to: "/docs/lp-info", text: "Important info about LP 💡" },
  { to: "/docs/intro", text: "How to install & patch an app 📖" },
  { to: "/docs/favourites", text: "Community Favourites ⭐" },
  { to: "#apps", text: "To the list 🚀" },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <FontAwesomeIcon icon={faFaceSmileWink} size="4x" />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <Box className={styles.buttons} flex="1" flexDirection="column">
          {LINKS.map((link, index) => (
            <React.Fragment key={link.to}>
              <Link
                className="button button--secondary button--lg"
                to={link.to}
              >
                {link.text}
              </Link>
              {index < LINKS.length - 1 && <Box m={1} />}
            </React.Fragment>
          ))}
        </Box>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A full overview of Lucky Patcher Compatibility with various apps."
    >
      <HomepageHeader />
      <main>
        <CompatOverview />
      </main>
    </Layout>
  );
}
