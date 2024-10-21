import img from "../../../assets/CECQIcon.png";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

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
    marginBottom: 20,
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

const RecivoPDF = ({ origin, destination, reference, amount, dateTime }) => {
  return (
    <Document>
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
          <Text style={styles.subHeader}>Comprobante de Venta</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Origen:</Text>
            <Text style={styles.value}>{origin}</Text>
          </View>

          <View style={{ alignItems: "center", margin: 10 }}></View>

          <View style={styles.row}>
            <Text style={styles.label}>Destino:</Text>
            <Text style={styles.value}>{destination}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Tratamiento:</Text>
            <Text style={styles.value}>{reference}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Monto:</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.value}>{amount}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Fecha:</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.value}>{dateTime}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default RecivoPDF;
