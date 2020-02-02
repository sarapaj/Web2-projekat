using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using WebApp.Models;

[assembly: OwinStartup(typeof(WebApp.Startup))]

namespace WebApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);
            app.MapSignalR();
            ConfigureAuth(app);
        }
    }

    public class SocketHub : Hub
    {
        public void SocketStart(List<Coordinate> coordinates)
        {
            foreach(var coord in coordinates)
            {
                Clients.All.printInBrowserConsole((coord.x).ToString(), (coord.y).ToString());
                System.Threading.Thread.Sleep(2000);
            }  
        }
    }
}
