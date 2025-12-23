import "./App.css";
import { useGetEntries } from "./hooks/useGetEntries";

function App() {
  const data = useGetEntries();
  console.log(data);
  return null;
}

export default App;
