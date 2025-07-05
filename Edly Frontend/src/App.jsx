import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import BrowseCourses from "./components/student/BrowseCourses";
import EnrolledCourses from "./components/student/EnrolledCourses";
import CoursePage from "./components/student/CoursePage";
import SignupEducator from "./components/eduator/SignupEducator";
import LoginEducator from "./components/eduator/LoginEducator";
import LoginStudent from "./components/student/LoginStudent";
import SignupStudent from "./components/student/SignupEducator";
import OnboardingPage from "./components/eduator/OnboardingPage";
import ContinueWatching from "./components/student/ContinueWatching";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Body />}>
					<Route path="/browse" element={<BrowseCourses />} />
					<Route path="/enrolled" element={<EnrolledCourses />} />
					<Route path="/course" element={<CoursePage />} />
					<Route path="/student/continue_watching" element={<ContinueWatching />} />
				</Route>
				<Route path="/educator/signup" element={<SignupEducator />} />
				<Route path="/educator/onboarding" element={<OnboardingPage />} />
				<Route path="/educator/login" element={<LoginEducator />} />
				<Route path="/student/signup" element={<SignupStudent />} />
				<Route path="/student/login" element={<LoginStudent />} />

			</Routes>
		</BrowserRouter>
	)
}

export default App;