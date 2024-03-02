import { bootstrapApplication } from '@angular/platform-browser';
import { TablaJuntasComponent } from './app/componentes/tabla-juntas/tabla-juntas.component';
import {provideHttpClient} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CrudSoldadoresComponent } from './app/componentes/crud-soldadores/crud-soldadores.component';
import { CrudSoldaduraComponent } from './app/componentes/crud-soldadura/crud-soldadura.component';



/*
bootstrapApplication(TablaJuntasComponent,   {
  providers: [provideHttpClient(), provideAnimations()],
}).catch((err) => console.error(err));
*/


/*
bootstrapApplication(CrudSoldadoresComponent,   {
  providers: [provideHttpClient(), provideAnimations()],
}).catch((err) => console.error(err));
*/


/*
bootstrapApplication(JsonplacerholderComponent,   {
  providers: [provideHttpClient(), provideAnimations()],
}).catch((err) => console.error(err));
*/

bootstrapApplication(CrudSoldaduraComponent,   {
  providers: [provideHttpClient(), provideAnimations()],
}).catch((err) => console.error(err));
