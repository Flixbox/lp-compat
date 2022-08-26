import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import apps from "../../../static/compat-data/apps.json";
import playstore from "../../../static/compat-data/playstore.json";
import {
  Card,
  Typography,
  CardContent,
  Grid,
  Avatar,
  Box,
} from "@mui/material";

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
                      <Box display="flex">
                        <Avatar src={icon} variant="square"></Avatar>
                        <Box display="flex" flexDirection="column">
                          <Typography variant="subtitle2">{title}</Typography>
                          <Typography variant="subtitle2">{appId}</Typography>
                        </Box>
                      </Box>
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
