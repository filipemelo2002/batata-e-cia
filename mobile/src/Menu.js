import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import { Dimensions } from "react-native";
import logo from "./assets/logo.png";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
const screenWidth = Math.round(Dimensions.get("window").width);

import api from "./services/api";
export default function Menu() {
  const WHATSAPP = "+5581983007910";
  const [itens, setItens] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const display = useMemo(() => (total === 0 ? "none" : "flex"), [total]);
  function addToOrder(item) {
    setOrder([...order, item]);
  }
  function removeFromOrder(item) {
    const filtered = order.filter((ordered) => ordered._id !== item._id);
    const removedItem = order.filter((ordered) => ordered._id === item._id);
    if (removedItem.length > 0) {
      removedItem.pop();
      const newArray = filtered ? filtered.concat(removedItem) : removedItem;
      setOrder(newArray);
    }
  }
  function findAndCollapse(array, order) {
    const found = array.find((item) => item._id === order._id);
    if (found) {
      array.find((item) => item._id === order._id).qtd = found.qtd + 1;
    } else {
      const { _id, title, price, ...rest } = order;
      array.push({ _id, title, qtd: 1, price });
    }
  }

  function recieveOrder() {
    const line = "===========================\n";
    const pedidos = [];
    order.forEach((item) => {
      findAndCollapse(pedidos, item);
    });

    let body = pedidos.reduce((current, next) => {
      return (current +=
        line +
        `_${next.title}_   \n *preço:* ${formatPrice(
          next.price
        )}  \n *quantidade:* ${next.qtd} \n`);
    }, "");

    let finalPrice = line + "*VALOR FINAL:* " + formatPrice(total);
    body += finalPrice;
    Linking.openURL(`whatsapp://send?phone=${WHATSAPP}&text=${body}`);

    setOrder([]);
    setTotal(0);
  }
  function formatPrice(value) {
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }
  useEffect(() => {
    async function getCardapio() {
      try {
        const response = await api.get("menu/item");
        setItens(response.data);
      } catch (err) {
        Alert.alert("Erro ao buscar informações");
      }
    }

    getCardapio();
  }, []);

  useEffect(() => {
    function handlerOrder() {
      const sum = order.reduce((values, { price }) => values + price, 0);
      setTotal(sum);
    }
    handlerOrder();
  }, [order]);
  let [fontsLoaded] = useFonts({
    Rubik: require("./assets/Rubik-Regular.ttf"),
    "Rubik-Bold": require("./assets/Rubik-Bold.ttf"),
  });

  if (!fontsLoaded) {
    console.log("Loading");
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.headerLogo} />
          <Text style={[styles.headerTitle, { fontFamily: "Rubik-Bold" }]}>
            Batata & Cia
          </Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={itens}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <View style={styles.listItem}>
                  <Image
                    style={styles.listImg}
                    source={{
                      uri: item.img_url,
                    }}
                  />
                  <View style={styles.listContent}>
                    <Text
                      style={[styles.listTitle, { fontFamily: "Rubik-Bold" }]}
                    >
                      {item.title}
                    </Text>
                    <Text>{item.description}</Text>
                    <View style={styles.bottomInfo}>
                      <View style={styles.amountButtons}>
                        <TouchableOpacity
                          style={{ padding: 7 }}
                          onPress={() => removeFromOrder(item)}
                        >
                          <Feather name="minus" size={25} color="#3d3d3d" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, marginHorizontal: 7 }}>
                          {order.filter((i) => i._id === item._id).length
                            ? order.filter((i) => i._id === item._id).length
                            : 0}
                        </Text>
                        <TouchableOpacity
                          style={{ padding: 7 }}
                          onPress={() => addToOrder(item)}
                        >
                          <Feather name="plus" size={25} color="#3d3d3d" />
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.listPrice}>
                        {formatPrice(item.price)}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <TouchableOpacity
            style={[styles.orderButton, { display }]}
            onPress={() => recieveOrder()}
          >
            <FontAwesome name="whatsapp" size={50} color="#fff" />

            <Text style={styles.orderButtonText}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(total)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#ffecc7",
    flexDirection: "column",
  },
  header: {
    width: screenWidth,
    top: 0,
    paddingTop: Constants.statusBarHeight + 10,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },
  headerLogo: {
    height: 70,
    width: 70,
  },
  headerTitle: {
    fontSize: 25,
    marginLeft: 7,
    color: "#321d06",
  },
  listContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    margin: 15,
    maxHeight: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  listContent: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  listImg: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: screenWidth - 29,
    height: 200,
    resizeMode: "cover",
  },
  listTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    color: "#3d3d3d",
  },
  bottomInfo: {
    paddingTop: 20,
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  amountButtons: {
    borderColor: "#cecece",
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  listPrice: {
    fontSize: 20,
    color: "#32cd32",
    fontWeight: "bold",
  },
  orderButton: {
    padding: 7,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#32cd32",
    alignSelf: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  orderButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
  },
});
