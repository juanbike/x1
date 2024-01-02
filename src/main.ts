import { bootstrapApplication } from '@angular/platform-browser';
import { TablaJuntasComponent } from './app/componentes/tabla-juntas/tabla-juntas.component';
import {provideHttpClient} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';



bootstrapApplication(TablaJuntasComponent,   {
  providers: [provideHttpClient(), provideAnimations()],
}).catch((err) => console.error(err));


/*
bootstrapApplication(JsonplacerholderComponent,   {
  providers: [provideHttpClient(), provideAnimations()],
}).catch((err) => console.error(err));
*/
