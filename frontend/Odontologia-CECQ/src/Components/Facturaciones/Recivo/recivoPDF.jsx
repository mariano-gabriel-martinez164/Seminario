import img from "../../../assets/CECQIcon.png";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import React, { useEffect } from "react";
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
  },
  value: {
    fontSize: 12,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 10,
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
});

const RecivoPDF = ({ range, agendas, odontologo }) => {
  return (
    <Document>
      {agendas.map((agenda) => (
        <Page size="A6" style={styles.page}>
          <View style={styles.section}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Image src={img} style={{ width: 50, height: 50 }} />
              <Text style={styles.header}>CECQ</Text>
            </View>
            <Text style={styles.subHeader}>Recivo</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Odontologo: </Text>
              <Text style={styles.value}>{odontologo?.nombre}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Fecha: </Text>
              <Text style={styles.value}>
                {format(range[0].startDate, "MMM-dd") +
                  " / " +
                  format(range[0].endDate, "MMM-dd")}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.label}>Centro: </Text>
              <Text style={styles.value}>{agenda.centro.nombre}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Direccion: </Text>
              <Text style={styles.value}>{agenda.centro.direccion}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Agenda: </Text>
              <Text style={styles.value}>#{agenda.id}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Monto: </Text>
              <Text style={styles.value}>${agenda.monto}</Text>
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default RecivoPDF;
