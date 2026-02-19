"use client";

import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Cyrillic-capable font (Helvetica has no Cyrillic glyphs)
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
    marginBottom: 14,
  },
  label: {
    marginBottom: 2,
    fontSize: 10,
  },
  value: {
    fontSize: 11,
    lineHeight: 1.35,
  },
  tableSection: {
    marginTop: 18,
    marginBottom: 14,
  },
  tableTitle: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    minHeight: 20,
  },
  tableHeaderRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
    backgroundColor: "#f3f4f6",
    minHeight: 22,
  },
  tableCell: {
    padding: 4,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 9,
    flex: 1,
    justifyContent: "center",
  },
  tableCellNum: {
    padding: 4,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 9,
    width: 28,
    justifyContent: "center",
  },
  tableCellAmount: {
    padding: 4,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 9,
    width: 72,
    textAlign: "right",
    justifyContent: "center",
  },
  tableHeaderCell: {
    padding: 4,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 9,
    fontWeight: "bold",
    flex: 1,
    justifyContent: "center",
  },
  tableHeaderCellNum: {
    padding: 4,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 9,
    fontWeight: "bold",
    width: 28,
    justifyContent: "center",
  },
  tableHeaderCellAmount: {
    padding: 4,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 9,
    fontWeight: "bold",
    width: 72,
    textAlign: "right",
    justifyContent: "center",
  },
});

type Props = import("./types").ContractDealTemplateProps;
type ContractPayment = import("./types").ContractPayment;

function formatScheduleDate(iso: string): string {
  return new Date(iso).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatScheduleAmount(amount: string): string {
  const n = parseFloat(amount);
  if (Number.isNaN(n)) return amount;
  return new Intl.NumberFormat("uk-UA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function sortPayments(payments: ContractPayment[]): ContractPayment[] {
  return [...payments].sort((a, b) => {
    const ad = a.due_date ? new Date(a.due_date).getTime() : Number.POSITIVE_INFINITY;
    const bd = b.due_date ? new Date(b.due_date).getTime() : Number.POSITIVE_INFINITY;
    if (Number.isNaN(ad) && Number.isNaN(bd)) return 0;
    if (Number.isNaN(ad)) return 1;
    if (Number.isNaN(bd)) return -1;
    return ad < bd ? -1 : ad > bd ? 1 : 0;
  });
}

export function ContractDealTemplate({
  contractNumber,
  clientName,
  clientPhone,
  clientEmail,
  vehicleDescription,
  vehicleYear,
  carNumber,
  contractDate,
  payments = [],
}: Props) {
  const date = contractDate ?? new Date().toLocaleDateString("uk-UA");
  const sortedPayments = sortPayments(payments);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Договір лізингу № {contractNumber}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Дата:</Text>
          <Text style={styles.value}>{date}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Клієнт (ПІБ):</Text>
          <Text style={styles.value}>{clientName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Телефон:</Text>
          <Text style={styles.value}>{clientPhone}</Text>
        </View>

        {clientEmail ? (
          <View style={styles.section}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{clientEmail}</Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.label}>Об'єкт лізингу (ТЗ):</Text>
          <Text style={styles.value}>
            {vehicleDescription}, рік випуску {vehicleYear}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Держ. номер:</Text>
          <Text style={styles.value}>{carNumber}</Text>
        </View>

        {sortedPayments.length > 0 ? (
          <View style={styles.tableSection}>
            <Text style={styles.tableTitle}>Графік платежів</Text>
            <View style={styles.tableHeaderRow}>
              <View style={styles.tableHeaderCellNum}>
                <Text>№</Text>
              </View>
              <View style={styles.tableHeaderCell}>
                <Text>Дата платежу</Text>
              </View>
              <View style={styles.tableHeaderCellAmount}>
                <Text>Сума</Text>
              </View>
            </View>
            {sortedPayments.map((p, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCellNum}>
                  <Text>{index + 1}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{formatScheduleDate(p.due_date)}</Text>
                </View>
                <View style={styles.tableCellAmount}>
                  <Text>{formatScheduleAmount(p.amount)}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
