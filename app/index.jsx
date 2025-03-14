import { Text, View , TextInput, FlatList, Pressable, StyleSheet, StatusBar} from "react-native";
import { SafeAreaView} from "react-native-safe-area-context";
import { useState, useContext, useEffect  } from "react";
import { data } from "@/data/todos";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Inter_500Medium, useFonts} from "@expo-google-fonts/inter";
import { ThemeContext } from "@/context/ThemeContext";
import Octicons from "@expo/vector-icons/Octicons";
import Animated, {LinearTransition} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [todos, setTodos] = useState(data.sort((a,b) =>b.id -a.id));

  const [text, setText] = useState("");

  const {colorScheme, setColorScheme, theme} = useContext(ThemeContext)

  const [loaded, error] = useFonts({
    Inter_500Medium
  });

  useEffect(() =>{
    const fetchData = async () =>{
      try{
        const jsonValue = await AsyncStorage.getItem("TodoApp");
        const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null

        if(storageTodos && storageTodos.length){
          setTodos(storageTodos.sort((a,b) => b.id -a.id))
        }else{
          setTodos(data.sort((a,d) => b.id - a.id))
        }
      }catch(e){
        console.error(e)
      }
    }
    fetchData()
  },[data]);

  useEffect(() =>{

    const storeData = async () =>{
      try{
        const jsonValue = JSON.stringify(todos);
        await AsyncStorage.setItem("TodoApp", jsonValue)
      }catch(e){
        console.error(error);
      }
    }
    storeData();
  },[todos])

  if(!loaded && !error){
    return null
  }

  const addTodo = () =>{
    if(text.trim()){
      const newId = todos.length > 0 ? todos[0].id + 1 : 1
      setTodos([{id: newId, title: text, completed: false}, ...todos]);
      setText("");
    }
  }

  const toggleTodo = (id) =>{
    setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
  }

  const removeTodo = (id) =>{
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const renderItem = ({item}) =>(
    <View style={styles.todoItem}>
      <Text style={[styles.todoText, item.completed && styles.completedText]} onPress={() => toggleTodo(item.id)} numberOfLines={1}>{item.title}</Text>
      <Pressable onPress={() => removeTodo(item.id)}>
      <MaterialCommunityIcons name="delete-circle" size={36} color="red" selectable={undefined} />
      </Pressable>
    </View>
  )

  const styles = createStyles(theme, colorScheme);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"}/>
      <View style={styles.inputContainer}>
        <TextInput 
        style={styles.input}
        placeholder="Add a new todo"
        placeholderTextColor="grey"
        value={text}
        onChangeText={setText}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
        <Pressable onPress={() => setColorScheme(colorScheme === "light" ? "dark" : "light")} style={{marginLeft: 10}}>
          <Octicons name={colorScheme === "dark" ? "moon" : "sun"} size={30} color={theme.text} selectable={undefined} style={{width: 36}}/>
        </Pressable>
      </View>
      <Animated.FlatList
      data={todos}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={{flexGrow: 1}}
      itemLayoutAnimation={LinearTransition}
      keyboardDismissMode="on-drag"
       />
    </SafeAreaView>
  );
}

function createStyles(theme, colorScheme){
  return StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: theme.background
    },
    inputContainer:{
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      padding:10,
      width: "100%"
    },
    input:{
      flex: 1,
      borderColor: "grey",
      borderWidth: 1,
      borderRadius: 5,
      fontFamily: "Inter_500Medium",
      padding: 10,
      marginRight: 10,
      fontSize: 15,
      minWidth: 0,
      color: theme.text
    },
    addButtonText:{
      color: theme.text,
      fontSize: 16,
      borderColor: "green",
      borderWidth: 1,
      padding: 10,
      borderRadius: 7
    },
    todoItem:{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 4,
      borderBottomColor: "gray",
      borderBottomWidth: 1,
      width: "100%",
      padding: 10
    },
    todoText:{
      color: theme.text,
      fontSize: 18,
      fontFamily: "Inter_500Medium",
       flex: 1
    },
    completedText:{
      textDecorationLine: "line-through"
    }
  })
}
