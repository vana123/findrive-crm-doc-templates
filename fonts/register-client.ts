import { Font } from "@react-pdf/renderer";

let registered = false;

/**
 * Register Times New Roman font family (with latin-ext / Polish support)
 * for client-side @react-pdf/renderer (PDFViewer).
 * Uses /public/fonts/ URLs.
 */
export function registerFontsClient() {
  if (registered) return;
  registered = true;

  Font.register({
    family: "TimesNewRoman",
    fonts: [
      {
        src: "/fonts/TimesNewRoman-Regular.ttf",
        fontWeight: "normal",
        fontStyle: "normal",
      },
      {
        src: "/fonts/TimesNewRoman-Bold.ttf",
        fontWeight: "bold",
        fontStyle: "normal",
      },
      {
        src: "/fonts/TimesNewRoman-Italic.ttf",
        fontWeight: "normal",
        fontStyle: "italic",
      },
      {
        src: "/fonts/TimesNewRoman-BoldItalic.ttf",
        fontWeight: "bold",
        fontStyle: "italic",
      },
    ],
  });
}
