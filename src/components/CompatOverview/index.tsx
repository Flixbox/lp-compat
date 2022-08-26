import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import apps from "../../../static/compat-data/apps.json";
import playstore from "../../../static/compat-data/playstore.json";
import { Card, Typography, CardContent, Grid } from "@mui/material";

export default function CompatOverview(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <Grid container>
            {Object.entries(apps).map(([appId, { iap }]) => (
              <Grid item margin={1}>
                <Card>
                  <CardContent>
                    {appId} {iap}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </section>
  );
}
