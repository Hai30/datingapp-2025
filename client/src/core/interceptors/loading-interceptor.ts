import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../services/busy-service';
import { finalize } from 'rxjs/internal/operators/finalize';
import { delay } from 'rxjs/internal/operators/delay';
import { tap } from 'rxjs/internal/operators/tap';
import { of } from 'rxjs';

const cache = new Map<string, HttpEvent<unknown>>();

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  busyService.busy();

  if (req.method === 'GET') {
    const cachedResponse = cache.get(req.url);
    if (cachedResponse) {
      return of(cachedResponse).pipe(
        finalize(() => {
          busyService.idle();
        })
      );
    }
  }

  return next(req).pipe(
    delay(500),
    tap( response => {
      cache.set(req.url, response);
    }),
    finalize(() => {
      busyService.idle();
    })
  )
};
