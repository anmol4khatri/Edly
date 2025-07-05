import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Play, FileText, HelpCircle } from 'lucide-react'
import { useState } from 'react'

const modules = [
  {
    "_id": "68516e8961fddef7bf2cf369",
    "title": "Module 1: Docker Basics",
    "courseId": "685169eb081c8ce60078e5ac",
    "content": [
      {
        "type": "lesson",
        "data": {
          "_id": "68516e8961fddef7bf2cf380",
          "title": "What is Docker?",
          "videoUrl": "https://cdn.com/video2.mp4",
          "createdAt": "2025-06-17T13:32:57.102Z",
          "updatedAt": "2025-06-17T13:32:57.102Z",
          "__v": 0
        }
      },
      {
        "type": "pdf",
        "data": {
          "_id": "68516e8961fddef7bf2cf381",
          "title": "Docker Commands Cheat Sheet",
          "pdfUrl": "https://cdn.com/docker-cheat-sheet.pdf"
        }
      },
      {
        "type": "quiz",
        "data": {
          "_id": "68516e8961fddef7bf2cf382",
          "title": "Docker Quiz"
        }
      }
    ],
    "createdAt": "2025-06-17T13:32:57.159Z",
    "updatedAt": "2025-06-17T13:48:11.956Z"
  },
  {
    "_id": "68516e8961fddef7bf2cf370",
    "title": "Module 2: Containers",
    "courseId": "685169eb081c8ce60078e5ac",
    "content": [
      {
        "type": "lesson",
        "data": {
          "_id": "68516e8961fddef7bf2cf383",
          "title": "Running Containers",
          "videoUrl": "https://cdn.com/video4.mp4",
          "createdAt": "2025-06-17T13:32:57.102Z",
          "updatedAt": "2025-06-17T13:32:57.102Z",
          "__v": 0
        }
      },
      {
        "type": "pdf",
        "data": {
          "_id": "68516e8961fddef7bf2cf384",
          "title": "Container Best Practices",
          "pdfUrl": "https://cdn.com/container-best-practices.pdf"
        }
      }
    ],
    "createdAt": "2025-06-17T13:32:57.159Z",
    "updatedAt": "2025-06-17T13:48:11.956Z"
  },
  {
    "_id": "68516e8961fddef7bf2cf371",
    "title": "Module 3: K8s Intro",
    "courseId": "685169eb081c8ce60078e5ac",
    "content": [
      {
        "type": "pdf",
        "data": {
          "_id": "68516e8961fddef7bf2cf386",
          "title": "K8s Architecture Guide",
          "pdfUrl": "https://cdn.com/k8s-architecture.pdf"
        }
      },
      {
        "type": "lesson",
        "data": {
          "_id": "68516e8961fddef7bf2cf387",
          "title": "Pods & Nodes",
          "videoUrl": "https://cdn.com/video7.mp4",
          "createdAt": "2025-06-17T13:32:57.102Z",
          "updatedAt": "2025-06-17T13:32:57.102Z",
          "__v": 0
        }
      },
      {
        "type": "quiz",
        "data": {
          "_id": "68516e8961fddef7bf2cf388",
          "title": "K8s Quiz"
        }
      }
    ],
    "createdAt": "2025-06-17T13:32:57.159Z",
    "updatedAt": "2025-06-17T13:48:11.956Z"
  },
  {
    "_id": "68516e8961fddef7bf2cf372",
    "title": "Module 4: Deployments",
    "courseId": "685169eb081c8ce60078e5ac",
    "content": [
      {
        "type": "lesson",
        "data": {
          "_id": "68516e8961fddef7bf2cf389",
          "title": "K8s Deployments",
          "videoUrl": "https://cdn.com/video8.mp4",
          "createdAt": "2025-06-17T13:32:57.102Z",
          "updatedAt": "2025-06-17T13:32:57.102Z",
          "__v": 0
        }
      },
      {
        "type": "pdf",
        "data": {
          "_id": "68516e8961fddef7bf2cf390",
          "title": "YAML Config Examples",
          "pdfUrl": "https://cdn.com/yaml-configs.pdf"
        }
      }
    ],
    "createdAt": "2025-06-17T13:32:57.159Z",
    "updatedAt": "2025-06-17T13:48:11.956Z"
  },
  {
    "_id": "68516e8961fddef7bf2cf373",
    "title": "Module 5: CI/CD Pipeline",
    "courseId": "685169eb081c8ce60078e5ac",
    "content": [
      {
        "type": "pdf",
        "data": {
          "_id": "68516e8961fddef7bf2cf392",
          "title": "CI/CD Setup Guide",
          "pdfUrl": "https://cdn.com/cicd-setup.pdf"
        }
      },
      {
        "type": "quiz",
        "data": {
          "_id": "68516e8961fddef7bf2cf394",
          "title": "Final Quiz"
        }
      }
    ],
    "createdAt": "2025-06-17T13:32:57.159Z",
    "updatedAt": "2025-06-17T13:48:11.956Z"
  }
]

const getContentIcon = (type) => {
  switch (type) {
    case 'lesson':
      return <Play className="w-5 h-5 text-blue-500" />
    case 'pdf':
      return <FileText className="w-5 h-5 text-red-500" />
    case 'quiz':
      return <HelpCircle className="w-5 h-5 text-green-500" />
    default:
      return null
  }
}

const CourseModulesAccordion = () => {
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState(null)

  const handleContentClick = (item) => {
    if (item.type === 'lesson') {
      setCurrentPlayingVideo(item.data._id)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        {modules.map((module, index) => (
          <AccordionItem
            key={module._id}
            value={`item-${index + 1}`}
            className="data-[state=open]:bg-card rounded-md border-none px-5 transition-colors duration-200"
          >
            <AccordionTrigger className="text-lg">{module.title}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              <div className="space-y-3 mt-4">
                {module.content.map((item, contentIndex) => (
                  <div 
                    key={item.data._id} 
                    onClick={() => handleContentClick(item)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      currentPlayingVideo === item.data._id && item.type === 'lesson'
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'hover:bg-white/10 text-foreground'
                    }`}
                  >
                    {getContentIcon(item.type)}
                    <div className="flex-1">
                      <h4 className="font-medium">
                        {item.data.title}
                      </h4>
                    </div>
                    {item.type === 'lesson' && (
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                        Video
                      </span>
                    )}
                    {item.type === 'pdf' && (
                      <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">
                        PDF
                      </span>
                    )}
                    {item.type === 'quiz' && (
                      <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">
                        Quiz
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default CourseModulesAccordion