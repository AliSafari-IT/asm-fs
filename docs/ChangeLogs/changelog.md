# Change Log

## [Unreleased]

### Updates

- **Pandas Package Overview**: Updated the overview to a more friendly and engaging tone, including an example of how to use pandas for data manipulation.
  - **Code Snippet**:
    ```python
    import pandas as pd
    
    # Load the data into a DataFrame
    df = pd.read_csv('sales_data.csv')
    
    # Display the DataFrame
    print(df)
    
    # Calculate total sales
    total_sales = df['Sales'].sum()
    print(f'Total Sales: {total_sales}')
    ```

- **IStack Interface**: Added new properties to the `IStackItem` interface to include topics and links.
  - **Code Snippet**:
    ```typescript
    export interface IStackItem {
      name: string;
      slug?: string;
      color: string;
      textColor: string;
      icon?: React.ReactElement;
      link?: string | string[];
      topics?: ITopic[];
    }
    ```

- **StacksPage Navigation**: Updated the navigation function to handle topics and improve routing.
  - **Code Snippet**:
    ```typescript
    function navigateToProjects(selected?: IStackItem, category?: string): void {
      const topics = selected?.topics;
      if(topics && topics.length > 0) {
        const lnk = topics.map(t => getSlug(t.name)).join('-');
        window.location.href = `/tech-docs/${category}/${topics}/${lnk}`;
      }
      window.location.href = `/tech-docs/${category}/${getSlug(selected?.name)}`;
    }
    ```

- **Stacks Data**: Added new stack items for React D3 and Data-Driven UI with descriptions and topics.
  - **Code Snippet**:
    ```typescript
    {
      slug: 'react-d3',
      name: 'React D3',
      description: 'Create interactive and dynamic data visualizations with D3.js and React.',
      color: '#2196F3', textColor: '#FFFFFF'
    },
    {
      slug: 'data-driven-ui',
      name: 'Data-Driven UI',
      description: 'Craft user interfaces that respond to data changes with ease.',
      topics: [
        {
          name: `Data Visualization`,
          link: 'https://github.com/hal9ai/awesome-dataviz?tab=readme-ov-file',
        }, {
          name: 'D3.js',
          link: 'https://d3js.org/',
        }],
      color: '#2196F3', textColor: '#FFFFFF'
    },
    ```

---

*End of Change Log*
