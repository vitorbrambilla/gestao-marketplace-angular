import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../services/user';
import { UserAuthService } from '../services/user-auth';

export const loginAuthGuard: CanActivateFn = async (route, state) => {
  const _userService = inject(UserService);
  const _userAuthService = inject(UserAuthService);
  const _router = inject(Router);

  const HAS_TOKEN = _userAuthService.getUserToken();

  if (!HAS_TOKEN) return true;

  try {
    await firstValueFrom(_userService.validateUser());

    return _router.navigate(['/products']);
  } catch (error) {
    return true;
  }
};
