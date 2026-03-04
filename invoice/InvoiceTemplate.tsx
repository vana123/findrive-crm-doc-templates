"use client";

import { registerFontsClient } from "../fonts/register-client";
import findriveLogo from "../img/findrivelogo.jpg";
import { InvoiceLayout } from "./InvoiceLayout";

registerFontsClient();

type Props = import("./types").InvoiceTemplateProps;

export function InvoiceTemplate(props: Props) {
  return <InvoiceLayout logoSrc={findriveLogo.src} {...props} />;
}
