# Integrating MySQL and MongoDB in a React TypeScript .NET C# Web App

Date 2024-11-10 11:00:09
Updated 2024-12-31 14:10:00

## Introduction
This document provides a guide on how to integrate MySQL and MongoDB into a React TypeScript application backed by a .NET C# web service. We will cover the necessary setup, code snippets, and best practices.

## Prerequisites
- Basic knowledge of React, TypeScript, and .NET C#.
- MySQL and MongoDB installed and running.
- Node.js and npm installed for the frontend.

## Setting Up the Backend (.NET C#)

1. **Install Required Packages**  
   For MySQL, you need to install `MySql.Data` and for MongoDB, install `MongoDB.Driver` via NuGet Package Manager.
   
   ```bash
   dotnet add package MySql.Data
   dotnet add package MongoDB.Driver
   ```

2. **Create Database Contexts**  
   Create a context for MySQL and MongoDB.
   
   ```csharp
   // MySQL Context
   public class MySqlDbContext : DbContext
   {
       public MySqlDbContext(DbContextOptions<MySqlDbContext> options) : base(options) { }

       public DbSet<Item> Items { get; set; }
   }

   // MongoDB Context
   public class MongoDbContext
   {
       private readonly IMongoDatabase _database;

       public MongoDbContext(string connectionString)
       {
           var client = new MongoClient(connectionString);
           _database = client.GetDatabase("YourDatabaseName");
       }

       public IMongoCollection<Item> Items => _database.GetCollection<Item>("Items");
   }
   ```

3. **Configure Services in Startup**  
   Configure the services in `Startup.cs`.
   
   ```csharp
   public void ConfigureServices(IServiceCollection services)
   {
       services.AddDbContext<MySqlDbContext>(options =>
           options.UseMySQL(Configuration.GetConnectionString("MySqlConnection")));

       services.AddSingleton<MongoDbContext>(new MongoDbContext(Configuration.GetConnectionString("MongoDbConnection")));
   }
   ```

## Setting Up the Frontend (React TypeScript)

1. **Install Axios**  
   Use Axios to make HTTP requests to your backend.
   
   ```bash
   npm install axios
   ```

2. **Create API Service**  
   Create a service to interact with your backend.
   
   ```typescript
   // apiService.ts
   import axios from 'axios';

   const API_URL = 'http://localhost:5000/api'; // Adjust as necessary

   export const fetchItemsFromMySql = async () => {
       const response = await axios.get(`${API_URL}/mysql/items`);
       return response.data;
   };

   export const fetchItemsFromMongoDb = async () => {
       const response = await axios.get(`${API_URL}/mongodb/items`);
       return response.data;
   };
   ```

3. **Using the API in a Component**  
   Use the API service in your React component.
   
   ```typescript
   // ItemsList.tsx
   import React, { useEffect, useState } from 'react';
   import { fetchItemsFromMySql, fetchItemsFromMongoDb } from './apiService';

   const ItemsList: React.FC = () => {
       const [mysqlItems, setMysqlItems] = useState([]);
       const [mongodbItems, setMongodbItems] = useState([]);

       useEffect(() => {
           const getData = async () => {
               const mysqlData = await fetchItemsFromMySql();
               const mongoData = await fetchItemsFromMongoDb();
               setMysqlItems(mysqlData);
               setMongodbItems(mongoData);
           };
           getData();
       }, []);

       return (
           <div>
               <h1>MySQL Items</h1>
               <ul>
                   {mysqlItems.map(item => <li key={item.id}>{item.name}</li>)}
               </ul>
               <h1>MongoDB Items</h1>
               <ul>
                   {mongodbItems.map(item => <li key={item.id}>{item.name}</li>)}
               </ul>
           </div>
       );
   };

   export default ItemsList;
   ```

## Conclusion
This document provides a basic framework for integrating MySQL and MongoDB into a React TypeScript .NET C# web application. By following these steps, you can set up both databases and retrieve data in your frontend application.
