// src/app/app.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { AccountSetupComponent } from './components/account-setup/account-setup.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { ReviewComponent } from './components/review/review.component';
import { RegistrationStore } from './services/registration.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    PersonalInfoComponent,
    AccountSetupComponent,
    PreferencesComponent,
    ReviewComponent
  ],
  template: `
    <main class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 class="text-2xl font-bold text-center mb-6">
          Registration Form
        </h1>
        
        @switch (store.currentState()) {
          @case ('personal') {
            <app-personal-info />
          }
          @case ('account') {
            <app-account-setup />
          }
          @case ('preferences') {
            <app-preferences />
          }
          @case ('review') {
            <app-review />
          }
        }
      </div>
    </main>
  `
})
export class AppComponent {
  protected store = inject(RegistrationStore);
}