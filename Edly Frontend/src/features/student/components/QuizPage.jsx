'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const quizOptions = [
  {
    id: 'A',
    label: 'A',
    text: 'Docker is a containerization platform that allows developers to package applications with their dependencies',
  },
  {
    id: 'B',
    label: 'B',
    text: 'Docker is a virtual machine technology that creates isolated environments for applications',
  },
  {
    id: 'C',
    label: 'C',
    text: 'Docker is a programming language specifically designed for cloud computing applications',
  },
  {
    id: 'D',
    label: 'D',
    text: 'Docker is a database management system optimized for microservices architecture',
  },
];

const QuizPage = () => {
  // const { quizId } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);
  const totalQuestions = 5;
  const timeRemaining = '11:11';

  // Calculate progress: only increases when moving to next question
  // Show 100% when last question is answered
  const progress =
    isLastQuestionAnswered && currentQuestion === totalQuestions
      ? 100
      : ((currentQuestion - 1) / totalQuestions) * 100;

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    // If this is the last question, mark it as answered for 100% progress
    if (currentQuestion === totalQuestions) {
      setIsLastQuestionAnswered(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  const handleSubmit = () => {
    // Handle quiz submission logic here
  };

  return (
    <div className="min-h-screen bg-background container-padding py-10 text-foreground">
      <div className="">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <h1 className="heading-1">Advanced Docker Concepts Quiz</h1>
          <Button size="lg" className="px-8" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="heading-4">
              Question {currentQuestion} of {totalQuestions}
            </span>
            <Badge variant="secondary" className="px-4 py-2 text-base">
              <Clock className="icon-md mr-2" />
              {timeRemaining}
            </Badge>
          </div>
          <Progress value={progress} className="h-3 bg-muted" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl sm:text-xl leading-relaxed">
              Why is Docker Lorem ipsum dolor sit amet consectetur adipisicing elit.considered
              essential for modern application development and deployment?
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-14">
          {quizOptions.map((option) => (
            <Card
              key={option.id}
              className={cn(
                'cursor-pointer transition-all duration-200 border-2',
                selectedOption === option.id
                  ? 'border-primary bg-primary/20 shadow-lg shadow-primary/20'
                  : 'border-border hover:border-muted-foreground hover:bg-accent'
              )}
              onClick={() => handleOptionSelect(option.id)}
            >
              <CardContent>
                <div className="flex items-start gap-4">
                  <Badge
                    className={cn(
                      'text-lg font-bold min-w-[40px] h-10 flex items-center justify-center rounded-full',
                      selectedOption === option.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {option.label}
                  </Badge>
                  <p className="body-default text-muted-foreground flex-1">{option.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div></div> {/* Empty div for spacing */}
          <div className="flex gap-2">
            {Array.from({ length: totalQuestions }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'w-3 h-3 rounded-full',
                  i + 1 === currentQuestion
                    ? 'bg-primary'
                    : i + 1 < currentQuestion
                      ? 'bg-primary/70'
                      : 'bg-muted'
                )}
              />
            ))}
          </div>
          <Button
            onClick={handleNext}
            disabled={currentQuestion === totalQuestions || !selectedOption}
          >
            Next
            <ChevronRight className="icon-sm ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
