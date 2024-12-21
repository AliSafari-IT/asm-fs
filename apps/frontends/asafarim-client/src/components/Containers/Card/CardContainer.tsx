import React, { useEffect, useState } from 'react';
import {
  Button,
  FluentProvider,
  makeStyles,
  Text,
  webDarkTheme,
  webLightTheme,
} from '@fluentui/react-components';
import { DashCard } from './DashCard';
import { TextField } from '@fluentui/react';
import { ArrowLeft24Regular, ArrowRight24Regular } from '@fluentui/react-icons';
import { ITopic } from '../../../interfaces/ITopic';
import { ITag } from '../../../interfaces/ITag';
import { Add24Regular as IconAdd } from "@fluentui/react-icons";
import { useNavigate } from 'react-router-dom';
import dashboardServices from '../../../api/entityServices';
import Loading from '../../Loading/Loading';
import { useTheme } from '@/contexts/ThemeContext';

const useStyles = makeStyles({
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '20px',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
});

const CardContainer: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme().theme === 'dark' ? webDarkTheme : webLightTheme;

  const [topics, setTopics] = useState<ITopic[]>();
  const [currentTopicsPage, setCurrentTopicsPage] = useState<number>(1);
  const [currentTagsPage, setCurrentTagsPage] = useState<number>(1);
  const [tags, setTags] = useState<ITag[]>();
  const [inputPage, setInputPage] = useState<string>('');
  const cardsPerPage = 3;
  const navigate = useNavigate();
  useEffect(() => {
    const loadTopics = async () => {
      try {
        const fetchedTopics = await dashboardServices.fetchEntities( 'topic');
        setTopics(fetchedTopics.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    const loadTags = async () => {
      try {
        const fetchedTags = await dashboardServices.fetchEntities('tag');
        setTags(fetchedTags.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    loadTags();
    loadTopics();
  }, []);

  const totalTopicCards = topics?.length;
  const totalTopicPages = totalTopicCards? Math.ceil(totalTopicCards / cardsPerPage): 0;

  const totalTagCards = tags?.length;
  const totalTagPages = totalTagCards? Math.ceil(totalTagCards / cardsPerPage): 0;

  // Determine the topics to display on the current page
  const startTopicIndex = (currentTopicsPage - 1) * cardsPerPage;
  const currentTopics = topics?.slice(startTopicIndex, startTopicIndex + cardsPerPage);

  // Determine the tags to display on the current page
  const startTagIndex = (currentTagsPage - 1) * cardsPerPage;
  const currentTags = tags?.slice(startTagIndex, startTagIndex + cardsPerPage);

  const goToNextPage = (cardType = 'topic') => {
    switch (cardType) {
      case 'tag':
        setCurrentTagsPage((prev) => Math.min(prev + 1, totalTagPages));
        break;
      default:
        setCurrentTopicsPage((prev) => Math.min(prev + 1, totalTopicPages));
        break;
    }

  };

  const goToPreviousPage = (cardType = 'topic') => {
    switch (cardType) {
      case 'tag':
        setCurrentTagsPage((prev) => Math.max(prev - 1, 1));
        break;
      default:
        setCurrentTopicsPage((prev) => Math.max(prev - 1, 1));
        break;
    }

  };

  const goToPage = (cardType = 'topic') => {
    const pageNumber = parseInt(inputPage, 10);
    let totalPages;
  
    switch (cardType) {
      case 'topic':
        totalPages = totalTopicPages;
        break;
      case 'tag':
        totalPages = totalTagPages;
        break;
      default:
        totalPages = totalTopicPages;
        break;
    }
  
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      switch (cardType) {
        case 'topic':
          setCurrentTopicsPage(pageNumber);
          setInputPage('');
          break;
        case 'tag':
          setCurrentTagsPage(pageNumber);
          setInputPage('');
          break;
      }
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}.`);
    }
  };
  

  return (
    <FluentProvider theme={theme}>
      <div className={classes.container}>
      <h1><span>Topics </span> <Button icon={<IconAdd fontSize={16} />} onClick={() => navigate('/topics/add')} title='Add New Topic' /></h1>
        <div className={classes.cardsWrapper}>
          {currentTopics? currentTopics.map((topic, index) => (
            <DashCard
              key={index}
              modelName='topic'
              modelId={topic.id}
              name={topic.name}
              title={topic.name}
              content={topic.technologyCategory}
              description={topic.description}
              imgPath="react1.svg"
              imgAlt={topic.name}
              
            />
          )):
          <Loading size={50} color="skyblue" />}
        </div>
        {totalTopicPages > 1 && (
          <div className={classes.pagination}>
            <ArrowLeft24Regular onClick={() => goToPreviousPage('topic')} style={{ cursor: 'pointer' }} title='Previous Page'/>
            <Text align='center' weight='regular' size={400} style={{ margin: '5px' , color: 'darkgrey' }}>
               {currentTopicsPage}
            </Text>
            <ArrowRight24Regular onClick={() => goToNextPage('topic')} style={{ cursor: 'pointer' }}  title='Next Page'/>
            <TextField
              value={inputPage}
              onChange={(e) => setInputPage((e.target as HTMLInputElement).value)}
              styles={{
                root: { width: '35px', margin: '10px', color: 'skyblue' },
                field: { textAlign: 'center', fontWeight: 'bold', verticalAlign: 'middle', color: 'blue' },
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  goToPage();
                }
              }}
            />
            <Text>
              Page {currentTopicsPage} of {totalTopicPages}
            </Text>
          </div>
        )}
      </div>
      <div className={classes.container}>
        <h1><span>Tags </span> <Button icon={<IconAdd fontSize={16} />} onClick={() => navigate('/tags/add')} title='Add New Tag' /></h1>
        <div className={classes.cardsWrapper}>
          {currentTags? currentTags.map((tag, index) => (
            <DashCard
              key={index}
              modelName='tag'
              modelId={tag.id}
              name={tag.name}
              title={tag.name}
              content={tag.title}
              description={tag.title}
              imgPath="react.svg"
              imgAlt={tag.name}
              
            />
          )):
          <Loading size={50} color="skyblue" />}
        </div>
        {totalTagPages > 1 && (
          <div className={classes.pagination}>
            <ArrowLeft24Regular onClick={() => goToPreviousPage('tag')} style={{ cursor: 'pointer' }} title='Previous Page'/>
            <Text align='center' weight='regular' size={400} style={{ margin: '5px' , color: 'darkgrey' }}>
               {currentTagsPage}
            </Text>
            <ArrowRight24Regular onClick={() => goToNextPage('tag')} style={{ cursor: 'pointer' }} title='Next Page'/>
            <TextField
              value={inputPage}
              onChange={(e) => setInputPage((e.target as HTMLInputElement).value)}
              styles={{
                root: { width: '35px', margin: '10px', color: 'skyblue'},
                field: { textAlign: 'center', fontWeight: 'bold', verticalAlign: 'middle', color: 'blue' },
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  goToPage('tag');
                }
              }}
            />
            <Text>
              Page {currentTagsPage} of {totalTagPages}
            </Text>
          </div>
        )}
      </div>

    </FluentProvider>
  );
};

export default CardContainer;
