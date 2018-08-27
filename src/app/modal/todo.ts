export class Todo {
  todoTitle: string;
  description: string;
  reminder: string;
  todoId: LongRange;

  constructor(title, description, reminder) {
    this.todoTitle = title;
    this.description = description;
    this.reminder = reminder;
  }

}
