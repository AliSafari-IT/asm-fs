import { useEffect, useState } from "react";
import axios from "axios";
import Wrapper from "../../layout/Wrapper/Wrapper";
import { HomeHeaderBlock } from "./HomeHeaderBlock";
import NotAuthenticated from "../../components/NotAuthenticated";
import { ITopic } from "../../interfaces/ITopic";
import Topics from "../Topic/Topics";
import Loading from "../../components/Loading/Loading";
import API_URL from "../../api/getApiUrls";

const Home = () => {
  console.log("API_URL", API_URL);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [topics, setTopics] = useState<ITopic[]>([]);
  const userData = localStorage.getItem('user');
  const token = userData ? JSON.parse(userData).token : null;
  

  // Retrieve topics
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const headers = token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {
              "Content-Type": "application/json",
              Accept: "application/json",
          };

        const response = await axios.get(`${API_URL}/topics`, { headers });
        console.log("Response from /api/topics: ", response);
        setTopics(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [token]);

  if (loading) {
    return (
      <Wrapper pageTitle="Home">
        <Loading size={50} color="skyblue" />
      </Wrapper>
    );
  }

  if (error && topics.length === 0) {
    return (
      <Wrapper pageTitle="Home">
        <div className="w-1/2 mx-auto my-10 px-4 py-3 rounded relative" role="alert">
          <NotAuthenticated />
        </div>
        <p>{error}</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper header={<HomeHeaderBlock />} pageTitle={"Home"}>
      <div id="home">
        {topics.length > 0 ? <Topics topics={topics} /> : <p>No topics found.</p>}
      </div>
    </Wrapper>
  );
};

export default Home;
