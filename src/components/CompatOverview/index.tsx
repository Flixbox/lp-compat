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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import {
  faBan,
  faRectangleAd,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

/*
 * TODO
 * Add more apps, including the ones from the old compat lists
 * Add a lil shop block icon
 */

type AppInfo = {
  string: {
    iap: number;
    category?: string;
    features?: string[];
  };
};

const appInfo = apps as unknown as AppInfo;

type FeatureItem = {
  icon: JSX.Element;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    icon: (
      <span className="fa-layers fa-fw">
        <FontAwesomeIcon icon={faRectangleAd} size="3x" color="#607d8b" />
        <FontAwesomeIcon icon={faBan} size="3x" color="#e51c23" />
      </span>
    ),
    description: (
      <Typography>
        All apps are patched using no root and{" "}
        <Link href="/docs/intro">the default IAP and Adblock patches</Link>{" "}
        only.
      </Typography>
    ),
  },
  {
    icon: <FontAwesomeIcon icon={faDiscord} size="3x" color="#607d8b" />,
    description: (
      <Typography>
        Anything missing? Create an{" "}
        <Link href="https://github.com/Flixbox/lp-compat/issues">issue</Link> or
        post on the <Link href="https://discord.gg/RS5ddYf7mw">Discord</Link>!
      </Typography>
    ),
  },
  {
    icon: <FontAwesomeIcon icon={faTrophy} size="3x" color="#607d8b" />,
    description: (
      <Typography>
        Check out the{" "}
        <Link href="/docs/honorable-mentions">honorable mentions</Link> too!
      </Typography>
    ),
  },
];

function Feature({ icon, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <Box className="text--center" height="50px">
        {icon}
      </Box>
      <div className="text--center padding-horiz--md">{description}</div>
    </div>
  );
}

export default function CompatOverview(): JSX.Element {
  const theme = useTheme();

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <Box m={3} />
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

const AppTile = ({ appId }: { appId: string }) => {
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
    "no-subscription": {
      label: "Subscription cannot be redeemed",
      color: theme.palette.warning.main,
    },
    repurchase: {
      label: "Some IAPs need to be redeemed after every restart",
      color: theme.palette.warning.main,
    },
    "facebook-login": {
      label: "Facebook login works!",
      color: theme.palette.info.main,
    },
    multiplayer: {
      label: "Multiplayer compatible",
      color: theme.palette.primary.main,
    },
    "no-multiplayer": {
      label: "Singleplayer only",
      color: theme.palette.warning.main,
    },
    "dont-bother": {
      label: "Don't bother. This game is either grindy or uninteresting.",
      color: theme.palette.warning.main,
    },
    "region-locked": {
      label: "If region locked, use Google Account from another region",
      color: theme.palette.warning.main,
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
