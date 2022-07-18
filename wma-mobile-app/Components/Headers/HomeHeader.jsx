import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../utils/colors";

function HomeHeader(props) {

  
  return (
    <>
      <View style={styles.header}>
        <View style={styles.avater}>
          <Text style={styles.text} >{props.name.substr(0, 1)}</Text>
        </View>
        <Text style={styles.text}>{props.name}</Text>
        <FontAwesomeIcon style={styles.menubar} icon={faBars} size={30} color="#fff" />  
      </View>
    </>
  );
}

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10
  },
  avater: {
    backgroundColor: colors.light,
    height: 50,
    width: 50,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  },
  text: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  menubar: {
    position: "absolute",
    right: 40
  }
});
