import { Outlet } from "react-router-dom";

import LayoutMain from "./Layout/LayoutMain";

function App() {
  return (
    <LayoutMain>
      <Outlet></Outlet>
    </LayoutMain>
  );
}

export default App;
