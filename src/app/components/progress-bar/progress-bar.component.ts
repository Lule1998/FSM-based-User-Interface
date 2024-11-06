import { Component, inject } from '@angular/core';
import { RegistrationStore } from '../../services/registration.store';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  template: `
    <div class="mb-8">
      <div class="flex justify-between mb-2">
        @for (step of steps; track step.id) {
          <div 
            class="flex items-center" 
            [class.text-blue-600]="store.currentState() === step.id"
          >
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center"
              [class.bg-blue-500]="isCompleted(step.id)"
              [class.bg-gray-200]="!isCompleted(step.id)"
              [class.text-white]="isCompleted(step.id)"
            >
              {{step.number}}
            </div>
            <span class="ml-2 hidden sm:inline">{{step.label}}</span>
          </div>
        }
      </div>
      
      <div class="h-2 bg-gray-200 rounded">
        <div
          class="h-full bg-blue-500 rounded transition-all duration-300"
          [style.width.%]="store.progress()"
        ></div>
      </div>
    </div>
  `
})
export class ProgressBarComponent {
  protected store = inject(RegistrationStore);
  
  steps = [
    { id: 'personal', number: 1, label: 'Personal' },
    { id: 'account', number: 2, label: 'Account' },
    { id: 'preferences', number: 3, label: 'Preferences' },
    { id: 'review', number: 4, label: 'Review' }
  ];

  isCompleted(stepId: string): boolean {
    const currentIndex = this.steps.findIndex(s => s.id === this.store.currentState());
    const stepIndex = this.steps.findIndex(s => s.id === stepId);
    return stepIndex <= currentIndex;
  }
}