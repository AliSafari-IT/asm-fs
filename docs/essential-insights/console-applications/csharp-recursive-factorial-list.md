# Practice Problem: Recursive Calculation of Factorial and List Manipulation

## Problem Statement
Create a console application in C# that calculates the factorial of a number recursively and performs operations on a list of numbers. The program should allow the user to input numbers, calculate their factorials, and display all numbers and their factorials. Additionally, the program should allow filtering of numbers based on specific criteria (e.g., numbers greater than a certain value).

### Requirements
1. Prompt the user to input a list of integers.
2. Allow the user to calculate the factorial of a specific number from the list using a recursive function.
3. Display all numbers in the list along with their factorials.
4. Provide an option to filter and display numbers greater than a user-specified value.
5. Use an **`if` statement** to handle invalid input (e.g., negative numbers for factorial).
6. Use a **`List`** to store the numbers and their factorials.
7. Demonstrate proper use of **recursion** for factorial calculation.

---

## Step-by-Step Guide

### Step 1: Set Up the Console Application
1. Open Visual Studio or your preferred IDE.
2. Create a new Console Application project in C#.
3. Name the project `FactorialListApp`.

### Step 2: Define the Problem Logic
- Plan the following components:
  - A method to recursively calculate the factorial of a number.
  - A list to store user input.
  - A loop to interact with the user.
  - Filtering logic to display numbers based on user criteria.

### Step 3: Implement the Main Program Logic

#### **1. Prompt for User Input**
- Ask the user to enter numbers separated by commas.
- Split the input string into a list of integers.

#### **2. Calculate Factorials Using Recursion**
- Write a recursive method `CalculateFactorial` to compute the factorial of a number.

#### **3. Display All Numbers and Factorials**
- Use a `foreach` loop to iterate through the list and display each number with its factorial.

#### **4. Filtering Logic**
- Ask the user to specify a filter condition (e.g., numbers greater than X).
- Use an **`if` statement** and LINQ to filter the list.

### Step 4: Write the Code

#### **Code Structure**
```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Enter a list of positive integers separated by commas:");
        string input = Console.ReadLine();

        // Parse input into a list
        List<int> numbers = ParseInput(input);

        // Calculate and display factorials
        DisplayFactorials(numbers);

        // Filtering logic
        Console.WriteLine("Enter a value to filter numbers greater than it:");
        int filterValue;
        if (int.TryParse(Console.ReadLine(), out filterValue))
        {
            FilterAndDisplay(numbers, filterValue);
        }
        else
        {
            Console.WriteLine("Invalid input for filtering.");
        }

        Console.WriteLine("Press any key to exit...");
        Console.ReadKey();
    }

    static List<int> ParseInput(string input)
    {
        var numbers = new List<int>();
        foreach (var item in input.Split(','))
        {
            if (int.TryParse(item.Trim(), out int num) && num >= 0)
            {
                numbers.Add(num);
            }
            else
            {
                Console.WriteLine($"Invalid number skipped: {item.Trim()}");
            }
        }
        return numbers;
    }

    static void DisplayFactorials(List<int> numbers)
    {
        Console.WriteLine("\nNumber - Factorial:");
        foreach (var num in numbers)
        {
            Console.WriteLine($"{num} - {CalculateFactorial(num)}");
        }
    }

    static long CalculateFactorial(int n)
    {
        if (n == 0 || n == 1) return 1;
        return n * CalculateFactorial(n - 1);
    }

    static void FilterAndDisplay(List<int> numbers, int filterValue)
    {
        var filteredNumbers = numbers.Where(num => num > filterValue).ToList();
        Console.WriteLine($"\nNumbers greater than {filterValue}:");
        foreach (var num in filteredNumbers)
        {
            Console.WriteLine(num);
        }
    }
}
```

### Step 5: Test the Application
1. Run the program.
2. Input a list of integers like `1, 2, 3, 4, 5`.
3. Verify that the program calculates and displays factorials.
4. Test the filtering functionality with various values.
5. Check how the program handles invalid input (e.g., negative numbers or non-integer values).

---

## Example Output
### Input
```
Enter a list of positive integers separated by commas:
1, 2, 3, 4, 5
```
### Output
```
Number - Factorial:
1 - 1
2 - 2
3 - 6
4 - 24
5 - 120

Enter a value to filter numbers greater than it:
3

Numbers greater than 3:
4
5
```

---

## Conclusion
This exercise helped practice:
1. **`if` statements** to handle conditions and errors.
2. **`List` operations** for parsing, filtering, and displaying data.
3. **Recursion** to calculate factorials effectively.

### Next Steps
Continue to expand this program by implementing additional features, 
    - such as sorting the list, 
    - adding the sum of the list, or 
    - finding the smallest and largest numbers!
