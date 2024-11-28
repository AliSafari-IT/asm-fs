namespace ASafariM.Server.ConfServices
{
    public class ConfServices
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSwaggerGen();
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
        }

    }
}
