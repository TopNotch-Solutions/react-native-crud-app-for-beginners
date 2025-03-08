import { Text, View , TextInput, FlatList, Pressable, StyleSheet} from "react-native";
import { SafeAreaView} from "react-native-safe-area-context";
import { useState } from "react";
import { data } from "@/data/todos";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Index() {
  const [todos, setTodos] = useState(data.sort((a,b) =>b.id -a.id));

  console.log(todos);
  const [text, setText] = useState("");

  console.log(text);

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
      <Text style={[styles.todoText, item.completed && styles.completedText]} onPress={() => toggleTodo(item.id)}>{item.title}</Text>
      <Pressable onPress={() => removeTodo(item.id)}>
      <MaterialCommunityIcons name="delete-circle" size={36} color="red" selectable={undefined} />
      </Pressable>
    </View>
  )

  const styles = createStyles();
  return (
    <SafeAreaView style={styles.container}>
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
      </View>
      <FlatList
      data={todos}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={{flexGrow: 1}}
       />
    </SafeAreaView>
  );
}

function createStyles(){
  return StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: "black"
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
      padding: 10,
      marginRight: 10,
      fontSize: 15,
      minWidth: 0,
      color: "white"
    },
    addButtonText:{
      color: "white",
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
      color: "white",
      fontSize: 18,
       flex: 1
    },
    completedText:{
      textDecorationLine: "line-through"
    }
  })
}
