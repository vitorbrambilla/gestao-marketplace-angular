import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../services/user';
import { UserAuthService } from '../services/user-auth';

export const authGuard: CanActivateChildFn = async (route, state) => {
  const _userService = inject(UserService);
  const _userAuthService = inject(UserAuthService);
  const _router = inject(Router);

  const HAS_TOKEN = _userAuthService.getUserToken();

  if (!HAS_TOKEN) {
    return _router.navigate(['/login']);
  }

  try {
    await firstValueFrom(_userService.validateUser());

    return true;
  } catch (error) {
    return _router.navigate(['/login']);
  }
};
