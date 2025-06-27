import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import BrowseCourses from "./components/student/BrowseCourses";
import EnrolledCourses from "./components/student/EnrolledCourses";

const App = () => {
  return (
    <BrowserRouter>
		<Routes>
			<Route path="/" element={<Body />}>
				<Route path="/browse" element={<BrowseCourses />} />
				<Route path="/enrolled" element={<EnrolledCourses />} />
			</Route>
		</Routes>
	</BrowserRouter>
  )
}

export default App;