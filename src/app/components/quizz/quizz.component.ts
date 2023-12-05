import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:String = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  quationsMaxIndex:number = 0 

  finished:boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.quationsMaxIndex = this.questions.length
    }
  }

  playerChoose(value:string){
    this.answers.push(value)
  }

  async nextStep(){
    this.questionIndex+=1
    if (this.quationsMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true 
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previus, current, i, arr) => {
      if (arr.filter(item => item === previus).length > arr.filter(item => item === current).length) {
        return previus
      } else {
        return current
      }
    })
    return result
  }

}
