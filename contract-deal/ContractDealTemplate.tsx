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
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontSize: 10,
  },
  value: {
    fontSize: 11,
  },
});

type Props = import("./types").ContractDealTemplateProps;

export function ContractDealTemplate({
  contractNumber,
  clientName,
  clientPhone,
  clientEmail,
  vehicleDescription,
  vehicleYear,
  carNumber,
  contractDate,
}: Props) {
  const date = contractDate ?? new Date().toLocaleDateString("uk-UA");

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
      </Page>
    </Document>
  );
}
