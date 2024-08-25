import React, { useState } from 'react';

// Types
interface Todo {
  id: number;
  task: string;
  date: string;
  isFinished: boolean;
}

// TodoItem Component
interface TodoItemProps extends Todo {
  isLatest: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, date, isFinished, onDelete, onEdit }) => {
  return (
    <div className="flex items-center  mb-2 text-[#6b7280] bg-[#242424] border border-[#5c5a5acb] p-2 rounded-md">
      <input type="checkbox" checked={isFinished} readOnly className="mr-2"/>
      <span className="flex-grow">{task}</span>
      <span className="text-xs text-gray-400 mr-2">{date}</span>
      <button onClick={onDelete} className="text-red-500 hover:text-red-400 mr-2">🗑️</button>
      <button onClick={onEdit} className="text-blue-500 hover:text-blue-400">✏️</button>
    </div>
  );
}

// TodoSection Component
interface TodoSectionProps {
  title: string;
  titleColor: string;
  todos: Todo[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const TodoSection: React.FC<TodoSectionProps> = ({ title, titleColor, todos, onDelete, onEdit }) => {
  return (
    <div className="mb-6">
      <h3 className={`${titleColor} font-semibold mb-3`}>{title}</h3>
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          {...todo}
          isLatest={index === 0}
          onDelete={() => onDelete(todo.id)}
          onEdit={() => onEdit(todo.id)}
        />
      ))}
    </div>
  );
}

// Main TodoList Component
const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, task: "Compete this projects Monday", date: "2023-12-26 07:15:00", isFinished: false },
    { id: 2, task: "Compete this projects Monday", date: "2023-12-26 07:15:00", isFinished: true },
    { id: 3, task: "Compete this projects Monday", date: "2023-12-26 07:15:00", isFinished: true },
    { id: 4, task: "Compete this projects Monday", date: "2023-12-26 07:15:00", isFinished: true },
  ]);

  const handleDelete = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id: number): void => {
    // Implement edit functionality
    console.log('Edit todo with id:', id);
  };

  return (
    <div className="bg-[#242424] border rounded-md border-[#5c5a5acb] p-5 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">My To Do Items</h2>
        <button className="text-white hover:underline">View All + Add To Do</button>
      </div>
      
      <TodoSection 
      
        title="Latest to do's" 
        titleColor="text-yellow-500" 
        todos={todos.filter(todo => !todo.isFinished)}
        onDelete={handleDelete}
        onEdit={handleEdit}
        
      />
      
      <TodoSection 
        title="Latest finished to do's" 
        titleColor="text-green-500" 
        todos={todos.filter(todo => todo.isFinished)}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default TodoList;