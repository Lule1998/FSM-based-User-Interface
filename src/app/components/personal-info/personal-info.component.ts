import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrationStore } from '../../services/registration.store';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form class="space-y-6" (ngSubmit)="onSubmit()">
      <div class="space-y-4">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
          <input
            id="firstName"
            type="text"
            [(ngModel)]="formData.firstName"
            name="firstName"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
            required
          />
          @if (showErrors && !formData.firstName) {
            <p class="mt-1 text-sm text-red-600">First name is required</p>
          }
        </div>

        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            id="lastName"
            type="text"
            [(ngModel)]="formData.lastName"
            name="lastName"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
            required
          />
          @if (showErrors && !formData.lastName) {
            <p class="mt-1 text-sm text-red-600">Last name is required</p>
          }
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            [(ngModel)]="formData.email"
            name="email"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-2 px-3"
            required
          />
          @if (showErrors && !isValidEmail()) {
            <p class="mt-1 text-sm text-red-600">Please enter a valid email</p>
          }
        </div>
      </div>

      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent 
               rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 
               hover:bg-blue-700 focus:outline-none focus:ring-2 
               focus:ring-offset-2 focus:ring-blue-500"
      >
        Next
      </button>
    </form>
  `
})
export class PersonalInfoComponent {
  private store = inject(RegistrationStore);

  formData = {
    firstName: '',
    lastName: '',
    email: ''
  };

  showErrors = false;

  isValidEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email);
  }

  onSubmit() {
    this.showErrors = true;

    if (this.formData.firstName && 
        this.formData.lastName && 
        this.isValidEmail()) {
      this.store.updateData('personal', this.formData);
      this.store.next();
    }
  }
}