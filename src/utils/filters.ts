import moment from "moment";
import Vue from "vue";

export const filters = {
    timeAgo: (time: Date) => {
        const delta = moment.duration(moment().diff(moment.unix(time.valueOf())));
        return delta.humanize();
    },
};

export const registerFilters = () => {
    Object.keys(filters).forEach((filter: string) =>
        Vue.filter(filter, filters[filter])
    );
};
