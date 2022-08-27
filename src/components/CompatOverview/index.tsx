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
  CardMedia,
} from "@mui/material";
import Link from "@docusaurus/Link";

/*
 * TODO
 * Add more apps
 */

type AppInfo = {
  string: {
    iap: number;
    category?: string;
    features?: string[];
  };
};

const appInfo = apps as unknown as AppInfo;

export default function CompatOverview(): JSX.Element {
  const theme = useTheme();

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <Box>
            <Typography>
              Anything missing? Create an{" "}
              <Link href="https://github.com/Flixbox/lp-compat/issues">
                issue
              </Link>{" "}
              or post on the{" "}
              <Link href="https://discord.gg/RS5ddYf7mw">Discord</Link>!
            </Typography>

            <Typography>
              All apps are patched using no root and{" "}
              <Link href="/docs/intro">
                the default IAP and Adblock patches
              </Link>{" "}
              only.
            </Typography>

            <Typography>
              Check out the{" "}
              <Link href="/docs/honorable-mentions">honorable mentions</Link>{" "}
              too!
            </Typography>
          </Box>
        </div>
        <div className="row">
          <Typography variant="h3">Hall of Fame</Typography>
          <Grid container>
            {Object.entries(appInfo).map(([appId, { category }]) => {
              if (category === "hof")
                return <AppTile appId={appId} key={appId} />;
            })}
          </Grid>
        </div>
        <div className="row">
          <Typography variant="h3">Other apps</Typography>
          <Grid container>
            {Object.entries(appInfo).map(([appId, { category, features }]) => {
              if (category !== "hof" && features.indexOf("iap") > -1)
                return <AppTile appId={appId} key={appId} />;
            })}
          </Grid>
        </div>
        <div className="row">
          <Typography variant="h3">Incompatible apps</Typography>
          <Grid container>
            {Object.entries(appInfo).map(([appId, { category, features }]) => {
              if (features.indexOf("iap") === -1)
                return <AppTile appId={appId} key={appId} />;
            })}
          </Grid>
        </div>
      </div>
    </section>
  );
}

const AppTile = ({ appId }: { appId: keyof AppInfo }) => {
  const theme = useTheme();
  const { iap, features } = appInfo[appId];
  const { title, icon, installs, scoreText, url, genre, screenshots } =
    playstore[appId];

  const featureMap = {
    iap: {
      label: "IAP patch works!",
      color: theme.palette.success.main,
    },
    "no-iap": {
      label: "IAP incompatible",
      color: theme.palette.error.main,
    },
    "facebook-login": {
      label: "Facebook login works!",
      color: theme.palette.info.main,
    },
    multiplayer: {
      label: "Multiplayer compatible with default patch",
      color: theme.palette.primary.main,
    },
  };

  return (
    <Grid item margin={1} xs={12} sm="auto">
      <a href={url}>
        <Card>
          <CardMedia component="img" height="140" image={screenshots[0]} />
          <CardContent sx={{ padding: "8px" }}>
            {features &&
              features.map((feature) => (
                <Paper
                  component={Box}
                  elevation={0}
                  padding={0.5}
                  sx={{ backgroundColor: featureMap[feature].color }}
                  key={feature}
                >
                  <Typography
                    color={theme.palette.getContrastText(
                      featureMap[feature].color
                    )}
                  >
                    {featureMap[feature].label}
                  </Typography>
                </Paper>
              ))}
            <Box display="flex" mt={1}>
              <Avatar
                src={icon}
                variant="square"
                sx={{ marginRight: 1 }}
              ></Avatar>
              <Box display="flex" flexDirection="column">
                <Typography>{title}</Typography>
                <Typography variant="subtitle2">{appId}</Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle2">⭐{scoreText}</Typography>
              <Typography variant="subtitle2">📩 {installs}</Typography>
            </Box>
            <Typography variant="subtitle2">{genre}</Typography>
          </CardContent>
        </Card>
      </a>
    </Grid>
  );
};
