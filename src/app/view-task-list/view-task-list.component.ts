import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../task';
import { TaskServiceService } from '../task-service.service';
import { AuthServiceService } from '../auth-service.service';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { CommonModule } from '@angular/common';
import{HttpClient} from '@angular/common/http';
import { TaskList } from '../task-list';
@Component({
  selector: 'app-view-task-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './view-task-list.component.html',
  styleUrl: './view-task-list.component.css'
})

export class ViewTaskListComponent implements OnInit {
  taskList: TaskList = new TaskList();
  userid: number | null = null;

  constructor(
    private taskService: TaskServiceService,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      alert('User not found. Please log in.');
      this.router.navigate(['/login']); 
      return;
    }

    const currentUser = JSON.parse(storedUser);
    this.userid = currentUser.userid;

    if (!this.userid) {
      console.error("User ID is missing!");
      return;
    }

    this.fetchTasks();
  }

  fetchTasks(): void {
    if (!this.userid) return;
    
    this.taskService.getTasks(this.userid).subscribe({
      next: (tasks) => {
        this.taskList.tasks = tasks;
        console.log('Fetched tasks:', tasks);
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  addTask(): void {
    this.router.navigate(['/tasks/create']);
  }

  editTask(taskid: number): void {
    this.router.navigate([`/tasks/edit/${taskid}`], { queryParams: { taskid } });
  }

  deleteTask(taskid: number): void {
    if (!this.userid) return;

    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.userid, taskid).subscribe({
        next: () => {
          this.taskList.tasks = this.taskList.tasks.filter(task => task.taskid !== taskid);
          console.log('Task deleted successfully');
        },
        error: (err) => console.error('Error deleting task:', err)
      });
    }
  }
}