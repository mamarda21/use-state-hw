import { useEffect, useState } from "react";
import "./App.css";

// 1, 2 და 13 — People Manager
function PeopleManager() {
  const [people, setPeople] = useState(() => {
    const saved = localStorage.getItem("people");
    return saved ? JSON.parse(saved) : ["Mariam", "Nika", "Giorgi"];
  });

  const [search, setSearch] = useState("");
  const [newPerson, setNewPerson] = useState("");

  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
    document.title = `Team Size: ${people.length}`;
  }, [people]);

  const filteredPeople = people.filter((person) =>
    person.toLowerCase().includes(search.toLowerCase())
  );

  function addPerson() {
    const name = newPerson.trim();

    if (name === "") return;

    setPeople((prev) => [...prev, name]);
    setNewPerson("");
  }

  function deletePerson(indexToDelete) {
    setPeople((prev) => prev.filter((_, index) => index !== indexToDelete));
  }

  return (
    <section className="card">
      <h2>People Manager</h2>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search people..."
      />

      <div className="input-row">
        <input
          value={newPerson}
          onChange={(e) => setNewPerson(e.target.value)}
          placeholder="Enter a name..."
        />
        <button onClick={addPerson}>Add</button>
      </div>

      <p>Team size: {people.length}</p>

      {filteredPeople.map((person) => (
        <div className="list-item" key={person}>
          <span>{person}</span>
          <button
            className="delete-btn"
            onClick={() => deletePerson(people.indexOf(person))}
          >
            Delete
          </button>
        </div>
      ))}
    </section>
  );
}

// 3 — Name saved in localStorage
function NameStorage() {
  const [name, setName] = useState(
    () => localStorage.getItem("savedName") || ""
  );

  useEffect(() => {
    localStorage.setItem("savedName", name);
  }, [name]);

  return (
    <section className="card">
      <h2>Name Storage</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name..."
      />
      <p>Your name: {name}</p>
    </section>
  );
}

// 4 — Dark / Light Mode
function ThemeSwitcher() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <section className={`card theme-card ${theme}`}>
      <h2>Theme Switcher</h2>
      <p>Current theme: {theme}</p>
      <button
        onClick={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
      >
        Switch Theme
      </button>
    </section>
  );
}

// 5 — Timer
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="card">
      <h2>Timer</h2>
      <p className="number">{seconds} seconds</p>
    </section>
  );
}

// 6 — Window Width
function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <section className="card">
      <h2>Window Width</h2>
      <p>Width: {width}px</p>
      <p>{width < 600 ? "Phone" : "Computer"}</p>
    </section>
  );
}

// 7 — Stopwatch
function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  return (
    <section className="card">
      <h2>Stopwatch</h2>
      <p className="number">{seconds} seconds</p>

      <div className="button-row">
        <button onClick={() => setRunning(true)}>Start</button>
        <button onClick={() => setRunning(false)}>Stop</button>
        <button
          onClick={() => {
            setRunning(false);
            setSeconds(0);
          }}
        >
          Reset
        </button>
      </div>
    </section>
  );
}

// 8 — Countdown
function Countdown() {
  const [seconds, setSeconds] = useState(10);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!active || seconds === 0) return;

    const timeout = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [seconds, active]);

  return (
    <section className="card">
      <h2>Countdown</h2>
      <p className="number">
        {seconds === 0 ? "Time is up!" : seconds}
      </p>

      <button
        onClick={() => {
          setSeconds(10);
          setActive(true);
        }}
      >
        Restart
      </button>
    </section>
  );
}

// 9 — Todo List
function TodoList() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [task, setTask] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (task.trim() === "") return;

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: task.trim(),
        completed: false,
      },
    ]);

    setTask("");
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <section className="card">
      <h2>Todo List</h2>

      <div className="input-row">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {todos.map((todo) => (
        <div className="list-item" key={todo.id}>
          <span
            className={todo.completed ? "completed" : ""}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </span>

          <button
            className="delete-btn"
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </section>
  );
}

// 10 — Digital Clock
function DigitalClock() {
  const [time, setTime] = useState(
    () => new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="card">
      <h2>Digital Clock</h2>
      <p className="number">{time}</p>
    </section>
  );
}

// 11 — Save Button
function SaveButton() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  return (
    <section className="card">
      <h2>Save Button</h2>
      <button onClick={handleSave}>Save</button>
      {saved && <p className="success">Saved!</p>}
    </section>
  );
}

// 12 — Last Key Pressed
function LastKeyPressed() {
  const [lastKey, setLastKey] = useState("None");

  useEffect(() => {
    function handleKeyDown(event) {
      setLastKey(event.key);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="card">
      <h2>Last Key Pressed</h2>
      <p className="number">{lastKey}</p>
    </section>
  );
}

// Main App
function App() {
  return (
    <main className="app">
      <header>
        <h1>React useState & useEffect</h1>
        <p>13 React Practice Tasks</p>
      </header>

      <div className="grid">
        <PeopleManager />
        <NameStorage />
        <ThemeSwitcher />
        <Timer />
        <WindowWidth />
        <Stopwatch />
        <Countdown />
        <TodoList />
        <DigitalClock />
        <SaveButton />
        <LastKeyPressed />
      </div>
    </main>
  );
}

export default App;