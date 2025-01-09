SELECT * FROM __EFMigrationsHistory;

use asmdb;
-- drop DATABASE asmdb;
CREATE DATABASE asmdb;

show tables;
select * from users;
select * from aspnetusers;

DELETE from aspnetusers where email = 'alex.johnson@example.com';
DELETE from aspnetusers where email = 'asm@example.com';
DELETE from aspnetusers where email = 'jane.smith@example.com';

-- update tables using dotnet ef in command line
dotnet ef migrations add INITIALCREATE 
dotnet ef migrations add ApplicationUserUpdated --project apps/backends/ASafariM.Server --startup-project apps/backends/ASafariM.Server

dotnet ef database update
