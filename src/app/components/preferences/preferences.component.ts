import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrationStore } from '../../services/registration.store';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form class="space-y-6" (ngSubmit)="onSubmit()">
      <div class="space-y-4">
        <div class="flex items-center">
          <input
            id="notifications"
            type="checkbox"
            [(ngModel)]="formData.notifications"
            name="notifications"
            class="h-4 w-4 text-blue-600 rounded"
          />
          <label for="notifications" class="ml-2 block text-sm text-gray-700">
            Enable notifications
          </label>
        </div>

        <div>
          <label for="theme" class="block text-sm font-medium text-gray-700">Theme</label>
          <select
            id="theme"
            [(ngModel)]="formData.theme"
            name="theme"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <div class="flex justify-between">
        <button
          type="button"
          (click)="onBack()"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 
                 rounded-md hover:bg-gray-200"
        >
          Back
        </button>
        <button
          type="submit"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                 rounded-md hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </form>
  `
})
export class PreferencesComponent {
  private store = inject(RegistrationStore);

  formData = {
    notifications: false,
    theme: 'light' as const
  };

  onSubmit() {
    this.store.updateData('preferences', this.formData);
    this.store.next();
  }

  onBack() {
    this.store.back();
  }
}