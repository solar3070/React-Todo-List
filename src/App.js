import { useState, useRef } from "react";
import { createGlobalStyle } from "styled-components";
import TodoTemplate from "./components/TodoTemplate";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";

function App() {
  const [inputs, setInputs] = useState({
    text: "",
  });
  const { text } = inputs;
  const onChange = (e) => {
    setInputs({
      text: e.target.value,
    });
  };

  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "프로젝트 생성하기",
      done: true,
    },
    {
      id: 2,
      text: "컴포넌트 스타일링하기",
      done: true,
    },
    {
      id: 3,
      text: "Context 만들기",
      done: false,
    },
    {
      id: 4,
      text: "기능 구현하기",
      done: false,
    },
  ]);

  const onToggle = (id) => {
    return setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const onRemove = (id) => {
    return setTodos(todos.filter((todo) => todo.id !== id));
  };

  const nextId = useRef(5);
  const onCreate = () => {
    const todo = {
      id: nextId.current,
      text,
      done: false,
    };
    setTodos(todos.concat(todo));

    setInputs({
      text: "",
    });
    nextId.current += 1;
  };

  return (
    <>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead todos={todos} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        <TodoCreate />
      </TodoTemplate>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e9ecef;
  }
`;

export default App;
