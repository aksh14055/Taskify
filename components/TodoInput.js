// components/TodoInput.js
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TodoInput = ({ onAddTodo, isDarkMode }) => {
  const [todoText, setTodoText] = useState('');

  const handleAddTodo = () => {
    if (todoText.trim()) {
      onAddTodo(todoText);
      setTodoText('');
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="Add a new task..."
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        value={todoText}
        onChangeText={setTodoText}
      />
      <TouchableOpacity style={[styles.addButton, isDarkMode && styles.addButtonDark]} onPress={handleAddTodo}>
        <Ionicons name="add-outline" size={24} color={isDarkMode ? '#333' : '#fff'} />
        <Text style={[styles.addButtonText, isDarkMode && styles.addButtonTextDark]}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 18,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 12,
    marginRight: 16,
  },
  inputDark: {
    borderColor: '#f0f0f0',
    color: '#f0f0f0',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#333',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  addButtonDark: {
    backgroundColor: '#f0f0f0',
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'HelveticaNeue-Medium',
  },
  addButtonTextDark: {
    color: '#333',
  },
});

export default TodoInput;
