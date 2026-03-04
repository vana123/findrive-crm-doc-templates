import path from "path";
import { Font } from "@react-pdf/renderer";

const FONTS_DIR = path.join(process.cwd(), "doc-templates", "fonts");

let registered = false;

/**
 * Register Times New Roman font family (with latin-ext / Polish support)
 * for @react-pdf/renderer. Safe to call multiple times.
 */
export function registerFonts() {
  if (registered) return;
  registered = true;

  Font.register({
    family: "TimesNewRoman",
    fonts: [
      {
        src: path.join(FONTS_DIR, "TimesNewRoman-Regular.ttf"),
        fontWeight: "normal",
        fontStyle: "normal",
      },
      {
        src: path.join(FONTS_DIR, "TimesNewRoman-Bold.ttf"),
        fontWeight: "bold",
        fontStyle: "normal",
      },
      {
        src: path.join(FONTS_DIR, "TimesNewRoman-Italic.ttf"),
        fontWeight: "normal",
        fontStyle: "italic",
      },
      {
        src: path.join(FONTS_DIR, "TimesNewRoman-BoldItalic.ttf"),
        fontWeight: "bold",
        fontStyle: "italic",
      },
    ],
  });
}
