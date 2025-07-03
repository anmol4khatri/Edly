import { useState, useEffect } from "react";
import CourseHero from "../CourseHero"
import CourseHighlights from "../CourseHighlights";
import CourseBanner from "../CourseBanner"
import CourseAccordion from "../CourseAccordion";
import CourseReview from "../CourseReview";
import CourseRating from "../CourseRating";

const CoursePage = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [scrollLimitReached, setScrollLimitReached] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;

			// Calculate the limit: stop when 30px from bottom
			const scrollLimit = documentHeight - windowHeight - 250;

			if (scrollTop >= scrollLimit) {
				setScrollLimitReached(true);
				// Keep banner in original position when limit is reached
			} else {
				setScrollLimitReached(false);
				setIsScrolled(scrollTop > 50);
			}
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
					<CourseAccordion />
					<CourseRating />
					<CourseReview />
				</div>
			</div>

			{/* Desktop Layout - Original Structure */}
			<div className="hidden lg:block px-16 py-3 relative">
				<div className="w-full">
					<CourseHero />
					<CourseHighlights />
					<CourseAccordion />
					<CourseRating />
					<CourseReview />
				</div>

				{/* Banner with dynamic positioning based on scroll */}
				<div
					className={`fixed right-15 z-10 w-96 transform ${scrollLimitReached
							? 'opacity-0 translate-y-4 translate-x-4 scale-95 pointer-events-none'
							: isScrolled
								? 'top-9 opacity-100 translate-y-0 translate-x-0 scale-100'
								: 'top-28 opacity-100 translate-y-0 translate-x-0 scale-100'
						}`}
					style={{
						transition: 'all 0.5s ease-in-out',
						willChange: 'transform, opacity' // Optimize for animations
					}}
				>
					<CourseBanner />
				</div>
			</div>
		</div>
	)
}

export default CoursePage;