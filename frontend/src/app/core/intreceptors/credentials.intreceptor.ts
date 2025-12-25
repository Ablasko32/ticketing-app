import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';

export function credentialsIntreceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  if (req.url.includes(environment.apiUrl)) {
    req = req.clone({
      withCredentials: true,
    });
  }

  return next(req);
}
