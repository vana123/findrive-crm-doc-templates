"use client";

import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const NOTO_SANS_CYRILLIC_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans@5.0.3/files/noto-sans-cyrillic-400-normal.woff";

Font.register({
  family: "NotoSans",
  src: NOTO_SANS_CYRILLIC_URL,
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "NotoSans",
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 2,
    fontSize: 9,
    color: "#6b7280",
  },
  value: {
    fontSize: 11,
    lineHeight: 1.35,
  },
  twoCol: {
    flexDirection: "row",
    gap: 40,
    marginBottom: 16,
  },
  col: {
    flex: 1,
  },
  tableSection: {
    marginTop: 16,
    marginBottom: 14,
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
    minHeight: 22,
    alignItems: "center",
  },
  tableHeaderRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
    backgroundColor: "#f3f4f6",
    minHeight: 24,
    alignItems: "center",
  },
  cellNum: { width: 28, padding: 4, fontSize: 9, textAlign: "center" },
  cellName: { flex: 2, padding: 4, fontSize: 9 },
  cellQty: { width: 48, padding: 4, fontSize: 9, textAlign: "right" },
  cellPrice: { width: 56, padding: 4, fontSize: 9, textAlign: "right" },
  cellAmount: { width: 64, padding: 4, fontSize: 9, textAlign: "right" },
  cellVat: { width: 40, padding: 4, fontSize: 9, textAlign: "right" },
  headerCell: { fontWeight: "bold", fontSize: 9 },
  totalsRow: {
    flexDirection: "row",
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#374151",
    paddingTop: 8,
    justifyContent: "flex-end",
    gap: 24,
  },
  totalsLabel: { fontSize: 10, fontWeight: "bold" },
  totalsValue: { fontSize: 10 },
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
}: Props) {
  const typeLabel = INVOICE_TYPE_LABELS[type] ?? type;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Рахунок-фактура № {invoice_number}</Text>
        <View style={styles.section}>
          <Text style={styles.label}>Тип</Text>
          <Text style={styles.value}>{typeLabel}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Дата</Text>
          <Text style={styles.value}>{issue_date}</Text>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.label}>Продавець</Text>
            <Text style={styles.value}>{seller.name}</Text>
            <Text style={styles.value}>{seller.address}</Text>
            <Text style={styles.value}>NIP: {seller.nip}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Покупець</Text>
            <Text style={styles.value}>{buyer.name}</Text>
            {buyer.passport ? (
              <Text style={styles.value}>Паспорт: {buyer.passport}</Text>
            ) : null}
            {buyer.pesel ? (
              <Text style={styles.value}>PESEL: {buyer.pesel}</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.tableSection}>
          <Text style={styles.tableTitle}>Позиції рахунку</Text>
          <View style={styles.tableHeaderRow}>
            <View style={[styles.cellNum, styles.headerCell]}>
              <Text>№</Text>
            </View>
            <View style={[styles.cellName, styles.headerCell]}>
              <Text>Назва продукту/послуги</Text>
            </View>
            <View style={[styles.cellQty, styles.headerCell]}>
              <Text>Кількість</Text>
            </View>
            <View style={[styles.cellPrice, styles.headerCell]}>
              <Text>Ціна нетто</Text>
            </View>
            <View style={[styles.cellAmount, styles.headerCell]}>
              <Text>Вартість нетто</Text>
            </View>
            <View style={[styles.cellVat, styles.headerCell]}>
              <Text>ПДВ %</Text>
            </View>
            <View style={[styles.cellAmount, styles.headerCell]}>
              <Text>Сума ПДВ</Text>
            </View>
            <View style={[styles.cellAmount, styles.headerCell]}>
              <Text>Вартість брутто</Text>
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
        </View>

        <View style={styles.totalsRow}>
          <Text style={styles.totalsLabel}>Всього нетто:</Text>
          <Text style={styles.totalsValue}>{total_net}</Text>
        </View>
        <View style={styles.totalsRow}>
          <Text style={styles.totalsLabel}>ПДВ:</Text>
          <Text style={styles.totalsValue}>{total_tax}</Text>
        </View>
        <View style={styles.totalsRow}>
          <Text style={styles.totalsLabel}>Всього брутто:</Text>
          <Text style={styles.totalsValue}>{total_gross}</Text>
        </View>
      </Page>
    </Document>
  );
}
