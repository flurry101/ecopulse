"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Trophy, Brain, Medal, Users, ArrowRight, CheckCircle2, XCircle, Share2 } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

interface LeaderboardEntry {
  nickname: string
  score: number
  date: string
  tag?: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is a 'carbon footprint'?",
    options: [
      "The amount of water you use daily",
      "The total greenhouse gas emissions caused directly or indirectly by an individual or organization",
      "The number of trees in your neighborhood",
      "The size of your shoe"
    ],
    correctAnswer: "The total greenhouse gas emissions caused directly or indirectly by an individual or organization",
    explanation: "A carbon footprint measures the total greenhouse gas emissions caused by an individual, event, organization, service, place or product."
  },
  {
    id: 2,
    question: "Which gas is a major contributor to the greenhouse effect?",
    options: [
      "Oxygen",
      "Nitrogen",
      "Carbon dioxide (CO₂)",
      "Helium"
    ],
    correctAnswer: "Carbon dioxide (CO₂)",
    explanation: "CO₂ is one of the main greenhouse gases that trap heat in Earth's atmosphere, contributing significantly to global warming."
  },
  {
    id: 3,
    question: "Which mode of transport generally produces the lowest carbon emissions per mile?",
    options: [
      "Private car",
      "Airplane",
      "Public bus",
      "Bicycle"
    ],
    correctAnswer: "Bicycle",
    explanation: "Bicycles produce zero direct emissions and require minimal resources to manufacture and maintain."
  },
  {
    id: 4,
    question: "How can you reduce your home's energy consumption?",
    options: [
      "Leaving all lights on 24/7",
      "Using smart appliances and improving insulation",
      "Keeping windows open in winter",
      "Running all electronics at the same time"
    ],
    correctAnswer: "Using smart appliances and improving insulation",
    explanation: "Smart appliances and proper insulation help optimize energy use and reduce waste."
  },
  {
    id: 5,
    question: "What is a sustainable diet choice that helps reduce your carbon footprint?",
    options: [
      "Eating more plant-based foods",
      "Eating only imported exotic foods",
      "Increasing red meat consumption",
      "Avoiding leftovers"
    ],
    correctAnswer: "Eating more plant-based foods",
    explanation: "Plant-based foods generally require fewer resources to produce and result in lower greenhouse gas emissions."
  },
  {
    id: 6,
    question: "Which of the following is not a greenhouse gas?",
    options: [
      "Methane (CH₄)",
      "Carbon dioxide (CO₂)",
      "Oxygen (O₂)",
      "Nitrous oxide (N₂O)"
    ],
    correctAnswer: "Oxygen (O₂)",
    explanation: "Oxygen is not a greenhouse gas. The main greenhouse gases are water vapor, CO₂, methane, and nitrous oxide."
  },
  {
    id: 7,
    question: "What does 'active travel' mean?",
    options: [
      "Driving a hybrid car",
      "Walking, cycling, or other forms of non-motorized transport",
      "Taking a taxi everywhere",
      "Flying short distances"
    ],
    correctAnswer: "Walking, cycling, or other forms of non-motorized transport",
    explanation: "Active travel refers to making journeys by physically active means, like walking or cycling."
  },
  {
    id: 8,
    question: "What is the 'carbon cycle'?",
    options: [
      "The process of planting and cutting trees every year",
      "The natural circulation of carbon among the atmosphere, oceans, soil, and living organisms",
      "Riding a bike around a carbon-themed park",
      "The annual increase in global carbon emissions"
    ],
    correctAnswer: "The natural circulation of carbon among the atmosphere, oceans, soil, and living organisms",
    explanation: "The carbon cycle is the process by which carbon atoms continually travel from the atmosphere to the Earth and then back into the atmosphere."
  },
  {
    id: 9,
    question: "Which is an example of a mitigation strategy for climate change?",
    options: [
      "Ignoring climate science",
      "Switching to renewable energy sources like solar or wind power",
      "Increasing fossil fuel use",
      "Building more coal power plants"
    ],
    correctAnswer: "Switching to renewable energy sources like solar or wind power",
    explanation: "Renewable energy sources help reduce greenhouse gas emissions by replacing fossil fuels."
  },
  {
    id: 10,
    question: "What is a 'tipping point' in climate science?",
    options: [
      "The moment when global warming stops",
      "A critical threshold where a small change can cause drastic and irreversible effects on the climate system",
      "The peak of a mountain",
      "When the ice melts only in summer"
    ],
    correctAnswer: "A critical threshold where a small change can cause drastic and irreversible effects on the climate system",
    explanation: "A tipping point is a critical threshold that, when exceeded, leads to large and often irreversible changes in the climate system."
  }
]

const mockLeaderboard: LeaderboardEntry[] = [
  { nickname: "EcoWarrior", score: 10, date: "2025-03-15", tag: "Climate Champion" },
  { nickname: "GreenThumb", score: 9, date: "2025-03-15", tag: "Sustainability Pro" },
  { nickname: "EarthGuardian", score: 9, date: "2025-03-14" },
  { nickname: "ClimateHero", score: 8, date: "2025-03-14", tag: "Quick Learner" },
  { nickname: "PlanetProtector", score: 8, date: "2025-03-13" },
  { nickname: "EcoNinja", score: 7, date: "2025-03-13", tag: "Rising Star" },
  { nickname: "GreenPioneer", score: 7, date: "2025-03-12" },
  { nickname: "EarthAngel", score: 6, date: "2025-03-12" },
  { nickname: "ClimateWise", score: 6, date: "2025-03-11" },
  { nickname: "EcoChampion", score: 5, date: "2025-03-11" }
]

export default function EnvironmentalQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [nickname, setNickname] = useState("")

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    setShowExplanation(true)
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizComplete(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizComplete(false)
    setNickname("")
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600"
    if (score >= 6) return "text-yellow-600"
    return "text-orange-600"
  }

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader className="space-y-2">
          <CardTitle className="flex flex-wrap items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600 shrink-0" />
            <span className="text-xl sm:text-2xl">Environmental Knowledge Quiz</span>
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Test your understanding of climate change and sustainability
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!quizComplete ? (
            <div className="space-y-6">
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex flex-wrap justify-between text-sm">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>Score: {score}</span>
                </div>
                <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
              </div>

              {/* Question */}
              <div className="space-y-6">
                <h3 className="text-base sm:text-lg md:text-xl font-medium leading-tight">
                  {questions[currentQuestion].question}
                </h3>
                <div className="grid gap-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === option ? 
                        (option === questions[currentQuestion].correctAnswer ? "default" : "destructive") 
                        : "outline"}
                      className={`w-full min-h-[3rem] px-4 py-3 h-auto text-left whitespace-normal break-words ${
                        selectedAnswer ? 'cursor-default' : 'hover:bg-gray-100/50'
                      }`}
                      onClick={() => !selectedAnswer && handleAnswerSelect(option)}
                      disabled={!!selectedAnswer}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className="mt-0.5">
                          {selectedAnswer === option && (
                            option === questions[currentQuestion].correctAnswer ? 
                              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" /> :
                              <XCircle className="h-5 w-5 shrink-0 text-red-600" />
                          )}
                        </div>
                        <span className="flex-1 text-sm sm:text-base font-normal">{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>

                {/* Explanation */}
                {showExplanation && (
                  <div className={`p-4 rounded-lg ${
                    selectedAnswer === questions[currentQuestion].correctAnswer ?
                      "bg-green-50 border border-green-200" :
                      "bg-red-50 border border-red-200"
                  }`}>
                    <p className="text-sm sm:text-base">
                      {questions[currentQuestion].explanation}
                    </p>
                  </div>
                )}

                {/* Next button */}
                {selectedAnswer && (
                  <div className="flex justify-end">
                    <Button 
                      className="w-full sm:w-auto"
                      onClick={handleNextQuestion}
                    >
                      {currentQuestion < questions.length - 1 ? (
                        <span className="flex items-center gap-2">
                          Next Question
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      ) : (
                        "Complete Quiz"
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <Trophy className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Quiz Complete!</h3>
                <p className="text-gray-600 mb-4">
                  You scored{" "}
                  <span className={`font-bold ${getScoreColor(score)}`}>
                    {score} out of {questions.length}
                  </span>
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" onClick={resetQuiz}>
                    Try Again
                  </Button>
                  <Dialog open={showLeaderboard} onOpenChange={setShowLeaderboard}>
                    <DialogTrigger asChild>
                      <Button>View Leaderboard</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto p-4 sm:p-6">
                      <DialogHeader className="space-y-2">
                        <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
                          <Medal className="h-5 w-5 text-yellow-600" />
                          Global Quiz Leaderboard
                        </DialogTitle>
                        <DialogDescription className="text-sm sm:text-base">
                          See how you compare with other eco-warriors!
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-3 mt-4">
                        {mockLeaderboard.map((entry, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-gray-600 text-sm sm:text-base">#{index + 1}</span>
                              <div>
                                <p className="font-medium text-sm sm:text-base">{entry.nickname}</p>
                                {entry.tag && (
                                  <Badge variant="outline" className="text-xs">
                                    {entry.tag}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600 text-sm sm:text-base">{entry.score}/10</p>
                              <p className="text-xs text-gray-500">{entry.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 flex justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => {
                            const shareText = `🌍 I just scored ${score}/10 on the EcoPulse Environmental Quiz! Test your knowledge about climate change and sustainability.🌿 #EcoPulse #GoGreen #Sustainability`
                            if (navigator.share) {
                              navigator.share({
                                title: 'EcoPulse Environmental Quiz',
                                text: shareText,
                                url: window.location.href
                              })
                            } else {
                              navigator.clipboard.writeText(shareText)
                                .then(() => alert('Share text copied to clipboard!'))
                                .catch(err => console.error('Failed to copy:', err))
                            }
                          }}
                        >
                          <Share2 className="h-4 w-4" />
                          Share Score
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 