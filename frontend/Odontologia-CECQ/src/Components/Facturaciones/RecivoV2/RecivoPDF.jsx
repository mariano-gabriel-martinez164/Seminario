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

const DentalAppointment = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.header}>
          <View style={styles.leftContent}>
            <Text style={styles.title}>
              Centro de Empleados de Comercio de Quilmes
            </Text>
            <Text style={styles.subtitle}>
              Delegaciones Fcio. Varela - Berazategui - Solano
            </Text>
            <Text style={styles.address}>
              San Martín 515 - Quilmes (1878) - Tel./Fax: 4257-7310/11 /
              2055-5508/09/11/12
            </Text>
            <Text style={styles.address}>
              Calle 11 N° 4832 (1884) Berazategui - Tel.: 4256-4856
            </Text>
            <Text style={styles.address}>
              Alte. Brown N° 41 - Fcio. Varela - Tel.: 4255-5657
            </Text>
            <Text style={styles.address}>
              Calle 843 N° 2445 - S. F. Solano - Tel.: 2081-2136
            </Text>
          </View>
          <View style={styles.rightContent}>
            <Image style={styles.logo} src={img} />
            <Text style={styles.turnText}>TURNO ODONTOLÓGICO</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            TRAER CARNET DE SINDICATO Y OSECAC - RECIBO DE SUELDO
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default DentalAppointment;
