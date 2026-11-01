
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  ArrowBackRounded,
  LocalHospitalRounded,
} from "@mui/icons-material";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

interface AppLayoutProps {
  children?: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        color="inherit"
        sx={{
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 76, gap: 2 }}>
            <Stack
              component={Link}
              to="/"
              direction="row"
              spacing={1.5}
              sx={{
                color: "text.primary",
                textDecoration: "none",
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 3,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  flexShrink: 0,
                }}
              >
                <LocalHospitalRounded />
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1.15,
                    letterSpacing: "-0.04em",
                  }}
                >
                  Patientor
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Patient management
                </Typography>
              </Box>
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            {!isHomePage && (
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<ArrowBackRounded />}
                onClick={() => navigate(-1)}
                sx={{
                  minWidth: { xs: 40, sm: "auto" },
                  borderRadius: 2.5,
                  borderColor: "divider",
                  color: "text.primary",
                  "& .MuiButton-startIcon": {
                    mr: { xs: 0, sm: 1 },
                  },
                }}
              >
                <Box sx={{ display: { xs: "none", sm: "inline" } }}>
                  Back
                </Box>
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          py: { xs: 3, md: 5 },
        }}
      >
        <Container maxWidth="xl">
          {children ?? <Outlet />}
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          borderTop: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          py: 2.5,
        }}
      >
        <footer>
          <p
            style={{
              paddingTop: "12px",
              paddingBottom: "12px",
              marginTop: 0,
              marginBottom: 0,
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            Built with React + TS & Emotion
          </p>

          {/* GitHub */}
          <aside className="github">
            <div
              style={{
                zIndex: 2,
                position: "fixed",
                width: "200px",
                height: "200px",
                right: 0,
                bottom: 0,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "block",
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 0,
                  width: 0,
                  height: 0,
                  borderTop: "200px solid transparent",
                  borderLeft: "200px solid transparent",
                  borderBottom: "200px solid #343535",
                }}
              />

              <div
                style={{
                  zIndex: 1,
                  width: "100%",
                  height: "100%",
                  top: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  transform: "rotate(-45deg)",
                }}
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  aria-label="github-repo"
                  href="https://github.com/realNormanik/full-stack-open/tree/main/part9/patientor-frontend"
                  className="github-link"
                  style={{
                  fontSize: "16px",
                  fontFamily: "monospace",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "3px 24px 24px",
                  margin: 0,
                  marginBottom: "-20px",
                  transition:
                    "color 150ms cubic-bezier(1, -.115, .975, .855)",
                  }}
                >
                  <p
                    style={{
                      color: "currentColor",
                      fontWeight: 400,
                      fontSize: "16px",
                      marginTop: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    View on GitHub
                  </p>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    aria-hidden="true"
                    width="35"
                    height="35"
                    style={{
                      fill: "currentColor",
                    }}
                  >
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1.6 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2.3z" />
                  </svg>
                </a>
              </div>
            </div>
          </aside>
        </footer>
      </Box>
    </Box>
  );
};

export default AppLayout;