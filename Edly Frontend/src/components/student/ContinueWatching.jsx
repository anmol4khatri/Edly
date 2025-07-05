import VideoAccordion from "../VideoAccordion";

const ContinueWatching = () => {
    return(
        <div className="min-h-screen dark bg-background px-16 py-16 flex gap-6">
            <div className="w-6/10">
                <img src="https://placehold.co/1920x1080" alt="video" className="aspect-video"/>
                <p className="text-3xl font-bold mt-4">Docker and Kubernates</p>
            </div>
            <div className="w-4/10">
                <VideoAccordion />
            </div>
        </div>
    );
};

export default ContinueWatching;