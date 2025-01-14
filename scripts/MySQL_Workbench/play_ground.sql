SELECT * FROM __EFMigrationsHistory;

use asmdb;
show tables;
select * from users;
select * from asmdb.aspnetusers;

DELETE from aspnetusers where email = 'alex.johnson@example.com';
DELETE from aspnetusers where email = 'asm@example.com';
DELETE from aspnetusers where email = 'jane.smith@example.com';

-- update tables using dotnet ef in command line
dotnet ef migrations add ApplicationUserUpdated
dotnet ef database update
