import "./App.css";
import { useGetEntries } from "./hooks/useGetEntries";

function App() {
  const data = useGetEntries();

  return (
    <div className="App">
      <h1>Unreliable Nutrition Contract</h1>
      <ul>
        {data
          .flatMap((query) => query.data || [])
          .filter((entry) => entry !== null)
          .map((entry) => (
            <li key={entry.id + entry.timestamp}>
              {entry.timestamp} - {entry.meta.source} - {entry.name}{" "}
              {entry.meta.flags.length > 0
                ? " -   [" + entry.meta.flags.join(", ") + "]"
                : ""}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
