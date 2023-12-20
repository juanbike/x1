import { bootstrapApplication } from '@angular/platform-browser';
import { TablaJuntasComponent } from './app/componentes/tabla-juntas/tabla-juntas.component';
import {provideHttpClient} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { JsonplacerholderComponent } from './app/componentes/jsonplacerholder/jsonplacerholder.component';


bootstrapApplication(TablaJuntasComponent,   {
  providers: [provideHttpClient(), provideAnimations()],
}).catch((err) => console.error(err));


/*
bootstrapApplication(JsonplacerholderComponent,   {
  providers: [provideHttpClient(), provideAnimations()],
}).catch((err) => console.error(err));
*/
