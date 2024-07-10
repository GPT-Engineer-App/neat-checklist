import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { CheckCircle2, Trash2 } from "lucide-react";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const { theme, setTheme } = useTheme();

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Todo App</h1>
          <div className="flex items-center">
            <span className="mr-2">Light</span>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
            <span className="ml-2">Dark</span>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex mb-4">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="flex-grow mr-2"
          />
          <Button onClick={addTodo}>Add Todo</Button>
        </div>
        <div>
          {todos.map((todo, index) => (
            <Card key={index} className="mb-2">
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(index)}
                    className="mr-2"
                  />
                  <span className={todo.completed ? "line-through" : ""}>
                    {todo.text}
                  </span>
                </div>
                <Button variant="ghost" onClick={() => deleteTodo(index)}>
                  <Trash2 className="h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>{remainingTodos} items left</span>
          <Button variant="outline" onClick={clearCompleted}>
            Clear Completed
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Index;