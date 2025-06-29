import { useState, useEffect } from "react";
import CourseHero from "../CourseHero"
import CourseHighlights from "../CourseHighlights";
import CourseBanner from "../CourseBanner"

const CoursePage = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			setIsScrolled(scrollTop > 50); // scroll threshold
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className="min-h-screen bg-background">
			{/* Mobile Layout */}
			<div className="block lg:hidden">
				<div className="px-4 py-0">
					<CourseHero />
					<div className="">
						<CourseBanner />
					</div>
					<CourseHighlights />
				</div>
			</div>

			{/* Desktop Layout - Original Structure */}
			<div className="hidden lg:block px-16 py-10 relative">
				<div className="w-full">
					<CourseHero />
					<CourseHighlights />
				</div>

				{/* Banner with dynamic positioning based on scroll */}
				<div className={`fixed right-15 z-10 w-96 transition-all duration-300 ease-in-out ${isScrolled ? 'top-12' : 'top-35'
					}`}>
					<CourseBanner />
				</div>
			</div>
		</div>
	)
}

export default CoursePage