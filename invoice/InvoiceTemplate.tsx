"use client";

import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

import findriveLogo from "../img/findrivelogo.jpg";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  logo: {
    height: 48,
    objectFit: "contain",
  },
  title: {
    fontSize: 16,
    marginBottom: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 12,
    fontSize: 10,
  },
  metaItem: {},
  metaLabel: { fontSize: 9, color: "#6b7280", marginBottom: 1 },
  metaValue: {},
  twoCol: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 14,
  },
  col: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fafafa",
  },
  colLabel: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 6,
  },
  value: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  tableSection: {
    marginTop: 12,
    marginBottom: 12,
  },
  tableTitle: {
    fontSize: 11,
    marginBottom: 6,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    minHeight: 20,
    alignItems: "center",
  },
  tableHeaderRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
    backgroundColor: "#f3f4f6",
    minHeight: 22,
    alignItems: "center",
  },
  cellNum: { width: 24, padding: 4, fontSize: 8, textAlign: "center" },
  cellName: { flex: 2, padding: 4, fontSize: 8, minWidth: 80 },
  cellQty: { width: 36, padding: 4, fontSize: 8, textAlign: "right" },
  cellPrice: { width: 48, padding: 4, fontSize: 8, textAlign: "right" },
  cellAmount: { width: 52, padding: 4, fontSize: 8, textAlign: "right" },
  cellVat: { width: 32, padding: 4, fontSize: 8, textAlign: "right" },
  headerCell: { fontWeight: "bold", fontSize: 8 },
  razemRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
    minHeight: 22,
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  razemLabel: {
    flex: 2,
    padding: 4,
    fontSize: 9,
    fontWeight: "bold",
  },
  totalsBox: {
    marginTop: 8,
    alignSelf: "flex-end",
    borderWidth: 1,
    borderColor: "#374151",
    padding: 8,
    minWidth: 160,
  },
  totalsBoxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    fontSize: 9,
  },
  totalsBoxLabel: { fontWeight: "bold" },
  paymentBlock: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    fontSize: 10,
  },
  paymentRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  paymentLabel: { width: 120 },
  paymentValue: { flex: 1, fontWeight: "bold" },
  issuerBlock: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  issuerLabel: { fontSize: 9, color: "#6b7280", marginBottom: 2 },
  issuerName: { fontSize: 11, fontWeight: "bold" },
});

const INVOICE_TYPE_LABELS: Record<string, string> = {
  advance: "Аванс",
  deposit: "Залічка",
  rental: "Орендна",
};

type Props = import("./types").InvoiceTemplateProps;

export function InvoiceTemplate({
  invoice_number,
  issue_date,
  type,
  seller,
  buyer,
  line_items,
  total_net,
  total_tax,
  total_gross,
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
  const typeLabel = INVOICE_TYPE_LABELS[type] ?? type;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src={findriveLogo.src} />
        </View>
        <Text style={styles.title}>Rachunek-faktura nr {invoice_number}</Text>
        <Text style={{ fontSize: 10, marginBottom: 10, textAlign: "center" }}>
          {typeLabel}
        </Text>

        {(issue_date || sale_date || issue_place) ? (
          <View style={styles.metaRow}>
            {issue_date ? (
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Data wydania</Text>
                <Text style={styles.metaValue}>{issue_date}</Text>
              </View>
            ) : null}
            {sale_date ? (
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Data sprzedaży</Text>
                <Text style={styles.metaValue}>{sale_date}</Text>
              </View>
            ) : null}
            {issue_place ? (
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Miejsce wydania</Text>
                <Text style={styles.metaValue}>{issue_place}</Text>
              </View>
            ) : null}
          </View>
        ) : null}

        {contract_number && contract_date ? (
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 10 }}>
              Dotyczy umowy leasingu nr {contract_number} z dnia {contract_date}
            </Text>
          </View>
        ) : null}

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.colLabel}>Sprzedawca:</Text>
            <Text style={styles.value}>{seller.name}</Text>
            <Text style={styles.value}>{seller.address}</Text>
            <Text style={styles.value}>NIP {seller.nip}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.colLabel}>Nabywca:</Text>
            <Text style={styles.value}>{buyer.name}</Text>
            {buyer.passport ? (
              <Text style={styles.value}>{buyer.passport}</Text>
            ) : null}
            {buyer.pesel ? (
              <Text style={styles.value}>PESEL: {buyer.pesel}</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.tableSection}>
          <View style={styles.tableHeaderRow}>
            <View style={[styles.cellNum, styles.headerCell]}>
              <Text>LP</Text>
            </View>
            <View style={[styles.cellName, styles.headerCell]}>
              <Text>Nazwa towaru / usługi</Text>
            </View>
            <View style={[styles.cellQty, styles.headerCell]}>
              <Text>Ilość</Text>
            </View>
            <View style={[styles.cellPrice, styles.headerCell]}>
              <Text>Cena netto</Text>
            </View>
            <View style={[styles.cellAmount, styles.headerCell]}>
              <Text>Wartość netto</Text>
            </View>
            <View style={[styles.cellVat, styles.headerCell]}>
              <Text>VAT %</Text>
            </View>
            <View style={[styles.cellAmount, styles.headerCell]}>
              <Text>Kwota podatku</Text>
            </View>
            <View style={[styles.cellAmount, styles.headerCell]}>
              <Text>Wartość brutto</Text>
            </View>
          </View>
          {line_items.map((row, idx) => (
            <View key={idx} style={styles.tableRow}>
              <View style={styles.cellNum}>
                <Text>{row.row_number}</Text>
              </View>
              <View style={styles.cellName}>
                <Text>{row.product_name}</Text>
              </View>
              <View style={styles.cellQty}>
                <Text>{row.quantity}</Text>
              </View>
              <View style={styles.cellPrice}>
                <Text>{row.net_price}</Text>
              </View>
              <View style={styles.cellAmount}>
                <Text>{row.net_value}</Text>
              </View>
              <View style={styles.cellVat}>
                <Text>{row.vat_percent}</Text>
              </View>
              <View style={styles.cellAmount}>
                <Text>{row.tax_amount}</Text>
              </View>
              <View style={styles.cellAmount}>
                <Text>{row.gross_value}</Text>
              </View>
            </View>
          ))}
          <View style={styles.razemRow}>
            <View style={styles.razemLabel}>
              <Text>Razem</Text>
            </View>
            <View style={styles.cellQty} />
            <View style={styles.cellPrice} />
            <View style={styles.cellAmount}>
              <Text>{total_net}</Text>
            </View>
            <View style={styles.cellVat}>
              <Text>X</Text>
            </View>
            <View style={styles.cellAmount}>
              <Text>{total_tax}</Text>
            </View>
            <View style={styles.cellAmount}>
              <Text>{total_gross}</Text>
            </View>
          </View>
        </View>

        <View style={styles.totalsBox}>
          <View style={styles.totalsBoxRow}>
            <Text style={styles.totalsBoxLabel}>Wartość netto</Text>
            <Text>{total_net}</Text>
          </View>
          <View style={styles.totalsBoxRow}>
            <Text style={styles.totalsBoxLabel}>Wartość VAT</Text>
            <Text>{total_tax}</Text>
          </View>
          <View style={styles.totalsBoxRow}>
            <Text style={styles.totalsBoxLabel}>Wartość brutto</Text>
            <Text>{total_gross}</Text>
          </View>
        </View>

        <View style={styles.paymentBlock}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Do zapłaty:</Text>
            <Text style={styles.paymentValue}>{total_gross} PLN</Text>
          </View>
          {amount_in_words ? (
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Słownie:</Text>
              <Text style={styles.paymentValue}>{amount_in_words}</Text>
            </View>
          ) : null}
          {payment_deadline ? (
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Termin płatności:</Text>
              <Text style={styles.paymentValue}>{payment_deadline}</Text>
            </View>
          ) : null}
          {payment_method ? (
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Płatność:</Text>
              <Text style={styles.paymentValue}>{payment_method}</Text>
            </View>
          ) : null}
          {bank_name ? (
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Bank:</Text>
              <Text style={styles.paymentValue}>{bank_name}</Text>
            </View>
          ) : null}
          {bank_account ? (
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Konto:</Text>
              <Text style={styles.paymentValue}>{bank_account}</Text>
            </View>
          ) : null}
        </View>

        {issuer_name ? (
          <View style={styles.issuerBlock}>
            <Text style={styles.issuerLabel}>Imię i nazwisko wystawcy</Text>
            <Text style={styles.issuerName}>{issuer_name}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
