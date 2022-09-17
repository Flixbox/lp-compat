import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import CompatOverview from "@site/src/components/CompatOverview/index";

import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/material";
import { faFaceSmileWink } from "@fortawesome/free-solid-svg-icons";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <FontAwesomeIcon icon={faFaceSmileWink} size="4x" />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <Box className={styles.buttons} flex="1" flexDirection="column">
          <Link
            className="button button--secondary button--lg"
            to="/docs/lp-info"
          >
            Important info about LP 💡
          </Link>
          <Box m={1} />
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            How to install & patch an app 📖
          </Link>
          <Box m={1} />
          <Link className="button button--secondary button--lg" to="#apps">
            To the list 🚀
          </Link>
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
