import moment from "moment";
import Vue from "vue";

export const filters = {
    /**
     * Get the host domain for the given URL.
     */
    host: (url: string) => {
        const host = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
        const parts = host.split(".").slice(-3);
        if (parts[0] == "www") parts.shift();
        return parts.join(".");
    },

    /**
     * Get a human-readable string representation for the duration between the given
     * Date and the current time.
     */
    timeAgo: (time: Date) => {
        const delta = moment.duration(moment().diff(moment.unix(time.valueOf())));
        return delta.humanize();
    },
};

export const registerFilters = () => {
    Object.keys(filters).forEach((filterKey: string) =>
        Vue.filter(filterKey, filters[filterKey])
    );
};
