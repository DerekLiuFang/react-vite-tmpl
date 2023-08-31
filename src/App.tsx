import routes from "@/routes/index";
import { RouterProvider } from "react-router-dom";
function App() {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
