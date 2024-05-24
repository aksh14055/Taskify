import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TodoItem = ({ item, onPressRemove, onPressCheck, onEditTodo, onPriorityChange, isDarkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);
  const iconColor = isDarkMode ? '#fff' : '#000';

  const handleSaveEdit = () => {
    onEditTodo(item.key, editText);
    setIsEditing(false);
  };

  return (
    <View style={[styles.todoItem, isDarkMode && styles.todoItemDark]}>
      <TouchableOpacity onPress={() => onPressCheck(item.key)} style={styles.checkBox} accessible accessibilityLabel="Check item">
        <Ionicons name={item.completed ? "checkbox-outline" : "square-outline"} size={24} color={item.completed ? "green" : iconColor} />
      </TouchableOpacity>
      {isEditing ? (
        <TextInput
          style={[styles.todoTextInput, isDarkMode && styles.todoTextInputDark]}
          value={editText}
          onChangeText={setEditText}
          onSubmitEditing={handleSaveEdit}
        />
      ) : (
        <Text style={[styles.todoText, item.completed && styles.completedText, isDarkMode && styles.todoTextDark]}>
          {item.text}
        </Text>
      )}
      <View style={styles.actionIcons}>
        {isEditing ? (
          <TouchableOpacity onPress={handleSaveEdit} style={styles.iconButton} accessible accessibilityLabel="Save changes">
            <Ionicons name="checkmark-outline" size={24} color="blue" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.iconButton} accessible accessibilityLabel="Edit item">
            <Ionicons name="pencil-outline" size={24} color={iconColor} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.iconButton, item.priority && styles.priorityButton]}
          onPress={() => onPriorityChange(item.key, !item.priority)}
          accessible
          accessibilityLabel="Toggle priority"
        >
          <Ionicons name="star-outline" size={24} color={item.priority ? 'gold' : iconColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressRemove(item.key)} style={styles.iconButton} accessible accessibilityLabel="Delete item">
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  todoItemDark: {
    backgroundColor: '#333',
    borderBottomColor: '#555',
  },
  checkBox: {
    marginRight: 12,
  },
  todoText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  todoTextDark: {
    color: '#f0f0f0',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  todoTextInput: {
    flex: 1,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    color: '#333',
  },
  todoTextInputDark: {
    borderBottomColor: '#f0f0f0',
    color: '#f0f0f0',
  },
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 8,
  },
  priorityButton: {
    borderColor: 'gold',
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
  },
});

export default TodoItem;
