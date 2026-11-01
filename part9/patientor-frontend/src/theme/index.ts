
import { createTheme } from "@mui/material/styles";

export type ThemeMode = "light" | "dark";

export const getAppTheme = (mode: ThemeMode) => {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,

      primary: {
        main: isDark ? "#5EEAD4" : "#0F766E",
        light: isDark ? "#99F6E4" : "#CCFBF1",
        dark: isDark ? "#2DD4BF" : "#115E59",
        contrastText: isDark ? "#042F2E" : "#FFFFFF",
      },

      secondary: {
        main: isDark ? "#A5B4FC" : "#6366F1",
      },

      background: {
        default: isDark ? "#0B1120" : "#F7F9FC",
        paper: isDark ? "#111827" : "#FFFFFF",
      },

      text: {
        primary: isDark ? "#F1F5F9" : "#172033",
        secondary: isDark ? "#A0AEC0" : "#64748B",
      },

      divider: isDark ? "rgba(148, 163, 184, 0.18)" : "rgba(15, 23, 42, 0.09)",

      error: {
        main: isDark ? "#FDA4AF" : "#DC2626",
      },

      success: {
        main: isDark ? "#86EFAC" : "#15803D",
      },

      warning: {
        main: isDark ? "#FDE68A" : "#B45309",
      },

      action: {
        hover: isDark ? "rgba(148, 163, 184, 0.08)" : "rgba(15, 23, 42, 0.035)",

        selected: isDark ? "rgba(94, 234, 212, 0.12)" : "rgba(15, 118, 110, 0.09)",

        disabled: isDark ? "#64748B" : "#94A3B8",
      },
    },

    typography: {
      fontFamily: '"DM Sans", "Inter", Arial, sans-serif',

      h1: {
        fontFamily: '"Bricolage Grotesque", "DM Sans", sans-serif',
        fontWeight: 800,
        letterSpacing: "-0.045em",
      },

      h2: {
        fontFamily: '"Bricolage Grotesque", "DM Sans", sans-serif',
        fontWeight: 800,
        letterSpacing: "-0.04em",
      },

      h3: {
        fontFamily: '"Bricolage Grotesque", "DM Sans", sans-serif',
        fontWeight: 750,
        letterSpacing: "-0.04em",
      },

      h4: {
        fontFamily: '"Bricolage Grotesque", "DM Sans", sans-serif',
        fontWeight: 750,
        letterSpacing: "-0.035em",
      },

      h5: {
        fontWeight: 700,
        letterSpacing: "-0.025em",
      },

      h6: {
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },

      button: {
        fontWeight: 650,
        textTransform: "none",
      },
    },

    shape: {
      borderRadius: 12,
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            minHeight: "100vh",
            transition:
              "background-color 180ms ease, color 180ms ease",
          },

          "*": {
            boxSizing: "border-box",
          },

          "::selection": {
            backgroundColor: isDark
              ? "rgba(94, 234, 212, 0.28)"
              : "rgba(15, 118, 110, 0.18)",
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            border: `1px solid ${isDark ? "rgba(148, 163, 184, 0.16)" : "rgba(15, 23, 42, 0.07)"}`,
            boxShadow: isDark ? "0 8px 24px rgba(0, 0, 0, 0.12)" : "0 8px 24px rgba(15, 23, 42, 0.035)",
            backgroundImage: "none",
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            textTransform: "none",
            fontWeight: 650,
            boxShadow: "none",
            transition: "background-color 150ms ease, border-color 150ms ease",
          },

          contained: {
            "&:hover": {
              boxShadow: "none",
            },
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          size: "small",
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: isDark ? "rgba(148, 163, 184, 0.25)" : "rgba(15, 23, 42, 0.14)",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: isDark ? "#5EEAD4" : "#0F766E",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderWidth: 1.5,
            },
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: isDark ? "rgba(148, 163, 184, 0.14)" : "rgba(15, 23, 42, 0.07)",
          },

          head: {
            fontWeight: 700,
            color: isDark ? "#A0AEC0" : "#64748B",
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 8,
            fontSize: "0.75rem",
          },
        },
      },
    },
  });
};