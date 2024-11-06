import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrationStore } from '../../services/registration.store';

@Component({
  selector: 'app-account-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form class="space-y-6" (ngSubmit)="onSubmit()">
      <div class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="username"
            type="text"
            [(ngModel)]="formData.username"
            name="username"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            [(ngModel)]="formData.password"
            name="password"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
            required
          />
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
export class AccountSetupComponent {
  private store = inject(RegistrationStore);

  formData = {
    username: '',
    password: ''
  };

  onSubmit() {
    if (this.formData.username && this.formData.password) {
      this.store.updateData('account', this.formData);
      this.store.next();
    }
  }

  onBack() {
    this.store.back();
  }
}