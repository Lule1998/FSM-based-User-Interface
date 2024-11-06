import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationStore } from '../../services/registration.store';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div class="space-y-4">
        <div class="border rounded-lg p-4">
          <h3 class="font-medium mb-2">Personal Information</h3>
          <p>Name: {{data().personal.firstName}} {{data().personal.lastName}}</p>
          <p>Email: {{data().personal.email}}</p>
        </div>

        <div class="border rounded-lg p-4">
          <h3 class="font-medium mb-2">Account Details</h3>
          <p>Username: {{data().account.username}}</p>
          <p>Password: ••••••••</p>
        </div>

        <div class="border rounded-lg p-4">
          <h3 class="font-medium mb-2">Preferences</h3>
          <p>Notifications: {{data().preferences.notifications ? 'Enabled' : 'Disabled'}}</p>
          <p>Theme: {{data().preferences.theme}}</p>
        </div>
      </div>

      <div class="flex justify-between">
        <button
          (click)="onBack()"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 
                 rounded-md hover:bg-gray-200"
        >
          Back
        </button>
        <button
          (click)="onSubmit()"
          class="px-4 py-2 text-sm font-medium text-white bg-green-600 
                 rounded-md hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  `
})
export class ReviewComponent {
  private store = inject(RegistrationStore);
  protected data = this.store.currentData;

  onSubmit() {
    this.store.next();
  }

  onBack() {
    this.store.back();
  }
}