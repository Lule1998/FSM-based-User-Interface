import { Injectable, signal, computed } from '@angular/core';
import { FormState, RegistrationData } from '../models/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationStore {
  private state = signal<FormState>('personal');
  private formData = signal<RegistrationData>({
    personal: { firstName: '', lastName: '', email: '' },
    account: { username: '', password: '' },
    preferences: { notifications: false, theme: 'light' }
  });

  readonly currentState = computed(() => this.state());
  readonly currentData = computed(() => this.formData());

  updateData(section: keyof RegistrationData, data: any) {
    this.formData.update(current => ({
      ...current,
      [section]: { ...current[section], ...data }
    }));
  }

  next() {
    const stateMap: Record<FormState, FormState> = {
      'personal': 'account',
      'account': 'preferences',
      'preferences': 'review',
      'review': 'success',
      'success': 'success',
      'error': 'review'
    };
    
    this.state.set(stateMap[this.currentState()]);
  }

  back() {
    const stateMap: Record<FormState, FormState> = {
      'account': 'personal',
      'preferences': 'account',
      'review': 'preferences',
      'personal': 'personal',
      'success': 'success',
      'error': 'error'
    };
    
    this.state.set(stateMap[this.currentState()]);
  }
}