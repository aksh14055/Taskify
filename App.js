import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, LayoutAnimation, UIManager, Platform, StatusBar, TouchableOpacity } from 'react-native';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import CustomToggleSwitch from './components/ThemeToggleButton';
import { Audio } from 'expo-av';
import Toast from 'react-native-toast-message';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isDarkMode: false,
    };
  }

  motivationalMessages = [
    "Great job!",
    "Keep it up!",
    "You're doing awesome!",
    "Fantastic work!",
    "You're on fire!"
  ];

  componentDidMount() {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  addTodo = (todoText) => {
    this.setState((prevState) => ({
      todos: prevState.todos.concat({
        key: Math.random().toString(),
        text: todoText,
        completed: false,
        priority: false,
      }),
    }));
  };

  removeTodo = (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.key !== key),
    }));
  };

  toggleTodo = async (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const { sound } = await Audio.Sound.createAsync(require('./assets/tick.mp3'));

    this.setState((prevState) => {
      const updatedTodos = prevState.todos.map((todo) =>
        todo.key === key ? { ...todo, completed: !todo.completed } : todo
      );

      const sortedTodos = updatedTodos.sort((a, b) => {
        if (a.priority !== b.priority) {
          return b.priority - a.priority;
        }
        if (a.completed !== b.completed) {
          return a.completed - b.completed;
        }
        return a.key.localeCompare(b.key);
      });

      return { todos: sortedTodos };
    }, async () => {
      const toggledTodo = this.state.todos.find(todo => todo.key === key);
      if (toggledTodo.completed) {
        await sound.playAsync();
        this.showMotivationalMessage();
      }
    });
  };

  editTodo = (key, newText) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.key === key ? { ...todo, text: newText } : todo
      ),
    }));
  };

  togglePriority = (key, isPriority) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.map((todo) =>
        todo.key === key ? { ...todo, priority: isPriority } : todo
      );

      const sortedTodos = updatedTodos.sort((a, b) => {
        if (a.priority !== b.priority) {
          return b.priority - a.priority;
        }
        if (a.completed !== b.completed) {
          return a.completed - b.completed;
        }
        return a.key.localeCompare(b.key);
      });

      return { todos: sortedTodos };
    });
  };

  toggleTheme = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState((prevState) => ({
      isDarkMode: !prevState.isDarkMode,
    }));
  };

  showMotivationalMessage = () => {
    const message = this.motivationalMessages[Math.floor(Math.random() * this.motivationalMessages.length)];
    Toast.show({
      type: 'success',
      text1: message,
      position: 'bottom',
      visibilityTime: 3000,
    });
  };

  render() {
    const { isDarkMode, todos } = this.state;

    return (
      <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.header}>
          <Text style={[styles.title, isDarkMode && styles.titleDark]}>Taskify</Text>
          <CustomToggleSwitch toggleTheme={this.toggleTheme} isDarkMode={isDarkMode} />
        </View>
        <TodoInput onAddTodo={this.addTodo} isDarkMode={isDarkMode} />
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              onPressRemove={this.removeTodo}
              onPressCheck={this.toggleTodo}
              onEditTodo={this.editTodo}
              onPriorityChange={this.togglePriority}
              isDarkMode={isDarkMode}
            />
          )}
          keyExtractor={(item) => item.key}
        />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  titleDark: {
    color: '#f0f0f0',
  },
});
