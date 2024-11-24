import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import img from "../../../assets/CECQIcon.png";
import { format, parseISO } from "date-fns";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  section: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  leftContent: {
    flexGrow: 1,
  },
  rightContent: {
    width: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 5,
  },
  address: {
    fontSize: 10,
    color: "#333333",
    marginBottom: 3,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  turnText: {
    fontSize: 8,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#000000",
    borderTopStyle: "solid",
    paddingTop: 10,
    paddingBottom: 10,
  },
  footerText: {
    fontSize: 10,
  },
});

const RecordatorioTurnoPDF = ({ centro, turno, odontologo }) => {
  const formattedDate = format(parseISO(turno.fecha), "dd/MM/yyyy");
  const formattedTime = format(parseISO(`1970-01-01T${turno.horaInicio}`), "hh:mm a");

return ( <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.header}>
          <View style={styles.leftContent}>
            <Text style={styles.title}>
              Centro de Empleados de Comercio de Quilmes
            </Text>
            <Text style={styles.subtitle}>
              {centro.nombre}, {centro.direccion}
            </Text>
            <Text style={styles.subtitle}>
              Doctor/a {odontologo.nombre} {odontologo.apellido}
            </Text>
            <Text style={styles.address}>
              {turno.paciente?.nombre} {turno.paciente?.apellido}
            </Text>
            <Text style={styles.address}>{formattedDate} {formattedTime}</Text>
          </View>
          <View style={styles.rightContent}>
            <Image style={styles.logo} src={img} />
            <Text style={styles.turnText}>TURNO ODONTOLÓGICO</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>TRAER CARNET DE SINDICATO Y OSECAC - CONSTANCIA DE TURNO</Text>
        </View>
      </View>
    </Page>
  </Document> );
};

export default RecordatorioTurnoPDF;
