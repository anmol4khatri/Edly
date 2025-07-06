"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { HelpCircle } from "lucide-react"
import { useState, useRef } from "react"

const QuizRulesDialog = ({ quiz }) => {
  const [hasReadToBottom, setHasReadToBottom] = useState(false)
  const contentRef = useRef(null)

  const handleScroll = () => {
    const content = contentRef.current
    if (!content) return
    const scrollPercentage = content.scrollTop / (content.scrollHeight - content.clientHeight)
    if (scrollPercentage >= 0.99 && !hasReadToBottom) {
      setHasReadToBottom(true)
    }
  }

  const handleStartQuiz = () => {
    // Handle quiz start logic here
    console.log("Starting quiz:", quiz.title)
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) setHasReadToBottom(false)
      }}
    >
      <DialogTrigger asChild>
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer max-sm:text-base hover:bg-white/10 text-foreground`}
        >
          <HelpCircle className="w-5 h-5 text-green-500" />
          <div className="flex-1">
            <h4 className="font-medium">{quiz.title}</h4>
          </div>
          <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Quiz</span>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5 bg-[#17181C] border-gray-700">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-gray-700 px-6 py-4 text-base text-white">
            Quiz Rules & Guidelines
          </DialogTitle>
          <div ref={contentRef} onScroll={handleScroll} className="overflow-y-auto">
            <DialogDescription asChild>
              <div className="px-6 py-4">
                <div className="[&_strong]:text-white space-y-4 [&_strong]:font-semibold text-gray-300">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p>
                        <strong>Quiz Instructions</strong>
                      </p>
                      <p>
                        Please read all instructions carefully before starting the quiz. This quiz is designed to test
                        your understanding of the module content. Make sure you have completed all lessons and reviewed
                        the materials.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p>
                        <strong>Time Limit</strong>
                      </p>
                      <p>
                        You will have 30 minutes to complete this quiz. The timer will start once you begin the quiz.
                        Make sure you have a stable internet connection and are in a quiet environment where you can
                        focus.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p>
                        <strong>Question Format</strong>
                      </p>
                      <p>
                        The quiz contains multiple-choice questions. Each question has only one correct answer. Read
                        each question carefully and select the best answer from the provided options.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p>
                        <strong>Scoring System</strong>
                      </p>
                      <p>
                        Each correct answer is worth 1 point. There is no negative marking for incorrect answers. You
                        need to score at least 70% to pass the quiz. Your results will be available immediately after
                        submission.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p>
                        <strong>Quiz Rules</strong>
                      </p>
                      <ul className="list-disc pl-6">
                        <li>You can only attempt the quiz once</li>
                        <li>All questions must be answered before submission</li>
                        <li>You cannot go back to previous questions once submitted</li>
                        <li>No external resources or materials are allowed</li>
                        <li>Ensure you have reviewed all module content before starting</li>
                      </ul>
                    </div>
                    <div className="space-y-1">
                      <p>
                        <strong>Technical Requirements</strong>
                      </p>
                      <p>
                        Make sure your device has a stable internet connection. The quiz will automatically save your
                        progress, but avoid refreshing the page or closing the browser during the quiz.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p>
                        <strong>Support</strong>
                      </p>
                      <p>
                        If you encounter any technical issues during the quiz, please contact the course administrator
                        immediately. Do not attempt to restart the quiz without proper guidance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="border-t border-gray-700 px-6 py-4 sm:items-center bg-[#17181C]">
          {!hasReadToBottom && (
            <span className="text-gray-400 grow text-xs max-sm:text-center">
              Read all rules before starting the quiz.
            </span>
          )}
          <DialogClose asChild>
           <Button type="button" variant="default" className="bg-white/10 text-white hover:text-white hover:bg-white/20">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" disabled={!hasReadToBottom} onClick={handleStartQuiz}>
              Start Quiz
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default QuizRulesDialog
