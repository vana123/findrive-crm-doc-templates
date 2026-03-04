import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import type { InvoiceTemplateProps } from "./types";

const FONT = "TimesNewRoman";
const BORDER = "#000";
const THIN = 0.75;

const s = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 36,
    paddingHorizontal: 44,
    fontSize: 10,
    fontFamily: FONT,
    color: "#000",
  },

  /* ── Header ── */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  logo: { width: 100, objectFit: "contain" },
  headerRight: { alignItems: "flex-start", marginLeft: "auto" },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  metaLine: { fontSize: 9, marginBottom: 1 },

  /* ── Parties ── */
  partyRow: { flexDirection: "row", gap: 24, marginBottom: 18, alignItems: "stretch" },
  partyCol: { flex: 1, flexDirection: "column" },
  partyLabel: {
    fontSize: 10,
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: 4,
  },
  partyBox: {
    borderWidth: THIN,
    borderColor: BORDER,
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexGrow: 1,
  },
  partyName: { fontSize: 11, fontWeight: "bold", marginBottom: 2 },
  partyLine: { fontSize: 11, lineHeight: 1.4 },

  /* ── Table ── */
  table: { marginBottom: 4 },
  row: { flexDirection: "row" },
  /* header cell */
  hCell: {
    borderWidth: THIN,
    borderColor: BORDER,
    paddingHorizontal: 4,
    paddingVertical: 4,
    fontSize: 8,
    fontWeight: "bold",
    justifyContent: "center",
  },
  /* data cell */
  dCell: {
    borderBottomWidth: THIN,
    borderBottomColor: BORDER,
    borderRightWidth: THIN,
    borderRightColor: BORDER,
    paddingHorizontal: 4,
    paddingVertical: 4,
    fontSize: 8,
    justifyContent: "center",
  },
  dCellFirst: {
    borderLeftWidth: THIN,
    borderLeftColor: BORDER,
  },
  /* column widths */
  wLP: { width: 22, textAlign: "center" },
  wName: { flex: 1, minWidth: 130, textAlign: "left" },
  wQty: { width: 36, textAlign: "center" },
  wNetP: { width: 58, textAlign: "right" },
  wNetV: { width: 58, textAlign: "right" },
  wVat: { width: 34, textAlign: "center" },
  wTax: { width: 62, textAlign: "right" },
  wGross: { width: 64, textAlign: "right" },

  /* Razem row — borderless left cells */
  razemBlankCell: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    fontSize: 8,
  },
  razemLabelCell: {
    borderBottomWidth: THIN,
    borderBottomColor: BORDER,
    borderRightWidth: THIN,
    borderRightColor: BORDER,
    borderLeftWidth: THIN,
    borderLeftColor: BORDER,
    paddingHorizontal: 4,
    paddingVertical: 4,
    fontSize: 8,
    fontWeight: "bold",
    textAlign: "right",
  },

  /* ── Totals box ── */
  totalsWrap: { alignItems: "flex-end", marginTop: 2, marginBottom: 8 },
  totalsBox: { borderWidth: THIN, borderColor: BORDER, width: 190 },
  tRow: {
    flexDirection: "row",
    borderBottomWidth: THIN,
    borderBottomColor: BORDER,
  },
  tRowLast: { flexDirection: "row" },
  tLabel: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 9,
    fontWeight: "bold",
    borderRightWidth: THIN,
    borderRightColor: BORDER,
  },
  tVal: {
    width: 72,
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 9,
    textAlign: "right",
  },

  /* ── Payment block ── */
  payBlock: { marginTop: 18, fontSize: 10 },
  pRow: { flexDirection: "row", marginBottom: 2 },
  pLabel: { width: 140 },
  pBold: { fontWeight: "bold" },
  pValue: { flex: 1, fontWeight: "bold" },

  /* ── Issuer ── */
  issuer: { marginTop: 18 },
  issuerLabel: { fontSize: 9, marginBottom: 2 },
  issuerName: { fontSize: 10 },
});

type Props = InvoiceTemplateProps & { logoSrc: string };

export function InvoiceLayout({
  logoSrc,
  invoice_number,
  issue_date,
  type,
  seller,
  buyer,
  line_items,
  total_net,
  total_tax,
  total_gross,
  total_gross_display,
  issue_place,
  sale_date,
  contract_number,
  contract_date,
  payment_deadline,
  amount_in_words,
  payment_method,
  bank_name,
  bank_account,
  issuer_name,
}: Props) {
  const doZaplaty = total_gross_display ?? total_gross;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* ── Header ── */}
        <View style={s.headerRow}>
          <Image style={s.logo} src={logoSrc} />
          <View style={s.headerRight}>
            <Text style={s.title}>Faktura numer {invoice_number}</Text>
            <Text style={{ fontSize: 9, marginBottom: 9 }}>{" "}</Text>
            {issue_place ? (
              <Text style={s.metaLine}>
                Miejsce wystawienia: {issue_place}
              </Text>
            ) : null}
            <Text style={s.metaLine}>
              Data wystawienia: {issue_date || "—"}
            </Text>
            {sale_date ? (
              <Text style={s.metaLine}>
                Data sprzedaży:  {sale_date}
              </Text>
            ) : null}
          </View>
        </View>

        {/* ── Seller / Buyer ── */}
        <View style={s.partyRow}>
          <View style={s.partyCol}>
            <Text style={s.partyLabel}>Sprzedawca:</Text>
            <View style={s.partyBox}>
              <Text style={s.partyName}>{seller.name}</Text>
              <Text style={s.partyLine}>{seller.address}</Text>
              <Text style={s.partyLine}>NIP {seller.nip}</Text>
            </View>
          </View>
          <View style={s.partyCol}>
            <Text style={s.partyLabel}>Nabywca:</Text>
            <View style={s.partyBox}>
              <Text style={s.partyName}>{buyer.name.toUpperCase()}</Text>
              {buyer.buyer_type === "jdg" || buyer.buyer_type === "company" ? (
                <>
                  {buyer.nip ? (
                    <Text style={s.partyLine}>NIP: {buyer.nip}</Text>
                  ) : null}
                </>
              ) : (
                <>
                  {buyer.passport ? (
                    <Text style={s.partyLine}>{buyer.passport}</Text>
                  ) : null}
                  {buyer.passport_issue_date ? (
                    <Text style={s.partyLine}>Data wydania: {buyer.passport_issue_date}</Text>
                  ) : null}
                  {buyer.pesel ? (
                    <Text style={s.partyLine}>PESEL: {buyer.pesel}</Text>
                  ) : null}
                </>
              )}
              {buyer.address ? (
                <Text style={s.partyLine}>{buyer.address}</Text>
              ) : null}
              {buyer.postal_code ? (
                <Text style={s.partyLine}>{buyer.postal_code}</Text>
              ) : null}
              {buyer.phone ? (
                <Text style={s.partyLine}>{buyer.phone}</Text>
              ) : null}
              {buyer.email ? (
                <Text style={s.partyLine}>{buyer.email}</Text>
              ) : null}
            </View>
          </View>
        </View>

        {/* ── Table ── */}
        <View style={s.table}>
          {/* Header */}
          <View style={s.row}>
            <View style={[s.hCell, s.wLP]}><Text>LP</Text></View>
            <View style={[s.hCell, s.wName]}><Text>Nazwa towaru / usługi</Text></View>
            <View style={[s.hCell, s.wQty]}><Text>Ilość</Text></View>
            <View style={[s.hCell, s.wNetP]}><Text>{"Cena\nnetto"}</Text></View>
            <View style={[s.hCell, s.wNetV]}><Text>{"Wartość\nnetto"}</Text></View>
            <View style={[s.hCell, s.wVat]}><Text>{"VAT\n%"}</Text></View>
            <View style={[s.hCell, s.wTax]}><Text>{"Kwota\npodatku"}</Text></View>
            <View style={[s.hCell, s.wGross]}><Text>{"Wartość\nbrutto"}</Text></View>
          </View>

          {/* Data rows */}
          {line_items.map((r, i) => (
            <View key={i} style={s.row}>
              <View style={[s.dCell, s.dCellFirst, s.wLP]}><Text>{r.row_number}</Text></View>
              <View style={[s.dCell, s.wName]}><Text>{r.product_name}</Text></View>
              <View style={[s.dCell, s.wQty]}><Text>{r.quantity} szt</Text></View>
              <View style={[s.dCell, s.wNetP]}><Text>{r.net_price}</Text></View>
              <View style={[s.dCell, s.wNetV]}><Text>{r.net_value}</Text></View>
              <View style={[s.dCell, s.wVat]}><Text>{r.vat_percent}</Text></View>
              <View style={[s.dCell, s.wTax]}><Text>{r.tax_amount}</Text></View>
              <View style={[s.dCell, s.wGross]}><Text>{r.gross_value}</Text></View>
            </View>
          ))}

          {/* Razem — "Razem" in Cena netto column; LP/Name/Qty borderless */}
          <View style={s.row}>
            <View style={[s.razemBlankCell, { width: 22 }]} />
            <View style={[s.razemBlankCell, { flex: 1, minWidth: 130 }]} />
            <View style={[s.razemBlankCell, { width: 36 }]} />
            <View style={[s.razemLabelCell, s.wNetP]}>
              <Text>Razem</Text>
            </View>
            <View style={[s.dCell, s.wNetV]}>
              <Text style={s.pBold}>{total_net}</Text>
            </View>
            <View style={[s.dCell, s.wVat]}><Text>X</Text></View>
            <View style={[s.dCell, s.wTax]}>
              <Text style={s.pBold}>{total_tax}</Text>
            </View>
            <View style={[s.dCell, s.wGross]}>
              <Text style={s.pBold}>{total_gross}</Text>
            </View>
          </View>
        </View>

        {/* ── Totals box ── */}
        <View style={s.totalsWrap}>
          <View style={s.totalsBox}>
            <View style={s.tRow}>
              <Text style={s.tLabel}>Wartość netto</Text>
              <Text style={s.tVal}>{total_net}</Text>
            </View>
            <View style={s.tRow}>
              <Text style={s.tLabel}>Wartość VAT</Text>
              <Text style={s.tVal}>{total_tax}</Text>
            </View>
            <View style={s.tRowLast}>
              <Text style={s.tLabel}>Wartość brutto</Text>
              <Text style={s.tVal}>{total_gross}</Text>
            </View>
          </View>
        </View>

        {/* ── Payment block ── */}
        <View style={s.payBlock}>
          <View style={s.pRow}>
            <Text style={s.pLabel}>Do zapłaty:</Text>
            <Text style={s.pValue}>{doZaplaty} PLN</Text>
          </View>
          {amount_in_words ? (
            <View style={s.pRow}>
              <Text style={[s.pLabel, s.pBold]}>Słownie:</Text>
              <Text style={{ flex: 1 }}>{amount_in_words}</Text>
            </View>
          ) : null}
          {payment_deadline ? (
            <View style={[s.pRow, { marginTop: 4 }]}>
              <Text style={[s.pLabel, s.pBold]}>Termin płatności:</Text>
              <Text style={{ flex: 1 }}>{payment_deadline}</Text>
            </View>
          ) : null}
          {payment_method ? (
            <View style={s.pRow}>
              <Text style={[s.pLabel, s.pBold]}>Płatność:</Text>
              <Text style={{ flex: 1 }}>{payment_method}</Text>
            </View>
          ) : null}
          {bank_name ? (
            <View style={s.pRow}>
              <Text style={[s.pLabel, s.pBold]}>Bank:</Text>
              <Text style={{ flex: 1 }}>{bank_name}</Text>
            </View>
          ) : null}
          {bank_account ? (
            <View style={s.pRow}>
              <Text style={[s.pLabel, s.pBold]}>Konto:</Text>
              <Text style={{ flex: 1 }}>{bank_account}</Text>
            </View>
          ) : null}
        </View>

        {/* ── Issuer ── */}
        {issuer_name ? (
          <View style={s.issuer}>
            <Text style={s.issuerLabel}>Imię i nazwisko wystawcy</Text>
            <Text style={s.issuerName}>{issuer_name}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
