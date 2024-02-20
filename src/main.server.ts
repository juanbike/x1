import { bootstrapApplication } from '@angular/platform-browser';

import { config } from './app/app.config.server';
import { TablaJuntasComponent } from './app/componentes/tabla-juntas/tabla-juntas.component';
import { CrudSoldadoresComponent } from './app/componentes/crud-soldadores/crud-soldadores.component';


/*
const bootstrap = () => bootstrapApplication(TablaJuntasComponent, config);
*/


const bootstrap = () => bootstrapApplication(CrudSoldadoresComponent, config);

/*
const bootstrap = () => bootstrapApplication(JsonplacerholderComponent, config);
*/

export default bootstrap;
