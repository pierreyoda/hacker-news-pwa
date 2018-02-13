import "whatwg-fetch";
import {
    HackerNewsItemType,
    HackerNewsItem,
    HackerNewsStory,
    HackerNewsComment,
    HackerNewsUser,
} from "./types";

const API_VERSION = "v0";
const API_URL = `https://hacker-news.firebaseio.com/${API_VERSION}`;
const ERROR = "HN API Error :";

export enum HackerNewsStoriesSorting {
    Top,
    Newest,
    Best,
}

/**
 * Fetch the object describing the Hacker News Item with the corresponding ID.
 */
const fetchItem = async (id: number, type: HackerNewsItemType): Promise<any> => {
    // TODO: better error handling
    const response = await fetch(`${API_URL}/item/${id}.json`);
    const json = await response.text();

    // TODO: add sanity checks for item type
    const typeErrorMessage = (found: string, expected: string) =>
        `${ERROR} in fetchItem, item with ID "${id}" is of type ${found} instead of ${expected}.`;
    switch (type) {
        case HackerNewsItemType.Story:
            const story: HackerNewsStory = JSON.parse(json);
            return Promise.resolve(story);
        case HackerNewsItemType.Comment:
            const comment: HackerNewsComment = JSON.parse(json);
            return Promise.resolve(comment);
        default:
            return Promise.reject(`${ERROR} fetchItem does not support type ${type}.`);
    }
}

/**
 * Get the Hacker News Story corresponding to the given ID.
 */
export const fetchStory = async (id: number): Promise<HackerNewsStory> => {
    return fetchItem(id, HackerNewsItemType.Story);
}

/**
 * Get the Hacker News Comment corresponding to the given ID.
 */
export const fetchComment = async (id: number): Promise<HackerNewsComment> => {
    return fetchItem(id, HackerNewsItemType.Comment);
}

/**
 * Get the Hacker News User with the given ID (case-sensitive).
 */
export const fetchUser = async (id: String): Promise<HackerNewsUser> => {
    const response = await fetch(`${API_URL}/user/${id}.json`);
    const text = await response.text();
    const user: HackerNewsUser = JSON.parse(text);
    return Promise.resolve(user);
};

/**
 * Get the current largest ID.
 */
export const fetchCurrentMaxItem = async (): Promise<number> => {
    const response = await fetch(`${API_URL}/maxitem.json`);
    const text = await response.text();
    const maxId = Number(text);
    if (!Number.isInteger(maxId))
        return Promise.reject(`${ERROR} "${maxId}" is not an integer.`);
    if (maxId < 0)
        return Promise.reject(`${ERROR} "${maxId}" is an invalid item ID.`);
    return Promise.resolve(maxId);
}

/**
 * Get the IDs of the top/newest/best stories (up to 500).
 */
export const fetchStoriesIDs = async (sort: HackerNewsStoriesSorting): Promise<number[]> => {
    let resource;
    switch (sort) {
        case HackerNewsStoriesSorting.Top: resource = "topstories"; break;
        case HackerNewsStoriesSorting.Newest: resource = "newstories"; break;
        case HackerNewsStoriesSorting.Best: resource = "beststories"; break;
        default: Promise.resolve(`${ERROR} fetchStories does not support sort option ${sort}.`)
    }
    const response = await fetch(`${API_URL}/${resource}.json`);
    const text = await response.text();
    let ids: number[] = JSON.parse(text);
    return Promise.resolve(ids);
}
