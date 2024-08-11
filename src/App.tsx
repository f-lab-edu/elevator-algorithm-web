import { Global, css } from "@emotion/react";
import emotionReset from "emotion-reset";
import "./App.css";
import ElevatorController from "./components/ElevatorController";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Section from "./components/Section";

function App() {
  return (
    <>
      <Global
        styles={css`
          ${emotionReset}

          *,
          *::after,
          *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
            font-size: 16px;
            font-family: "Plus Jakarta Sans";
          }

          html,
          body,
          div,
          span,
          applet,
          object,
          iframe,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p,
          blockquote,
          pre,
          a,
          abbr,
          acronym,
          address,
          big,
          cite,
          code,
          del,
          dfn,
          em,
          img,
          ins,
          kbd,
          q,
          s,
          samp,
          small,
          strike,
          strong,
          sub,
          sup,
          tt,
          var,
          b,
          u,
          i,
          center,
          dl,
          dt,
          dd,
          ol,
          ul,
          li,
          fieldset,
          form,
          label,
          legend,
          table,
          caption,
          tbody,
          tfoot,
          thead,
          tr,
          th,
          td,
          article,
          aside,
          canvas,
          details,
          embed,
          figure,
          figcaption,
          footer,
          header,
          hgroup,
          menu,
          nav,
          output,
          ruby,
          section,
          summary,
          time,
          mark,
          audio,
          video {
            font-family: "Plus Jakarta Sans";
          }
        `}
      />
      <Layout>
        <Header />
        <Section>
          <ElevatorController />
        </Section>
      </Layout>
    </>
  );
}

export default App;
