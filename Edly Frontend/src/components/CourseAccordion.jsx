import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Video } from 'lucide-react';
import { NotebookPen } from 'lucide-react';
import { Key } from 'lucide-react';

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

const CourseAccordion = () => {
  const handleItemClick = (data) => {
    console.log(data);
  }
  return (
    (<div className="px-3 py-5 bg-red-500 w-8/12">
      <h2 className="text-xl font-bold">Comprehensive Course Modules</h2>
      <Accordion type="single" collapsible className="-space-y-px w-12/12" defaultValue="3">
        {modules.map((module) => (
          <AccordionItem
            value={module._id}
            key={module._id}
            className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]">
            <AccordionTrigger
              className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0">
              {module.title}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-2">
              {module.content.map(item => (
                <div key={item.data._id} className="flex gap-10" onClick={() => handleItemClick(item.data)}>
                  <span>
                    {item.type === "lesson" ? <Video /> :
                      item.type === "pdf" ? <NotebookPen /> :
                        <Key />}
                  </span>
                  <p>{item.data.title}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>)
  );
}

export default CourseAccordion;
