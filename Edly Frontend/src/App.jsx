import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";

const App = () => {
  return (
    <BrowserRouter>
		<Routes>
			<Route path="/" element={<Body />}>
				{/* <Route path="/" element={e} /> */}
			</Route>
		</Routes>
	</BrowserRouter>
  )
}

export default App;