import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxGanttModule, DxTemplateModule, DxPieChartModule } from 'devextreme-angular';
import { Service, Task, Dependency, Resource, ResourceAssignment, ProgressItem } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Service],
  preserveWhitespaces: true
})
export class AppComponent {
  title = 'Gantt-New';
  tasks: Task[];
  dependencies: Dependency[];
  resources: Resource[];
  resourceAssignments: ResourceAssignment[];
  selectedRowKey = 1;
  currentTask = new Task();
  currentTaskResources: Resource[];
  currentProgress: ProgressItem[];
  OnSelectionChanged(e) {
    this.processSelection();
  }
  constructor(service: Service) {
    this.tasks = service.getTasks();
    this.dependencies = service.getDependencies();
    this.resources = service.getResources();
    this.resourceAssignments = service.getResourceAssignments();
    this.processSelection();
  }
  processSelection() {
    this.currentTask = this.tasks.find(p => p.id == this.selectedRowKey);
    this.currentProgress = [
      { 'text': "completed", 'val': this.currentTask.progress },
      { 'text': "not completed", 'val': 100 - this.currentTask.progress }
    ]; //need at least two items to render a chart
    this.currentTaskResources = [];
    let taskResourceAssignments = this.resourceAssignments.filter(p => p.taskId == this.currentTask.id);
    for (var i = 0; i < taskResourceAssignments.length; i++) {
      let resource = this.resources.find(p => p.id == taskResourceAssignments[i].resourceId);
      this.currentTaskResources.push(resource);
    }
  }

}
@NgModule({
  imports: [
    BrowserModule,
    DxGanttModule,
    DxTemplateModule,
    DxPieChartModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
