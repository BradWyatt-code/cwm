import { RenderMode, ServerRoute } from '@angular/ssr';

const serverRoutes: ServerRoute[] = [
  {
    path: 'work/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'edit/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

export default serverRoutes;
