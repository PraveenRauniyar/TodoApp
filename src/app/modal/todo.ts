export class Todo {
  todoTitle: string;
  description: string;
  reminder: string;

  constructor(title,description,reminder){
    this.todoTitle = title;
    this.description = description;
    this.reminder = reminder;
  }

}
