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
import QuizPage from "./components/student/QuizPage";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Body />}>
					<Route path="/browse" element={<BrowseCourses />} />
					<Route path="/enrolled" element={<EnrolledCourses />} />
					<Route path="/course" element={<CoursePage />} />
					<Route path="/continue_watching" element={<ContinueWatching />} />
				</Route>
				
				{/* Admin / Educator */}
				<Route path="/admin/signup" element={<SignupEducator />} />
				<Route path="/admin/onboarding" element={<OnboardingPage />} />
				<Route path="/admin/login" element={<LoginEducator />} />
				
				{/* Student */}
				<Route path="/signup" element={<SignupStudent />} />
				<Route path="/login" element={<LoginStudent />} />
				<Route path="/quiz/:quizId" element={<QuizPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;