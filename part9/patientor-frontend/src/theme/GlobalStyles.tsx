import { Global, css, useTheme } from "@emotion/react";

const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        html {
          min-width: 320px;
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: ${theme.palette.background.default};
          color: ${theme.palette.text.primary};
          font-family: ${theme.typography.fontFamily};
          -webkit-font-smoothing: antialiased;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button,
        input,
        textarea,
        select {
          font: inherit;
        }

        .github-link {
          color: #fff;
        }

        .github-link:hover {
          color: #a6a6a6;
        }

        *:focus-visible {
          outline: 3px solid ${theme.palette.primary.main};
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}
    />
  );
};

export default GlobalStyles;