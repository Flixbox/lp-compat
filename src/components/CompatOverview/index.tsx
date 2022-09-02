import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import apps from "../../../static/compat-data/apps.json";
import playstore from "../../../static/compat-data/playstore.json";
import ImageScroller from "react-image-scroller";
import RenderIfVisible from "react-render-if-visible";
import {
  Card,
  Typography,
  CardContent,
  Grid,
  Avatar,
  Box,
  Paper,
  useTheme,
  Chip,
  ListItem,
  Input,
} from "@mui/material";
import Link from "@docusaurus/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import {
  faBan,
  faBug,
  faEye,
  faEyeSlash,
  faRectangleAd,
  faStore,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { xor } from "lodash";
import { usePersistentState } from "react-persistent-state";

/*
 * TODO
 * Add more apps, including the ones from the old compat lists
 * Enhance categorization -  add toc
 * add filter bar
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
      <Box flex="1">
        <Box className="fa-layers fa-fw">
          <Typography
            className="fa-layers-text fa-inverse"
            color="#607d8b"
            fontWeight={900}
            fontSize={30}
          >
            ROOT
          </Typography>
          <FontAwesomeIcon
            icon={faBan}
            color="#e51c23"
            size="lg"
            opacity={0.9}
          />
        </Box>
      </Box>
    ),
    description: (
      <Typography>
        No root access is required for any of these patches.
      </Typography>
    ),
  },
  {
    icon: (
      <Box flex="1">
        <Box className="fa-layers fa-fw" mr={4}>
          <FontAwesomeIcon icon={faRectangleAd} color="#607d8b" />
          <FontAwesomeIcon
            icon={faBan}
            color="#e51c23"
            size="lg"
            opacity={0.9}
          />
        </Box>
        <Box className="fa-layers fa-fw" ml={4}>
          <FontAwesomeIcon icon={faStore} color="#607d8b" />
          <FontAwesomeIcon
            icon={faBug}
            color="#e51c23"
            size="xs"
            opacity={0.9}
            transform="down-4 right-4"
          />
        </Box>
      </Box>
    ),
    description: (
      <Typography>
        All apps are patched using{" "}
        <Link href="/docs/intro">the default IAP and Adblock patches</Link>{" "}
        only.
      </Typography>
    ),
  },
  {
    icon: <FontAwesomeIcon icon={faDiscord} color="#607d8b" />,
    description: (
      <Typography>
        Anything missing? Create an{" "}
        <Link href="https://github.com/Flixbox/lp-compat/issues">issue</Link> or
        post on the <Link href="https://discord.gg/RS5ddYf7mw">Discord</Link>!
      </Typography>
    ),
  },
  {
    icon: <FontAwesomeIcon icon={faTrophy} color="#607d8b" />,
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
      <Box className="text--center" height="70px" mt={3}>
        {icon}
      </Box>
      <div className="text--center padding-horiz--md">{description}</div>
    </div>
  );
}

const categoryList = [
  {
    id: "hof",
    title: "Hall of Fame",
    onlyRenderIf: (appInfo) => appInfo.category === "hof",
  },
  {
    id: "other-games",
    title: "Other games",
    onlyRenderIf: (appInfo) =>
      !appInfo.category && appInfo.features.indexOf("iap") > -1,
  },
  {
    id: "tools",
    title: "Tools",
    onlyRenderIf: (appInfo) => appInfo.category === "tools",
  },
  {
    id: "unclear-iap",
    title: "Needs verification",
    onlyRenderIf: (appInfo) => appInfo.category === "unclear-iap",
  },
  {
    id: "root",
    title: "root",
    onlyRenderIf: (appInfo) => appInfo.category === "root",
  },
  {
    id: "incompatible",
    title: "Incompatible apps",
    onlyRenderIf: (appInfo) =>
      !appInfo.category && appInfo.features.indexOf("iap") === -1,
  },
];

export default function CompatOverview(): JSX.Element {
  const theme = useTheme();
  const [onlyShowTheseCategories, setOnlyShowTheseCategories] =
    usePersistentState(categoryList.map((category) => category.id));
  const [appTitleFilter, setAppTitleFilter] = usePersistentState("");

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row fa-3x">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <Box m={8} />
        <Box className="row" display="flex" flexDirection="column">
          <Typography variant="h3">Filter apps</Typography>
          <Input
            placeholder="Filter app title or ID"
            value={appTitleFilter}
            onChange={(e) =>
              setAppTitleFilter(e.currentTarget.value.toLowerCase())
            }
          />
          {categoryList.map(({ id, title }) => (
            <ListItem key={id}>
              <Chip
                label={title}
                onClick={() =>
                  setOnlyShowTheseCategories(xor(onlyShowTheseCategories, [id]))
                }
                icon={
                  <FontAwesomeIcon
                    icon={
                      onlyShowTheseCategories.indexOf(id) !== -1
                        ? faEye
                        : faEyeSlash
                    }
                    color="#e51c23"
                    size="lg"
                    opacity={0.9}
                  />
                }
              />
            </ListItem>
          ))}
        </Box>
        <div id="apps"></div>
        {categoryList.map(
          ({ id, title, onlyRenderIf }) =>
            onlyShowTheseCategories.indexOf(id) !== -1 && (
              <div className="row" key={id}>
                <Typography variant="h3" id={id}>
                  {title}
                </Typography>
                <Grid container>
                  {Object.entries(appInfo).map(([appId, app]) => {
                    if (
                      onlyRenderIf(app) &&
                      (playstore[appId].title
                        .toLowerCase()
                        .indexOf(appTitleFilter) !== -1 ||
                        appId.toLowerCase().indexOf(appTitleFilter) !== -1)
                    )
                      return <AppTile appId={appId} key={appId} />;
                  })}
                </Grid>
              </div>
            )
        )}
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
    "partial-iap": {
      label: "IAP partially compatible",
      color: theme.palette.warning.main,
    },
    "unclear-iap": {
      label: "IAP need verification - Try it out and post in Discord!",
      color: theme.palette.warning.main,
    },
    "no-iap": {
      label: "IAP incompatible",
      color: theme.palette.error.main,
    },
    subscription: {
      label: "Subscription redeemable!",
      color: theme.palette.success.main,
    },
    "no-subscription": {
      label: "Subscription cannot be redeemed",
      color: theme.palette.warning.main,
    },
    repurchase: {
      label: "Some IAPs need to be redeemed after every restart",
      color: theme.palette.warning.main,
    },
    "account-login": {
      label: "Account login works!",
      color: theme.palette.info.main,
    },
    "facebook-login": {
      label: "Facebook login works!",
      color: theme.palette.info.main,
    },
    "facebook-login-broken": {
      label: "Facebook login broken",
      color: theme.palette.warning.main,
    },
    transfer: {
      label: "Game data can be transferred to another account",
      color: theme.palette.info.main,
    },
    multiplayer: {
      label: "Full Multiplayer; IAP compatible",
      color: theme.palette.primary.main,
    },
    "partial-multiplayer": {
      label: "Game has some multiplayer features; IAP compatible",
      color: theme.palette.primary.main,
    },
    "no-multiplayer": {
      label: "Singleplayer only",
      color: theme.palette.warning.main,
    },
    "no-multiplayer-iap": {
      label: "Multiplayer IAP broken",
      color: theme.palette.warning.main,
    },
    "slightly-broken": {
      label: "Slightly broken, but playable",
      color: theme.palette.warning.main,
    },
    "too-many-iap-break": {
      label: "Buying too many IAP will break the game!",
      color: theme.palette.warning.main,
    },
    "subscription-restore-purchase": {
      label: "Subscription can be redeemed by restoring purchase",
      color: theme.palette.info.main,
    },
    "dont-bother": {
      label: "Don't bother. This game is either grindy or uninteresting.",
      color: theme.palette.warning.main,
    },
    "region-locked": {
      label: "If region locked, use Google Account from another region",
      color: theme.palette.warning.main,
    },
    "root-patch": {
      label: "Root patch available",
      color: theme.palette.info.main,
    },
    "root-patch-iap": {
      label: "Patch app with root to make IAP work!",
      color: theme.palette.info.main,
    },
  };

  return (
    <Grid item xs={12} m={1}>
      <RenderIfVisible defaultHeight={800} stayRendered>
        <a href={url}>
          <Card style={{ maxWidth: "100%" }}>
            <CardContent sx={{ padding: "8px" }}>
              <ImageScroller hideScrollbar={false} style={{ height: "200px" }}>
                {screenshots.map((image) => (
                  <img
                    src={image}
                    alt="Game screenshot"
                    loading="lazy"
                    key={image}
                  />
                ))}
              </ImageScroller>
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
      </RenderIfVisible>
    </Grid>
  );
};
