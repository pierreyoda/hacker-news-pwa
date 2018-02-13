// Hacker News API Types definitions for JSON parsing.
// Reference: https://github.com/HackerNews/API

export enum HackerNewsItemType {
    Story,
    Comment,
    Job,
    Poll,
    PollOption,
}

export interface HackerNewsItem {
    by: string, // username of the Item's author
    type: string, // story / comment / job / poll / pollopt
    time: Date, // creation date of the Item
}

export interface HackerNewsStory extends HackerNewsItem {
    id: number,
    title: string,
    text: string,
    url: string,
    score: number,
    descendants: number, // number of comments
    kids: number[], // IDs of the comments, in ranked display order
}

export interface HackerNewsComment extends HackerNewsItem {
    id: number,
    parent: number, // the comment's parent ID (another comment or a story)
    kids: number[],
}

export interface HackerNewsUser {
    id: string, // NB: case-sensitive
    delay: number,
    created: Date,
    karma: number,
    submetted: number[], // IDs of the user's stories, comments and polls
}
