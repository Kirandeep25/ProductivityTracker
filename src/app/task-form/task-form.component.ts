import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskServiceService } from '../task-service.service';
import { AuthServiceService } from '../auth-service.service';
import { Task } from '../task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true, // ✅ Required for standalone components
  imports: [FormsModule, CommonModule, RouterModule], // ✅ Correctly added imports
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    taskid: 0,
    userid: 0,
    title: '',
    desc: '',
    duedate: '',
    taskstatus: ''
  };

  isEditMode = false;
  userid: number = 0;
  taskid: number | null = null;

  constructor(
    private taskService: TaskServiceService,
    private authService: AuthServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    this.userid = user.userid;
    this.task.userid = this.userid;

    const taskIdParam = this.route.snapshot.paramMap.get('taskid');
    this.taskid = taskIdParam ? Number(taskIdParam) : null;

    if (this.taskid && !isNaN(this.taskid)) {
      this.isEditMode = true;
      this.loadTask();
    }
  }

  loadTask(): void {
    this.taskService.getTasks(this.userid).subscribe((tasks) => {
      const existingTask = tasks.find((t) => t.taskid === this.taskid);
      if (existingTask) {
        this.task = existingTask;
      } else {
        alert('Task not found!');
        this.router.navigate(['/tasks']);
      }
    });
  }

  saveTask(): void {
    if (this.isEditMode && this.taskid) {
      this.taskService.updateTask(this.userid, this.taskid, this.task).subscribe(() => {
        alert('Task updated successfully!');
        this.router.navigate(['/tasks']);
      });
    } else {
      if (!this.task.taskid) {
        alert('Please enter a Task ID.');
        return;
      }
      this.taskService.createTask(this.userid, this.task).subscribe(() => {
        alert('Task created successfully!');
        this.router.navigate(['/tasks']);
      });
    }
  }

  navigateToTasks(): void {
    this.router.navigate(['/tasks']);
  }
}

