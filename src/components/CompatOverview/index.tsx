import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { Virtuoso } from "react-virtuoso";
import { store } from "../../redux";
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
  ThemeProvider,
  createTheme,
  Button,
  Select,
  MenuItem,
  IconButton,
  styled,
  CircularProgress,
  Container,
} from "@mui/material";
import Link from "@docusaurus/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import {
  faAdd,
  faBan,
  faCaretDown,
  faCommentsDollar,
  faEye,
  faEyeSlash,
  faListCheck,
  faPen,
  faRectangleAd,
  faRefresh,
  faStore,
  faTrophy,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { xor } from "lodash";
import { usePersistentState } from "react-persistent-state";
import getFeature from "../../featureMap";
import { useColorMode } from "@docusaurus/theme-common";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchApp,
  fetchAppCount,
  fetchApps,
  fetchAppsByPage,
  pageSize,
} from "@site/src/redux/appsSlice";
import { Provider, useStore } from "react-redux";
import {
  clearState,
  fetchDiscord,
  openDialog,
} from "@site/src/redux/systemSlice";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

import { App } from "@site/src/types";
import DialogProvider from "../DialogProvider";

import MarkdownPreview from "@uiw/react-markdown-preview";
import LinkSolid from "../../../static/img/link-solid.svg";

// TODO Move that login button to main component so it works on mobile or update it every second

const StyledMarkdown = styled(MarkdownPreview)(
  ({ theme, backgroundColor }) => `
  && {
    background-color: transparent;
    color: ${theme.palette.getContrastText(backgroundColor)};
    && a {
      color: ${theme.palette.getContrastText(backgroundColor)};
      &::after {
        content: "";
        display: inline-block;
        width: 13px;
        height: 13px;
        opacity: 0.6;
        margin: 4px 4px 0px 4px;
        background: url(/lp-compat/img/link-solid.svg) center no-repeat;
      }
    }
  }
`
);

const Root = () => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Provider store={store}>
        <ThemeProvider
          theme={createTheme({
            palette: {
              mode: colorMode,
            },
          })}
        >
          <CompatOverview />
          <DialogProvider />
        </ThemeProvider>
      </Provider>
    </>
  );
};

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
        No root access is required for these patches, except for apps in the
        "Root" category.
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
            icon={faCommentsDollar}
            color="#e51c23"
            size="xs"
            opacity={0.9}
            transform="down-4 right-8"
          />
        </Box>
      </Box>
    ),
    description: (
      <Typography>
        Apps are patched using{" "}
        <Link href="/docs/intro">the default IAP and Adblock patches</Link>.
      </Typography>
    ),
  },
  {
    icon: <FontAwesomeIcon icon={faListCheck} color="#607d8b" />,
    description: (
      <Typography>
        Many apps work with LP, even if they're not on the list.
        <br />
        Please try them yourself and report back!
      </Typography>
    ),
  },
  {
    icon: <FontAwesomeIcon icon={faDiscord} color="#607d8b" />,
    description: (
      <Typography>
        Found something? Create an{" "}
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

const CompatOverview = () => {
  const dispatch = useAppDispatch();
  const [appTitleFilter, setAppTitleFilter] = usePersistentState(
    "",
    "appsTitleFilter"
  );
  const [sorting, setSorting] = usePersistentState(
    "installs-asc",
    "apps-sorting"
  );
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [appCount, setAppCount] = useState(0);
  const apps = useAppSelector<App[]>((state) => state.apps);
  const { appsListUpdated, discordUser } = useAppSelector(
    (state) => state.system
  );

  let code;
  if (ExecutionEnvironment.canUseDOM) {
    code = new URLSearchParams(window.location.search).get("code");
  }
  if (discordUser) {
    const loginButton = document.getElementById("discord-login");
    loginButton.innerHTML = discordUser.username;
  }

  useEffect(() => {
    dispatch(fetchAppCount()).then((res) => {
      setAppCount(res.payload);
    });

    if (code) dispatch(fetchDiscord({ code }));
  }, []);

  const visibilitySettings = [
    {
      id: "compatible",
      title: "Compatible apps",
      onlyRenderIf: (app: App) => app && app.features?.indexOf("iap") > -1,
    },
    {
      id: "unclear-iap",
      title: "Uncategorized",
      onlyRenderIf: (app: App) =>
        app &&
        app.features?.indexOf("iap") === -1 &&
        app.features?.indexOf("no-iap") === -1,
    },
    {
      id: "incompatible",
      title: "Incompatible apps",
      onlyRenderIf: (app: App) => app && app.features?.indexOf("no-iap") > -1,
    },
  ];

  const [onlyShowTheseCategories, setOnlyShowTheseCategories] =
    usePersistentState(
      visibilitySettings.map((category) => category.id),
      "onlyShowTheseVisibilitySettings"
    );

  if (!sorting) setSorting("installs-asc");

  const sortOptions = {
    "name-asc": {
      title: "Sort by name",
      getSortedApps: () =>
        [...apps].sort((a, b) => a && b && a.title.localeCompare(b.title)),
    },
    "installs-asc": {
      title: "Sort by downloads",
      getSortedApps: () =>
        [...apps].sort((a, b) => a && b && b.minInstalls - a.minInstalls),
    },
    "date-modified": {
      title: "Sort by last modified",
      getSortedApps: () =>
        [...apps].sort((a, b) => a && b && b.dateModified - a.dateModified),
    },
  };

  const refreshApps = () => {
    dispatch(clearState());
    clear();
  };

  const sortedApps = sortOptions[sorting].getSortedApps();

  const appsListComplete = apps.length >= appCount;

  const loadMore = () => {
    if (loading) return;
    if (appsListComplete) {
      if (loading) setLoading(false);
      return;
    }
    !loading && setLoading(true);
    dispatch(fetchApps()).then(() => {
      setLoading(false);
    });
  };

  // Attempt to finish loading
  useEffect(() => loadMore(), [apps, loading, appCount]);

  const renderedApps = sortedApps.filter((app) => {
    if (!app || !app.appId) return;
    if (
      app.title.toLowerCase().indexOf(appTitleFilter) === -1 &&
      app.appId.toLowerCase().indexOf(appTitleFilter) === -1
    )
      return;

    let shouldRenderApp = false;
    onlyShowTheseCategories.forEach((category) => {
      if (
        visibilitySettings
          .find((setting) => setting.id === category)
          .onlyRenderIf(app)
      )
        shouldRenderApp = true;
    });
    if (!shouldRenderApp) return;

    return app;
  });

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
          <Grid container>
            {discordUser?.username && (
              <Button
                onClick={() => {
                  dispatch(openDialog({ dialog: "EDIT_APP", data: {} }));
                }}
              >
                <FontAwesomeIcon icon={faAdd} /> New app
              </Button>
            )}
            <Typography variant="h3">Filter apps</Typography>
            <Box flexGrow={1} />
            <Button
              variant="outlined"
              onClick={async () => {
                const response = await fetch(
                  "https://luck.up.railway.app/apps/all"
                );
                const json = await response.json();
                const formattedJson = JSON.stringify(json, null, 2);
                const blob = new Blob([formattedJson], {
                  type: "application/json",
                });
                const href = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = href;
                link.download = "lucky-patcher-app-compatibility.json";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              style={{ marginRight: 4 }}
            >
              <FontAwesomeIcon
                icon={faDownload}
                size="lg"
                opacity={0.9}
                style={{ marginRight: 8 }}
              />
              JSON
            </Button>
            <Select
              value={sorting}
              onChange={(e) => setSorting(e.target.value)}
            >
              {Object.entries(sortOptions).map((element) => (
                <MenuItem value={element[0]} key={element[0]}>
                  {element[1].title}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Input
            placeholder="Filter app title or ID"
            value={appTitleFilter}
            onChange={(e) =>
              setAppTitleFilter(e.currentTarget.value.toLowerCase())
            }
          />

          {visibilitySettings.map(({ id, title }) => (
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
        <Typography>
          {`Loaded ${apps.length} out of ${appCount} apps!`}
          {loading && ` Loading more...`}
          <br />
          <IconButton onClick={() => refreshApps()}>
            <FontAwesomeIcon icon={faRefresh} />
          </IconButton>
          {`Last refreshed: ${new Date(appsListUpdated).toLocaleString()}`}
        </Typography>

        {loading && <CircularProgress />}

        <Virtuoso
          style={{ height: "600px" }}
          totalCount={renderedApps.length}
          itemContent={(index) => <AppTile app={renderedApps[index]} />}
        />
      </div>
    </section>
  );
};

const AppTile = ({ app }: { app: App }) => {
  const theme = useTheme();
  if (!app || !app.appId) return;
  const {
    appId,
    features,
    dateModified,
    title,
    icon,
    installs,
    scoreText,
    url,
    genre,
    screenshots,
    free,
    priceText,
    editedBy,
  } = app;
  const { discordUser } = useAppSelector((state) => state.system);
  const dispatch = useAppDispatch();
  const store = useStore();

  return (
    <Grid item xs={12} m={1}>
      <Card style={{ maxWidth: "100%" }}>
        <CardContent sx={{ padding: "8px" }}>
          <a href={url}>
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
          </a>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle2">⭐{scoreText}</Typography>
            <Typography variant="subtitle2">📩 {installs}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" flexWrap="wrap">
            <Typography variant="subtitle2">{genre}</Typography>
            {dateModified && (
              <Typography variant="subtitle2" whiteSpace="nowrap">
                Entry last edited: {new Date(dateModified).toLocaleString()}
              </Typography>
            )}
            {editedBy && (
              <Typography variant="subtitle2" whiteSpace="nowrap">
                Modified by: {editedBy.userName} ({editedBy.userId})
              </Typography>
            )}
          </Box>
          {!free && <Typography variant="subtitle2">{priceText}</Typography>}
          {features &&
            features.map((feature) => (
              <Paper
                component={Box}
                elevation={0}
                padding={0.5}
                sx={{
                  backgroundColor: getFeature(feature, theme).color,
                }}
                key={feature}
                mt={0.5}
              >
                <Typography>
                  <StyledMarkdown
                    skipHtml
                    backgroundColor={getFeature(feature, theme).color}
                    wrapperElement={{
                      "data-color-mode": "light",
                    }}
                    source={getFeature(feature, theme).label}
                  />
                </Typography>
              </Paper>
            ))}
        </CardContent>
        {discordUser?.username && (
          <IconButton
            onClick={() => {
              dispatch(openDialog({ dialog: "EDIT_APP", data: { appId } }));
            }}
          >
            <FontAwesomeIcon icon={faPen} />
          </IconButton>
        )}
      </Card>
    </Grid>
  );
};

export default Root;
