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
  Paper,
  useTheme,
} from "@mui/material";

export default function CompatOverview(): JSX.Element {
  const theme = useTheme();

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <Grid container>
            {Object.entries(apps).map(([appId, data]) => {
              return <AppTile appId={appId} {...data} />;
            })}
          </Grid>
        </div>
      </div>
    </section>
  );
}

const AppTile = ({ appId, iap }) => {
  const theme = useTheme();
  const { title, icon } = playstore[appId];
  const iapColor = iap ? theme.palette.success.main : theme.palette.error.main;
  const iapText = iap ? "IAP patch works!" : "IAP incompatible";
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
          <Paper
            component={Box}
            elevation={0}
            padding={0.5}
            sx={{ backgroundColor: iapColor }}
          >
            <Typography color={theme.palette.getContrastText(iapColor)}>
              {iapText}
            </Typography>
          </Paper>
        </CardContent>
      </Card>
    </Grid>
  );
};
