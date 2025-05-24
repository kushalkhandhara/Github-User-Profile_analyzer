import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RepoList(props) {
  return (
    <>
        {Array.isArray(props.repos)  &&( 
        <>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.isArray(props.repos) && props.repos.map((repo) => (
                    <Card key={repo.id} onClick={() => props.fetchCommits(repo.name)} className="cursor-pointer hover:shadow-lg transition">
                        <CardHeader>
                            <CardTitle>{repo.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                            {repo.description || "No description"}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
        )
        } 
    </>
  )
}
