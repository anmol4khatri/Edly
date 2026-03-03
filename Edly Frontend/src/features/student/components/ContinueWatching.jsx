import VideoAccordion from '@/features/courses/components/VideoAccordion';

const ContinueWatching = () => {
  return (
    <div className="min-h-screen bg-background container-padding py-16 flex gap-6 max-sm:py-4 max-sm:flex-col">
      <div className="w-6/10 max-sm:w-full">
        <video
          src="https://videos.pexels.com/video-files/7821663/7821663-hd_1920_1080_30fps.mp4"
          controls
          className="rounded-lg"
        ></video>
        <p className="heading-1 mt-4 max-sm:mt-2">Docker and Kubernates</p>
      </div>
      <div className="w-4/10 max-sm:w-full">
        <VideoAccordion />
      </div>
    </div>
  );
};

export default ContinueWatching;
