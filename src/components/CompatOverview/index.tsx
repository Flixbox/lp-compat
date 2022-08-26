import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import apps from "../../../static/compat-data/apps.json";
import playstore from "../../../static/compat-data/playstore.json";
import { Card, Typography, CardContent, Grid, Avatar } from "@mui/material";

export default function CompatOverview(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <Grid container>
            {Object.entries(apps).map(([appId, { iap }]) => {
              const { title, icon } = playstore[appId];
              return (
                <Grid item margin={1}>
                  <Card>
                    <CardContent>
                      <Avatar src={icon} variant="square"></Avatar>
                      <Typography>{appId}</Typography>
                      {iap}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </section>
  );
}
