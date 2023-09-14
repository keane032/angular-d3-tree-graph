import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-d3-tree-graph';


  treeData = {
    name: 'Título',
    total: 'Valor',
    children: [
      { 
        name: 'Título',
        total: 'Valor',
        children: [{ 
          name: 'Título',
          total: 'Valor', 
        }, { 
          name: 'Título',
          total: 'Valor',
          children: [{ 
            name: 'Título',
            total: 'Valor',
          }] 
        }] 
      },

      { 
        name: 'Título',
        total: 'Valor',
        children: [{ 
          name: 'Título',
          total: 'Valor', 
        }, { 
          name: 'Título',
          total: 'Valor',
        },
         { 
          name: 'Título',
          total: 'Valor',
          children: [{ 
            name: 'Título',
            total: 'Valor',
          }, { 
            name: 'Título',
            total: 'Valor',
          }] 
        },
        
      ] },
      { 
        name: 'Título',
        total: 'Valor',
        children: [{ 
          name: 'Título',
          total: 'Valor',
           children: [{ 
            name: 'Título',
            total: 'Valor',
        }, { 
          name: 'Título',
          total: 'Valor',
        }] 
        },
         { 
          name: 'Título',
          total: 'Valor', 
        }] },
    ]
  };
}
