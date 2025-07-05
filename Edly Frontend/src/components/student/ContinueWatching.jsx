import VideoAccordion from "../VideoAccordion";

const ContinueWatching = () => {
    return(
        <div className="min-h-screen dark bg-background px-16 py-16 flex gap-6">
            <div className="w-6/10">
                <video src="https://videos.pexels.com/video-files/7821663/7821663-hd_1920_1080_30fps.mp4" controls className="rounded"></video>
                <p className="text-3xl font-bold mt-4">Docker and Kubernates</p>
            </div>
            <div className="w-4/10">
                <VideoAccordion />
            </div>
        </div>
    );
};

export default ContinueWatching;