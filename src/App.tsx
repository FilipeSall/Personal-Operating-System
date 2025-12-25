import { Outlet } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { globalStyles } from "./styles/globalStyles";

function App() {
  return (
    <main {...stylex.props(globalStyles.body)}>
      <Outlet />
    </main>
  );
}

export default App;
