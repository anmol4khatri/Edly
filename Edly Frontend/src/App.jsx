import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import BrowseCourses from "./components/student/BrowseCourses";

const App = () => {
  return (
    <BrowserRouter>
		<Routes>
			<Route path="/" element={<Body />}>
				<Route path="/browse" element={<BrowseCourses />} />
			</Route>
		</Routes>
	</BrowserRouter>
  )
}

export default App;