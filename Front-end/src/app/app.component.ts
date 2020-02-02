import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Projekat';

  constructor() {

    // const hubProxy = window['hubProxy'];
    // const hubConnection = window['hubConnection'];

    // hubConnection.hub.start().done(function () {
    //   console.log('Connected')
    //   hubProxy.server.newSocketEvent('pliiz', 'radiii')
    //   setTimeout(() => {
    //     hubConnection.hub.stop()
    //     console.log('Disconnected')
    //   }, 3000);
    // });

    // hubProxy.client.printInBrowserConsole = function (name, message) { 
    //   console.log(name + ' ' + message);
    // };
  }
}
