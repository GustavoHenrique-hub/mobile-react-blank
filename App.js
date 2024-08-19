import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import axios from "axios";

export default function App() {
  //ADD NEW PROD
  const [prodName, setProdName] = useState("");
  const [prodQuant, setProdQuant] = useState();
  const [prodPrice, setProdPrice] = useState();

  //UPDATE A PROD
  const [updateProdId, setUpdateProdId] = useState();
  const [updateProdName, setUpdateProdName] = useState("");
  const [updateProdQuant, setUpdateProdQuant] = useState();
  const [updateProdPrice, setUpdateProdPrice] = useState();

  //ARRAYS TO READ ALL DATA
  const [stateArray, setStateArray] = useState([]);
  const tempArray = [];

  const handleDeleteProduct = (id) => {
    const deleteReqUrl = `http://192.168.200.31:8080/product/delete/${id}`;

    axios
      .delete(deleteReqUrl)
      .then((resp) => {
        console.log(resp.data);
        Alert.alert("AVISO", "PRODUTO DELETADO COM SUCESSO!!", [
          {
            text: "Entendido",
          },
        ]);
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert("ERRO!", "PRODUTO NÃO DELETADO!!", [
          {
            text: "Entendido",
          },
        ]);
      });
  };

  const handleUpdateProduct = () => {
    const updateReqUrl = `http://192.168.200.31:8080/product/update/${updateProdId}`;

    axios
      .put(
        updateReqUrl,
        {
          name: updateProdName,
          quantity: updateProdQuant,
          price: updateProdPrice,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        Alert.alert("AVISO", "PRODUTO ATUALIZADO COM SUCESSO!!", [
          {
            text: "Entendido",
            onPress: () => {
              setUpdateProdId("");
              setUpdateProdName("");
              setUpdateProdQuant("");
              setUpdateProdPrice("");
            },
          },
        ]);
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert("ERRO!", "PRODUTO NÃO ATUALIZADO!!", [
          {
            text: "Entendido",
            onPress: () => console.log("alert closed"),
          },
        ]);
      });
  };

  const handleAddProduct = () => {
    const insertReqUrl = `http://192.168.200.31:8080/product/insert`;

    axios
      .post(
        insertReqUrl,
        {
          name: prodName,
          quantity: prodQuant,
          price: prodPrice,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        respInsertMessage = resp.data.message;
        Alert.alert("AVISO", "PRODUTO INSERIDO COM SUCESSO!!", [
          {
            text: "Entendido",
            onPress: () => {
              setProdName("");
              setProdQuant("");
              setProdPrice("");
            },
          },
        ]);
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert("ERRO!", "PRODUTO NÃO INSERIDO", [
          {
            text: "Entendido",
            onPress: () => console.log("alert closed"),
          },
        ]);
      });
  };

  const findAll = () => {
    const findAllReqUrl = `http://192.168.200.31:8080/product/findAll`;

    axios
      .get(findAllReqUrl, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((data) => {
        data.data.map((d, index) => {
          console.log(data.data[index]);
          tempArray.push({
            id: data.data[index].id,
            name: data.data[index].name,
            quantity: data.data[index].quantity,
            price: data.data[index].price,
          });
        });

        setStateArray(tempArray);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Button
          onPress={findAll}
          title="List All"
          accessibilityLabel="CLICK ME"
        />
        {/* AQUI */}
        <FlatList
          style={styles.flatListContainer}
          data={stateArray}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.flatListItem}>
              <Text style={styles.text}>{`ID: ${item.id}`}</Text>
              <Text style={styles.text}>{`Name: ${item.name}`}</Text>
              <Text style={styles.text}>{`Quantity: ${item.quantity}`}</Text>
              <Text style={styles.text}>{`Price: R$ ${item.price}`}</Text>
              <Button
                title="Deletar"
                onPress={() => handleDeleteProduct(item.id)} // Passa o id do item a ser deletado
              />
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.text}>{`No data available`}</Text>
          )}
        />

        {/* ADICIONAR PRODUTO */}

        <View style={styles.containerForResponse}>
          <Text style={styles.text}>Adicionar Produto</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome do Produto"
            value={prodName}
            onChangeText={(newValue) => {
              setProdName(newValue);
              console.log(prodName);
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            value={prodQuant}
            onChangeText={(newValue) => {
              setProdQuant(newValue);
              console.log(prodQuant);
            }}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Valor"
            value={prodPrice}
            onChangeText={(newValue) => {
              setProdPrice(newValue);
              console.log(prodPrice);
            }}
            keyboardType="numeric"
          />

          <Button
            onPress={handleAddProduct}
            title="Adicionar Produto"
            accessibilityLabel="Adicionar Produto"
          />
        </View>

        {/* ALTERAR PRODUTO */}

        <View style={styles.containerForResponse}>
          <Text style={styles.text}>Alterar Produto</Text>

          <TextInput
            style={styles.input}
            placeholder="Id do Produto"
            value={updateProdId}
            onChangeText={(newValue) => {
              setUpdateProdId(newValue);
              console.log(updateProdId);
            }}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Nome do Produto"
            value={updateProdName}
            onChangeText={(newValue) => {
              setUpdateProdName(newValue);
              console.log(updateProdName);
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            value={updateProdQuant}
            onChangeText={(newValue) => {
              setUpdateProdQuant(newValue);
              console.log(updateProdQuant);
            }}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Valor"
            value={updateProdPrice}
            onChangeText={(newValue) => {
              setUpdateProdPrice(newValue);
              console.log(updateProdPrice);
            }}
            keyboardType="numeric"
          />

          <Button
            onPress={handleUpdateProduct}
            title="Adicionar Produto"
            accessibilityLabel="Adicionar Produto"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    backgroundColor: "#7a818c",
  },
  flatListContainer: {
    backgroundColor: "#fff", // Fundo branco
    borderRadius: 10, // Bordas arredondadas
    padding: 15, // Padding interno
    marginVertical: 10, // Margem vertical entre os itens
    shadowColor: "#000", // Sombra para dar destaque
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Sombra no Android
  },
  flatListItem: {
    flexDirection: "column", // Itens em coluna
    alignItems: "center", // Itens centralizados
    justifyContent: "center", // Itens justificados
    padding: 10, // Espaçamento interno
  },
  containerForResponse: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: 5,
    padding: 20,
    marginTop: 20,
    marginRight: -20,
    shadowOpacity: 1,
    shadowColor: "#000",
  },
  text: {
    color: "#000",
  },
  input: {
    color: "#000",
    borderWidth: 0.4,
    width: 200,
    paddingLeft: 4,
  },
});
