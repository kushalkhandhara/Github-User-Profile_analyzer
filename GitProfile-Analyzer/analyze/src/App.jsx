import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
// Components
import ReposInYear from "./components/ReposInYear";
import CommitsRepo from "./components/CommitsRepo";
import RepoList from "./components/RepoList";
import LanguagesRepo from "./components/LanguagesRepo";
import LanguagesUser from "./components/LanguagesUser";

import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

const App = () => {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState("");
  
  //  Repository Creation Data
  const [repoCreationData, setRepoCreationData] = useState([]);

  // General For the Repo Creation Year
  const [repoYears, setRepoYears] = useState([]);

  // For Language For Overall User profile
  const [languageCount, setLanguageCount] = useState({});


  // For Language For Specific Repo
  const [languages, setLanguages] = useState({});

 
  const { toast } = useToast()

  useEffect(() => {
    const fetchRepoLang = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${username}/${selectedRepo}/languages`,
          {
            headers: {
              Authorization: `token ${process.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );
        setLanguages(response.data);
      } catch (error) {
        setLanguages({});
        console.error("Error fetching repo languages:", error);
      }
    };
  
    if (selectedRepo) {
      fetchRepoLang();
    }
  }, [selectedRepo]);



  const fetchRepos = async () => {
    try{
      const res = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Authorization: `token ${process.env.VITE_GITHUB_TOKEN}`
        }
      });
      const data = await res?.json() ||[];
      setRepos(data);

      const langCount = {};
      data.forEach((repo) => {
        const lang = repo.language;
        if (lang) {
          langCount[lang] = (langCount[lang] || 0) + 1;
        }
      });
  
      setLanguageCount(langCount);
    }catch(error){
      toast({
        variant : "destructive",
        title: "Error",
        description: error?.message || "Something went wrong",
        duration: 5000,
      });
      console.log(error)
    }
  };

 
  // Fetch commits for a specific repository
  const fetchCommits = async (repo) => {
    setSelectedRepo(repo);
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repo}/commits?per_page=100`,
      {
        headers: {
          Authorization: `token ${process.env.VITE_GITHUB_TOKEN}`
        }
      }
    );
  
    if (!res.ok) {
      alert("Failed to fetch commit data. GitHub API may be rate limited.");
      return;
    }
  
    const data = await res.json();
  
    if (!Array.isArray(data)) {
      alert("Unexpected data format. Try again later.");
      return;
    }
  
    const dateCount = {};
  
    data.forEach((commit) => {
      const date = new Date(commit.commit.author.date).toISOString().split("T")[0];
      dateCount[date] = (dateCount[date] || 0) + 1;
    });
  
    const sortedDates = Object.keys(dateCount).sort();
    const counts = sortedDates.map((date) => dateCount[date]);
  
    setCommits(counts);
    setLabels(sortedDates);
  };

 
  const fetchReposWithYear = async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos`,{
        headers: {
          Authorization: `token ${process.env.VITE_GITHUB_TOKEN}`
        }
      });
      const data = await res.json();

      if (!res.ok || !Array.isArray(data)) {
        console.error("Failed to fetch repos or unexpected format:", data);
        return;
      }

      setRepos(data);

      // Process year-wise repo creation count
      const yearCount = {};
      data.forEach((repo) => {
        const year = new Date(repo.created_at).getFullYear();
        yearCount[year] = (yearCount[year] || 0) + 1;
      });

      const sortedYears = Object.keys(yearCount).sort();
      const counts = sortedYears.map((year) => yearCount[year]);

      setRepoYears(sortedYears);
      setRepoCreationData(counts);
    } catch (error) {
      toast({
        variant : "destructive",
        title: "Error",
        description: error?.message || "Something went wrong",
        duration: 5000,
      });
      console.log("Error fetching repos:", error);
    }
  };


  const handleClick = async()=>{
    try{
      
      if(username.trim() === ""){
        toast({
          variant : "destructive",
          title: "Error",
          description: "Username is required",
          duration: 5000,
        });
        return;        
      }

      await fetchReposWithYear();
      await fetchRepos();
      localStorage.setItem("username", username);
  
      
     
    }catch(error){

      
      console.log(error);
      
   
    }

  }
 
  return (
    <>
        <Toaster />
      <div className="max-w-4xl mx-auto p-6 space-y-6">

  

        <Card>
          <CardHeader>
            <CardTitle>GitHub User Profile Analyzer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button onClick={()=>handleClick()}>Fetch Repos</Button>
            </div>
          </CardContent>
        </Card>


        <div className="flex lg:flex-row flex-col gap-4 items-center">
          {/* Number of Repos in which year  */}
          <div className="flex-1">
            {repoCreationData.length > 0 && (
              <ReposInYear  repoCreationData = {repoCreationData}
                repoYears = {repoYears}
              />)
            }
          </div>
          <div className="flex-1">
            <LanguagesUser
              languageCount={languageCount}
              username={username}
              
            />
          </div>
        </div>

        {/* Repositories List */}
        <RepoList
          repos = {repos}
          fetchCommits = {fetchCommits}
        />

        {/* Commits per Repos */}
        {commits.length > 0 && (
          <CommitsRepo commits={commits}
          selectedRepo = {selectedRepo}
          labels = {labels}
          />
        )}
      
        
        {/* Repo Languages */}
        {Object.keys(languages).length!=0  && (
            <LanguagesRepo languages={languages} selectedRepo={selectedRepo} />
          )
        }
      </div>
    </>
  );
};

export default App;
