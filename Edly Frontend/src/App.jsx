import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from '@/components/layouts/Body';
import BrowseCourses from '@/features/student/components/BrowseCourses';
import EnrolledCourses from '@/features/student/components/EnrolledCourses';
import CoursePage from '@/features/student/components/CoursePage';
import SignupEducator from '@/features/educator/components/SignupEducator';
import LoginEducator from '@/features/educator/components/LoginEducator';
import LoginStudent from '@/features/student/components/LoginStudent';
import SignupStudent from '@/features/student/components/SignupEducator'; // Note: Keeping file name as is for now to avoid breaking changes, but moved folder
import OnboardingPage from '@/features/educator/components/OnboardingPage';
import ContinueWatching from '@/features/student/components/ContinueWatching';
import QuizPage from '@/features/student/components/QuizPage';

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
  );
};

export default App;
