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
    padding: 30,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d3748",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  label: {
    fontSize: 10,
    color: "#4a5568",
  },
  dateBox: {
    border: 1,
    borderColor: "#e2e8f0",
    padding: 4,
    width: 30,
    textAlign: "center",
  },
  infoSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f8fafc",
    borderRadius: 5,
  },
  infoText: {
    fontSize: 10,
    marginBottom: 5,
    color: "#4a5568",
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
    borderBottom: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomColor: "#f0f0f0",
    borderBottom: 1,
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    color: "#a0aec0",
    fontSize: 8,
    borderTop: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 10,
  },
});

const ReciboPDF = ({ range, agendas, odontologo }) => {
  return (
    <Document>
      {agendas.map((agenda) => (
        <Page size="A4" style={styles.page} key={agenda.id}>
          <View style={styles.header}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Image style={styles.logo} src={img} />
              <Text style={styles.title}>CECQ</Text>
            </View>
            <View style={{ textAlign: "center" }}>
              <Text
                style={{ fontSize: 20, marginBottom: 5, textAlign: "center" }}
              >
                Factura
              </Text>
              <View style={styles.dateContainer}>
                <Text style={styles.label}>Fecha:</Text>
                <Text style={styles.dateBox}>
                  {format(range[0].startDate, "dd")}
                </Text>
                <Text style={styles.dateBox}>
                  {format(range[0].startDate, "MM")}
                </Text>
                <Text style={styles.dateBox}>
                  {format(range[0].startDate, "yy")}
                </Text>
                <Text style={{ fontSize: 20 }}> /</Text>
                <Text style={styles.dateBox}>
                  {format(range[0].endDate, "dd")}
                </Text>
                <Text style={styles.dateBox}>
                  {format(range[0].endDate, "MM")}
                </Text>
                <Text style={styles.dateBox}>
                  {format(range[0].endDate, "yy")}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoText}>Agenda: #{agenda.id}</Text>
            <Text style={styles.infoText}>
              Odontólogo: {odontologo?.nombre}
            </Text>
            <Text style={styles.infoText}>Centro: {agenda.centro.nombre}</Text>
            <Text style={styles.infoText}>
              Dirección: {agenda.centro.direccion}
            </Text>
            <Text style={styles.infoText}>
              Teléfono: {agenda.centro.telefono}
            </Text>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCell}>Paciente</Text>
              <Text style={styles.tableCell}>Fecha</Text>
              <Text style={styles.tableCell}>Monto</Text>
            </View>
            {agenda.turnos.map((turno) => (
              <View style={styles.tableRow} key={turno?.id}>
                <Text style={styles.tableCell}>{turno?.paciente}</Text>
                <Text style={styles.tableCell}>{turno?.fecha}</Text>
                <Text style={styles.tableCell}>${turno?.monto}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Total: </Text>
                <Text style={styles.tableCell}></Text>
                <Text style={styles.tableCell}>${agenda.monto}</Text>
              </View>
          </View>

          <Text style={styles.footer}>
            © {new Date().getFullYear()} CECQ - Todos los derechos reservados
          </Text>
        </Page>
      ))}
    </Document>
  );
};

export default ReciboPDF;
