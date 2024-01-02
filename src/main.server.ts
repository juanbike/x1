import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { TablaJuntasComponent } from './app/componentes/tabla-juntas/tabla-juntas.component';



const bootstrap = () => bootstrapApplication(TablaJuntasComponent, config);


/*
const bootstrap = () => bootstrapApplication(JsonplacerholderComponent, config);
*/

export default bootstrap;
