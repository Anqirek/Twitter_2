import { Tweet } from "../typings";

export const fetchTweets = async () => {
    const res = await fetch(`http://twitter-2-theta.vercel.app/`)

    const data = await res.json()
    const tweets: Tweet[]=data.tweets;

    return tweets;
}