import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import apps from "../../../static/compat-data/apps.json";
import playstore from "../../../static/compat-data/playstore.json";

export default function CompatOverview(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {Object.entries(apps).map(([appId, { iap }]) => (
            <p>
              {appId} {iap}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
