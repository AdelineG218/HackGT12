First, make a new branch with: ```git checkout -b <branch-name>```
You'll create pull requests in this branch

How to run:
1. In a terminal run: ```cd CartoonTracker```
2. ```npm install```
3. ```npm run dev```
4. Click on the localhost link to open the site in your browser

[ ] We first need to link the new superbase, so replace all instances of .from("crewmates") with .from("shows"), and replace the appropriate columns

**cartoon tracker supabase columns and types**

.from("shows")
id: int9
created_at: timestamptz
name: text
total_num_episodes: numeric
num_episcodes_watched: numeric
tv_rating: text // this is like TV-G, TV-MA, etc.
average_rating: numberic // this is more of a star rating
user_rating: text
desc: text
img: text
genre: text[]