import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ViewTaskListComponent } from './view-task-list/view-task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, 
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'tasks', component: ViewTaskListComponent },  
    { path: 'tasks/create', component: TaskFormComponent }, 
    { path: 'tasks/edit/:taskid', component: TaskFormComponent },
];
